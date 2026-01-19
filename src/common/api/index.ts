import axios from "axios";

const backendHost =
  window.location.hostname === "localhost"
    ? "localhost"
    : window.location.hostname; // Auto-detect IP for mobile access

export const api = axios.create({
  baseURL: `http://${backendHost}:3000`,
  headers: { "Content-Type": "application/json" },
});
export const apiForm = axios.create({
  baseURL: `http://${backendHost}:3000`,
  // Do NOT set Content-Type here, axios will set multipart/form-data automatically
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    const msg = err.response?.data?.error;
    const status = err.response?.status;

    //  Handle only expired token case
    if (status === 403 && msg === "TokenExpired" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token found");

        //  Use api instance instead of raw axios
        const response = await api.post("/auth/refresh", {
          token: refreshToken,
        });

        //  Save new tokens
        localStorage.setItem("accessToken", response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }

        // Update header for the failed request
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        console.log(" Retrying original request after refresh...");

        // Retry the original request
        return api(originalRequest);
      } catch (refreshErr) {
        console.error("Refresh token failed:", refreshErr);
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  },
);
