import React from "react";
import client from "../../sanityClient";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ICard } from "../../types/card";
import CardList from "../card_list/CardList";

function Cards() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const year = searchParams.get("year");
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "card" && '${year}' in years[]->title]{ _id, title,image_slug,theme->{title},
      }`;
        const result = await client.fetch<ICard[]>(query);
        setData(result);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data from Sanity:", error);
      }
    };
    fetchData();
  }, [year]);
  const categoryArr = data?.map((item) => item.theme.title);
  const categories = Array.from(new Set(categoryArr));
  // console.log("CARDS", data);
  // console.log("Category", categories);
  if (!data) return <div>...LOADING</div>;
  if (isError) return <div>Error fetching data from Sanity!</div>;
  return (
    <div>
      <h1>Rok {year}</h1>
      <ul>
        {categories.map((c, i) => (
          <li key={i}>
            <Link to={`category?year=${year}&category=${c}`}>{c}</Link>
          </li>
        ))}
      </ul>

      <CardList cards={data} />
    </div>
  );
}

export default Cards;
