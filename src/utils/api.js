import axios from "axios";

// Frappe API – from .env (Vite exposes only VITE_* vars)
const baseURL = import.meta.env.VITE_API_FrappeBaseUrl || "https://dev.1tap.app";
const apiKey = import.meta.env.VITE_API_Frappe_apiKey || "043f6266f78cfa1";
const apiSecret = import.meta.env.VITE_API_Frappe_apiSecret || "be66214ffb9f2e7";

// Dev only: warn if API auth is missing (403 usually means wrong key or Frappe user permissions)
if (import.meta.env.DEV && (!apiKey || !apiSecret)) {
  console.warn(
    "[1Tap API] VITE_API_Frappe_apiKey or apiSecret missing. Add them to .env and restart dev server."
  );
}

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
