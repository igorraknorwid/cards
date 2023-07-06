import React from "react";
import client from "../sanityClient";
import { useLocation } from "react-router-dom";

interface ICard {
  _id: string;
  title: string;
  image_slug: string;
}

function Cards() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const year = searchParams.get("year");
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "card" && '${year}' in years[]->title]{ _id, title,image_slug }`;
        const result = await client.fetch<ICard[]>(query);
        setData(result);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data from Sanity:", error);
      }
    };
    fetchData();
  }, [year]);

  if (!data) return <div>...LOADING</div>;
  if (isError) return <div>Error fetching data from Sanity!</div>;
  return (
    <div>
      <h1>Rok {year}</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <div> {item.title}</div>
            <img src={item.image_slug} alt={item.title} height={300} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cards;
