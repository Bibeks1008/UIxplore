import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

const baseUrl = "http://localhost:9000/api";

export async function fetchCategories() {
  const url = `${baseUrl}/category`;

  try {
    const response = await axios.get(url);

    return response.data.payload.data;
  } catch (error) {
    console.error("An error occurred while fetching the categories", error);
    throw new Error("An error occurred while fetching the categories");
  }
}

export async function fetchWebsites() {
  const url = `${baseUrl}/website`;

  try {
    const response = await axios.get(url);

    return response.data.payload.data;
  } catch (error) {
    console.error("An error occurred while fetching the websites", error);
    throw new Error("An error occurred while fetching the websites");
  }
}

export async function fetchOneWebsite(websiteId) {
  const url = `${baseUrl}/website/${websiteId}`;

  try {
    const response = await axios.get(url);

    return response.data.payload.data;
  } catch (error) {
    console.error("An error occurred while fetching the website", error);
    throw new Error("An error occurred while fetching the website");
  }
}

export async function fetchElementScreenshot() {
  const url = `${baseUrl}/elementScreenshot`;

  console.log("Fetching from:", url);

  try {
    const response = await axios.get(url);
    console.log("Response data:", response.data);

    return response.data.payload.data;
  } catch (error) {
    console.error("An error occurred while fetching the website", error);
    throw new Error("An error occurred while fetching the website");
  }
}
