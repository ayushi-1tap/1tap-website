import axios from "axios";

// API base URL - can be configured via environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.1tapbiz.com"; // Default base URL, update as needed

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Create lead from website form submission
 * @param {Object} payload - Form data with firstName, middleName (optional), lastName (optional), email, phone
 * @returns {Promise} Axios response
 */
export const createLeadFromWebsite = async (payload) => {
  console.log(payload, "123456764567");

  try {
    const response = await axiosInstance.post(
      "https://erp.1tap.app/api/method/erp_1tap.erp_1tap.api_integrations.create_lead_from_email",
      { data: payload }
    );
    console.log(response, "yyyyyyyyyy");
    return response;
  } catch (error) {
    console.error("Error creating lead:", error);
    throw error;
  }
};

export default axiosInstance;
