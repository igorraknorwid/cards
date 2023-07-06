import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uba97uw5",
  dataset: "production",
  useCdn: false, // Enable this for production, disable for development
});

export default client;
