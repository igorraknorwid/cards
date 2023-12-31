import React from "react";
import client from "./sanityClient";
import "./App.css";

function App() {
  const [data, setData] = React.useState<any[] | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "card"]`;
        const result = await client.fetch<any[]>(query);
        setData(result);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      }
    };

    fetchData();
  }, []);
  console.log("data", data);
  return <div className='App'>App</div>;
}

export default App;
