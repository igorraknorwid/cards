import React from "react";
import client from "../../../sanityClient";
import { useLocation } from "react-router-dom";
import { ICard } from "../../../types/card";
import CardList from "../../card_list/CardList";
import YearTitle from "../../year_title/YearTitle";

function CardsByTitle() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const year = searchParams.get("year");
  const title = searchParams.get("title");
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == 'card' && '${year}' in years[]->title && title == '${title}']{ _id, title,image_slug,theme->{title},
      }`;
        const result = await client.fetch<ICard[]>(query);
        setData(result);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data from Sanity:", error);
      }
    };
    fetchData();
  }, [year, title]);

  // console.log("CARDS", data);
  console.log("Title", title);
  if (!data) return <div>...LOADING</div>;
  if (isError) return <div>Error fetching data from Sanity!</div>;
  return (
    <div className='m-10'>
      <YearTitle year={year} />
      <p>Nazwa:{title}</p>
      <CardList cards={data} />
    </div>
  );
}

export default CardsByTitle;
