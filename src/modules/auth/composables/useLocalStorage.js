import { ref } from "vue";

export function useLocalStorage() {
  const user = ref(null);

  // Initialize from localStorage
  try {
    const stored = localStorage.getItem("user");
    if (stored) user.value = JSON.parse(stored);
  } catch (err) {
    console.error("Failed to parse user from localStorage", err);
  }

  // Simple getter for user.id
  const userId = ref(user.value?.id || null);

  // Update user in localStorage and reactive ref
  const setUser = (data) => {
    user.value = data;
    userId.value = data?.id || null;
    localStorage.setItem("user", JSON.stringify(data));
  };

  // Clear user (e.g., on logout)
  const clearUser = () => {
    user.value = null;
    userId.value = null;
    localStorage.removeItem("user");
  };

  return { user, userId, setUser, clearUser };
}
