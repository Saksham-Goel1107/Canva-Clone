import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.API_URL || "http://localhost:5000";

export async function fetchWithAuth(endpoint, options = {}) {
  const session = await getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  try {
    const response = await axios({
      url: `${API_URL}${endpoint}`,
      method: options.method || "GET",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        ...options.headers,
      },
      data: options.body,
      params: options.params,
    });

    return response.data;  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from server. Please check if the API server is running.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
}
