import React from "react";
import client from "../../../sanityClient";
import { useLocation } from "react-router-dom";
import { ICard } from "../../../types/card";
import CardList from "../../card_list/CardList";
import CategoryNavigation from "../../navigation/CategoryNavigation";
import TitleNavigation from "../../navigation/TitleNavigation";
import CardCounter from "../../card_couter/CardCounter";
import YearTitle from "../../year_title/YearTitle";
import Spinner from "../../common/Spinner";

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

  if (!data) return <div>...LOADING</div>;
  if (isError) return <div>Error fetching data from Sanity!</div>;
  return (
    <div className='m-10'>
      <YearTitle year={year} />
      {data ? (
        <>
          <CardCounter cards={data} />
          <CategoryNavigation cards={data} year={year} />
          <TitleNavigation cards={data} year={year} />
          <CardList cards={data} itemsPerPage={5} />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Cards;
