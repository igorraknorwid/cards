import React from "react";
import client from "../../../sanityClient";
import { useLocation } from "react-router-dom";
import { ICard } from "../../../types/card";
import CardList from "../../card_list/CardList";
import CategoryNavigation from "../../category_navigation/CategoryNavigation";

function Cards() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const year = searchParams.get("year");
  const [data, setData] = React.useState<ICard[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  function setKartki(total: number) {
    if (total < 2) return "kartka";
    if (total > 2 && total < 5) return "kartki";
    if (total > 4) return "kartkek";
  }

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

  // console.log("CARDS", data);
  // console.log("Category", categories);
  if (!data) return <div>...LOADING</div>;
  if (isError) return <div>Error fetching data from Sanity!</div>;
  return (
    <div className='m-10'>
      <h1>Bibliografie za rok {year}</h1>
      {data && (
        <div>
          {data.length} {setKartki(data.length)}
        </div>
      )}
      <CategoryNavigation cards={data} year={year} />
      <CardList cards={data} />
    </div>
  );
}

export default Cards;