import React from "react";
import client from "../../../sanityClient";
import { Link } from "react-router-dom";

interface IYear {
  _id: string;
  title: string;
}

function Years() {
  const [data, setData] = React.useState<IYear[] | null>(null);
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "year"]{ _id,
          title,
        }`; // Replace 'YOUR_DOCUMENT_TYPE' with your actual Sanity document type
        const result = await client.fetch<IYear[]>(query);
        setData(result);
      } catch (error) {
        setIsError(true);
        console.error("Error fetching data from Sanity:", error);
      }
    };

    fetchData();
  }, []);
  const sortedData = data?.sort(
    (a, b) => parseInt(a.title) - parseInt(b.title)
  );
  console.log("data", data);

  if (!data) return <div>...LOADING</div>;
  if (isError) return <div>"Error fetching data from Sanity:"</div>;
  return (
    <div className='m-10'>
      {sortedData?.map((item) => (
        <li key={item._id}>
          <Link to={`cards?year=${item.title}`}>{item.title}</Link>
        </li>
      ))}
    </div>
  );
}

export default Years;
