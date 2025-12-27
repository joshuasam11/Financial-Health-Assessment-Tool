import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Attach JWT if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ✅ NAMED EXPORTS (THIS FIXES YOUR ERRORS)
export const loginUser = (data) => API.post("/login", data);
export const signupUser = (data) => API.post("/signup", data);

export const uploadFinancials = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return API.post("/full-analysis", formData);
};

export default API;
