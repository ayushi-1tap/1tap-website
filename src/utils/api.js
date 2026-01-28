import axios from "axios";

// Frappe API – from .env (Vite exposes only VITE_* vars)
const baseURL = import.meta.env.VITE_API_FrappeBaseUrl || "https://dev.1tap.app";
const apiKey = import.meta.env.VITE_API_Frappe_apiKey;
const apiSecret = import.meta.env.VITE_API_Frappe_apiSecret;

const headers = {
  "Content-Type": "application/json",
};
if (apiKey && apiSecret) {
  headers.Authorization = `token ${apiKey}:${apiSecret}`;
}

const axiosInstance = axios.create({
  baseURL,
  headers,
});

const LEAD_ENDPOINT = "/api/method/erp_1tap.erp_1tap.api_integrations.create_lead_from_email";

export const createLeadFromWebsite = async (payload) => {
  try {
    const response = await axiosInstance.post(LEAD_ENDPOINT, { data: payload });
    return response;
  } catch (error) {
    console.error("Error creating lead:", error);
    throw error;
  }
};

export default axiosInstance;
