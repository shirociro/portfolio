<template>
  <div class="light-editor">
    <div
      class="btn-toolbar mb-0"
      role="toolbar"
      aria-label="Editor toolbar"
      id="light-editor-toolbar"
    >
      <div class="btn-group me-0" role="group">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="exec('bold')"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="exec('italic')"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="exec('underline')"
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="exec('insertUnorderedList')"
          title="Bullet List"
        >
          •
        </button>
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary"
          @click="toggleHtml"
          title="Toggle HTML view"
        >
          HTML
        </button>
      </div>
    </div>

    <div v-if="showHtml" class="mb-2">
      <textarea
        class="form-control"
        :class="customClass"
        rows="6"
        v-model="htmlValue"
        @input="onHtmlInput"
      ></textarea>
    </div>

    <ScrollPanel style="width: 100%; height: 250px">
      <div
        ref="editor"
        class="editor form-control"
        :class="customClass"
        contenteditable="true"
        role="textbox"
        :aria-multiline="true"
        @input="onInput"
        @paste="onPaste"
        @keydown.tab.prevent="onTab"
        @blur="emitChange"
      ></div>
    </ScrollPanel>

    <!-- Link modal (simple inline) -->
    <div v-if="linkModal" class="mt-2">
      <div class="input-group">
        <input
          v-model="tempLink.url"
          class="form-control form-control-sm"
          placeholder="https://example.com"
        />
        <input
          v-model="tempLink.text"
          class="form-control form-control-sm"
          placeholder="Link text (optional)"
        />
        <button class="btn btn-sm btn-primary" @click="applyLink">Apply</button>
        <button
          class="btn btn-sm btn-outline-secondary"
          @click="linkModal = false"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- Image modal -->
    <div v-if="imageModal" class="mt-2">
      <div class="input-group">
        <input
          v-model="tempImage.url"
          class="form-control form-control-sm"
          placeholder="Image URL"
        />
        <input
          v-model="tempImage.alt"
          class="form-control form-control-sm"
          placeholder="Alt text"
        />
        <button class="btn btn-sm btn-primary" @click="applyImage">
          Insert
        </button>
        <button
          class="btn btn-sm btn-outline-secondary"
          @click="imageModal = false"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import ScrollPanel from "primevue/scrollpanel";

const props = defineProps({
  modelValue: { type: String, default: "" },
  sanitize: { type: Boolean, default: true },
  maxImageSizeMB: { type: Number, default: 5 },

  allowPasteImage: { type: Boolean, default: true },
  uploadImage: { type: Function, default: null },
  customClass: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue", "image-upload-failed"]);

const editor = ref(null);
const showHtml = ref(false);
const htmlValue = ref(props.modelValue || "");

const linkModal = ref(false);
const tempLink = ref({ url: "", text: "" });
const imageModal = ref(false);
const tempImage = ref({ url: "", alt: "" });

// Simple allowlist sanitizer (no external deps)
function sanitizeHTML(dirty) {
  if (!dirty) return "";
  const parser = new DOMParser();
  const doc = parser.parseFromString(dirty, "text/html");

  // remove script and style
  doc.querySelectorAll("script,style").forEach((n) => n.remove());

  const ALLOWED_TAGS = [
    "A",
    "P",
    "DIV",
    "BR",
    "B",
    "STRONG",
    "I",
    "EM",
    "U",
    "UL",
    "OL",
    "LI",
    "IMG",
    "H1",
    "H2",
    "H3",
    "H4",
    "SPAN",
  ];
  const ALLOWED_ATTR = {
    A: ["href", "target", "rel"],
    IMG: ["src", "alt", "width", "height"],
    DIV: ["class"],
  };

  function clean(node) {
    const nodeName = node.nodeName;
    if (node.nodeType === Node.TEXT_NODE) return;
    if (!ALLOWED_TAGS.includes(nodeName)) {
      // unwrap: replace node with its children
      const parent = node.parentNode;
      while (node.firstChild) parent.insertBefore(node.firstChild, node);
      node.remove();
      return;
    }
    // strip disallowed attributes
    for (const attr of Array.from(node.attributes || [])) {
      const allowed =
        (ALLOWED_ATTR[nodeName] &&
          ALLOWED_ATTR[nodeName].includes(attr.name)) ||
        (["class", "style"].includes(attr.name) && nodeName === "DIV");
      // prevent event handlers and javascript: links
      if (
        !allowed ||
        /^on/i.test(attr.name) ||
        (attr.name === "href" && /^javascript:/i.test(attr.value))
      ) {
        node.removeAttribute(attr.name);
      }
    }

    // recurse
    Array.from(node.childNodes).forEach(clean);
  }

  Array.from(doc.body.childNodes).forEach(clean);
  return doc.body.innerHTML;
}

function setEditorHtml(html) {
  const safe = props.sanitize ? sanitizeHTML(html) : html;
  if (editor.value) editor.value.innerHTML = safe;
}

onMounted(() => {
  setEditorHtml(props.modelValue);
});

watch(
  () => props.modelValue,
  (v) => {
    if (v !== htmlValue.value) {
      htmlValue.value = v;
      setEditorHtml(v);
    }
  },
);

function onInput() {
  htmlValue.value = editor.value.innerHTML;
  emit("update:modelValue", htmlValue.value);
}

function emitChange() {
  htmlValue.value = editor.value.innerHTML;
  emit("update:modelValue", htmlValue.value);
}

function onHtmlInput() {
  setEditorHtml(htmlValue.value);
  emit("update:modelValue", htmlValue.value);
}

function exec(cmd) {
  // use document.execCommand for simplicity (deprecated but still supported broadly)
  if (cmd === "insertUnorderedList")
    document.execCommand("insertUnorderedList");
  else if (cmd === "insertOrderedList")
    document.execCommand("insertOrderedList");
  else document.execCommand(cmd);
  onInput();
}

function insertHeading(level) {
  document.execCommand("formatBlock", false, "H" + level);
  onInput();
}

/**
 * Paste handler: supports plain text and image files from clipboard.
 * - If allowPasteImage is false, images are ignored and fallback to plain text.
 * - If uploadImage is provided (async function), it will be called with the File;
 *   expected to return the uploaded URL (string) or { url: string }.
 * - Otherwise images inserted as data URLs (base64).
 */
async function onPaste(e) {
  const clipboard = e.clipboardData || window.clipboardData;
  if (!clipboard) return;

  // 1) Check for image files in clipboard items
  const items = Array.from(clipboard.items || []);
  const imageItem = items.find((it) => it.type && it.type.startsWith("image/"));

  if (imageItem && props.allowPasteImage) {
    e.preventDefault();
    const file = imageItem.getAsFile();
    if (!file) return;

    const maxBytes = props.maxImageSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      // simple feedback: insert placeholder text
      document.execCommand(
        "insertText",
        false,
        `[Image too large: ${(file.size / 1024 / 1024).toFixed(2)} MB]`,
      );
      onInput();
      return;
    }

    try {
      // If user provided uploadImage handler, call it and use returned URL
      if (typeof props.uploadImage === "function") {
        // uploadImage may return a string url or an object { url }
        const result = await props.uploadImage(file);
        const url = typeof result === "string" ? result : result && result.url;
        if (url) {
          insertImageWithAlt(url, file.name);
        } else {
          // fallback to data URL if upload didn't return a usable URL
          const dataUrl = await readFileAsDataURL(file);
          insertImageWithAlt(dataUrl, file.name);
        }
      } else {
        // default: convert to data URL and insert
        const dataUrl = await readFileAsDataURL(file);
        insertImageWithAlt(dataUrl, file.name);
      }
    } catch (err) {
      // emit event so parent can show notification / retry / logging
      emit("image-upload-failed", err);
      // fallback: insert data URL if possible
      try {
        const dataUrl = await readFileAsDataURL(file);
        insertImageWithAlt(dataUrl, file.name);
      } catch (err2) {
        document.execCommand("insertText", false, `[Image paste failed]`);
        onInput();
      }
    }

    return;
  }

  // 2) If no image, handle plain-text paste (strip formatting)
  const text = clipboard.getData("text/plain");
  if (text) {
    e.preventDefault();
    document.execCommand("insertText", false, text);
    nextTick(() => onInput());
  }
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function insertImageWithAlt(src, alt = "") {
  // insert the image HTML at the current caret position
  const html = `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`;
  document.execCommand("insertHTML", false, html);
  nextTick(() => {
    // set dimensions or class if needed
    onInput();
  });
}

function onTab(e) {
  document.execCommand("insertText", false, "  ");
  onInput();
}

function openLinkModal() {
  linkModal.value = true;
  tempLink.value = { url: "", text: "" };
}
function applyLink() {
  const url = tempLink.value.url.trim();
  if (!url) {
    linkModal.value = false;
    return;
  }
  const text = tempLink.value.text.trim();
  if (text)
    document.execCommand(
      "insertHTML",
      false,
      `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>`,
    );
  else document.execCommand("createLink", false, url);
  linkModal.value = false;
  onInput();
}

function openImageModal() {
  imageModal.value = true;
  tempImage.value = { url: "", alt: "" };
}
function applyImage() {
  const url = tempImage.value.url.trim();
  if (!url) {
    imageModal.value = false;
    return;
  }
  const alt = tempImage.value.alt.trim();
  insertImageWithAlt(url, alt);
  imageModal.value = false;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toggleHtml() {
  showHtml.value = !showHtml.value;
  if (showHtml.value) htmlValue.value = editor.value.innerHTML;
  else setEditorHtml(htmlValue.value);
}
</script>

<style scoped>
.light-editor .editor {
  min-height: 200px;
  padding: 12px;
  overflow: auto;
}
.light-editor .btn-group .btn {
  min-width: 36px;
}
</style>
