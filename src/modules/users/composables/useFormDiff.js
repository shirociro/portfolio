import { ref, watch } from "vue";

export function useFormDiff(formRef, initialData = {}) {
  const prev = ref({ ...initialData });

  // update prev if initialData changes
  watch(
    () => initialData,
    (newData) => {
      prev.value = { ...newData };
    },
    { deep: true, immediate: true },
  );

  function getChanges() {
    const changes = {};
    for (const key in formRef.value) {
      // Compare primitives or files
      if (formRef.value[key] !== prev.value[key]) {
        changes[key] = formRef.value[key];
      }
    }
    return changes;
  }

  function reset() {
    prev.value = { ...formRef.value };
  }

  return { getChanges, reset };
}
