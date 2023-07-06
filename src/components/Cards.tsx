import React from "react";
import client from "../sanityClient";
import { useLocation } from "react-router-dom";
import "../index.css";

interface ICard {
  _id: string;
  title: string;
}

function Cards() {
  const location = useLocation();
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);
  const searchParams = new URLSearchParams(location.search);
  const year = searchParams.get("year");
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("year", year);
        // const query = `*[_type == "card"&& '1946' in years[]->title]{ _id,title,}`;
        const query = `*[_type == "card" && '${year}' in years[]->title]{ _id, title }`;
        // Replace 'YOUR_DOCUMENT_TYPE' with your actual Sanity document type
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
  return <div>Rok {year}</div>;
}

export default Cards;
