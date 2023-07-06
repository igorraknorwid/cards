import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "uba97uw5",
  dataset: "production",
  useCdn: false, // Enable this for production, disable for development
});

export default client;
