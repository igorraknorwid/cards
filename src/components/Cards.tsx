import React from "react";
import client from "../sanityClient";
import "../index.css";

interface ICard {
  _id: string;
  title: string;
}

function Cards() {
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "card"]{ _id,
          title,
        }`; // Replace 'YOUR_DOCUMENT_TYPE' with your actual Sanity document type
        const result = await client.fetch<ICard[]>(query);
        setData(result);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data from Sanity:", error);
      }
    };

    fetchData();
  }, []);

  console.log("data", data);

  if (!data) return <div>...LOADING</div>;
  if (isError) return <div>"Error fetching data from Sanity:"</div>;
  return <div>Kartki</div>;
}

export default Cards;
