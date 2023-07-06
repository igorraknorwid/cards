import { createClient } from "@sanity/client";
const apiKey = process.env.REACT_APP_API_KEY;

const client = createClient({
  projectId: apiKey,
  dataset: "production",
  useCdn: false, // Enable this for production, disable for development
});

export default client;
