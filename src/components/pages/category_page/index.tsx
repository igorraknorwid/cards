import React from "react";
import client from "../../../sanityClient";
import { useLocation } from "react-router-dom";
import { ICard } from "../../../types/card";
import CardList from "../../card_list/CardList";
import YearTitle from "../../year_title/YearTitle";

function CardsByCategory() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const year = searchParams.get("year");
  const category = searchParams.get("category");
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == 'card' && '${year}' in years[]->title && theme->title == "${category}"]{ _id, title,image_slug,theme->{title},
      }`;
        const result = await client.fetch<ICard[]>(query);
        setData(result);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data from Sanity:", error);
      }
    };
    fetchData();
  }, [year, category]);

  // console.log("CARDS", data);
  console.log("Category", category);
  if (!data) return <div>...LOADING</div>;
  if (isError) return <div>Error fetching data from Sanity!</div>;
  return (
    <div className='m-10'>
      <YearTitle year={year} />
      <p>Temat:{category}</p>
      <CardList cards={data} />
    </div>
  );
}

export default CardsByCategory;
