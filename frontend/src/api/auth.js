import api from "./axios";

/* ================= AUTH ================= */
export const SignupApiCompany = (data) => api.post("/company/register", data);
export const LoginApi = (data) => api.post("/company/login", data);
export const SignupApi = (data) => api.post("/user/register", data);
export const LoginApi = (data) => api.post("/user/create", data);
