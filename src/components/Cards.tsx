import React from "react";
import client from "../sanityClient";
import { useLocation } from "react-router-dom";

interface ICard {
  _id: string;
  title: string;
}

function Cards() {
  console.log(client);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const year = searchParams.get("year");
  console.log("year", year);
  const [data] = React.useState<ICard[] | null>(null);
  console.log("year", data);
  // const [isError, setIsError] = React.useState<boolean>(false);
  // const searchParams = new URLSearchParams(location.search);
  // const year = searchParams.get("year");
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const query = `*[_type == "card" && '${year}' in years[]->title]{ _id, title }`;
  //       const result = await client.fetch<ICard[]>(query);
  //       setData(result);
  //     } catch (error) {
  //       setIsError(true);
  //       console.error("Error fetching data from Sanity:", error);
  //     }
  //   };

  //   fetchData();
  // }, [year]);

  // if (!data) return <div>...LOADING</div>;
  // if (isError) return <div>"Error fetching data from Sanity:"</div>;
  return <div>Rok</div>;
}

export default Cards;
