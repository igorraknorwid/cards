import React from "react";
import client from "../sanityClient";
import "../index.css";

function Years() {
  const [data, setData] = React.useState<any[] | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "card"]`; // Replace 'YOUR_DOCUMENT_TYPE' with your actual Sanity document type
        const result = await client.fetch<any[]>(query);
        setData(result);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      }
    };

    fetchData();
  }, []);
  console.log("data", data);
  return (
    <h1 className='text-3xl font-bold underline text-red-600'>
      Simple React Typescript Tailwind Sample
    </h1>
  );
}

export default Years;
