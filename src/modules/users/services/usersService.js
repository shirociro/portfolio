import * as userApi from "../api/users";

export async function fetchUsers(page, limit, search, position) {
  try {
    // Call the API and pass filters as an object
    const { data } = await userApi.fetchUsers(page, limit, search, position);
    console.log("Fetched users data:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
}

export async function createUser(user) {
  const now = new Date().toISOString();

  // 🧩 Use FormData for file + text fields
  const formData = new FormData();
  formData.append("firstname", user.firstname);
  formData.append("lastname", user.lastname);
  formData.append("username", user.username);
  formData.append("password", user.password);
  formData.append("position_id", user.position_id);
  formData.append("role_id", user.role_id);
  formData.append("created_at", now);
  //  Append file only if it exists and is a File object
  if (user.profile instanceof File) {
    formData.append("image", user.profile);
  }

  try {
    const { data } = await userApi.createUser(formData);
    return data;
  } catch (error) {
    console.error(" Failed to add user:", error);
    throw error;
  }
}

export async function updateUser(user) {
  const now = new Date().toISOString();

  const formData = new FormData();
  formData.append("firstname", user.firstname);
  formData.append("lastname", user.lastname);
  formData.append("username", user.username);
  formData.append("password", user.password);
  formData.append("position_id", user.position_id);
  formData.append("role_id", user.role_id);

  formData.append("profile", user.profile);
  formData.append("remove_profile", user.remove_profile);

  if (!user.id) throw new Error("User ID required to update.");
  try {
    const { data } = await userApi.updateUser(user.id, formData);
    return data;
  } catch (error) {
    console.error(" Failed to save user:", error);
    throw error;
  }
}
export async function patchUser(user) {
  const formData = new FormData();

  // Append only fields that exist
  const fields = [
    "firstname",
    "lastname",
    "username",
    "password",
    "position_id",
    "role_id",
  ];
  fields.forEach((key) => {
    if (user[key] !== undefined) formData.append(key, user[key]);
  });

  // Handle profile separately
  if (user.profile instanceof File) {
    formData.append("image", user.profile);
  } else if (user.profile === null && user.remove_profile) {
    formData.append("remove_profile", true);
  }

  try {
    const { data } = await userApi.updateUser(user.id, formData);
    return data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    await userApi.deleteUser(id);
  } catch (error) {
    console.error(" Failed to delete user:", error);
    throw error;
  }
}
