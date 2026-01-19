import * as stackApi from "../api/stacks";

export async function fetchStacks(page, limit, search, types) {
  try {
    // Call the API and pass filters as an object
    const { data } = await stackApi.fetchStacks(page, limit, search, types);
    console.log("Fetched stacks data:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch stacks:", error);
    throw error;
  }
}

export async function createStack(stack) {
  const now = new Date().toISOString();

  const formData = new FormData();
  formData.append("language", stack.language);
  formData.append("concepts", stack.concepts);
  formData.append("types", stack.type_id);
  formData.append("created_at", now);
  if (stack.logo instanceof File) {
    formData.append("logo", stack.logo);
  }

  try {
    const { data } = await stackApi.createStack(formData);
    return data;
  } catch (error) {
    console.error(" Failed to add stack:", error);
    throw error;
  }
}

export async function updateStack(stack) {
  const now = new Date().toISOString();

  const formData = new FormData();
  formData.append("language", stack.language);
  formData.append("concepts", stack.concepts);
  formData.append("types", stack.type_id);
  formData.append("logo", stack.logo);
  formData.append("remove_logo", stack.remove_logo);

  if (!stack.id) throw new Error("Logo ID required to update.");
  try {
    const { data } = await stackApi.updateStack(stack.id, formData);
    return data;
  } catch (error) {
    console.error(" Failed to save logo:", error);
    throw error;
  }
}

export async function deleteStack(id) {
  try {
    await stackApi.deleteStack(id);
  } catch (error) {
    console.error(" Failed to delete stack:", error);
    throw error;
  }
}
