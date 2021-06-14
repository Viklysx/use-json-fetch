import "./App.css";
import { useState, useEffect } from "react";

function useJsonFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return [data, isLoading, error];
}

function CostumHook({ url }) {
  const [data, isLoading, error] = useJsonFetch(url);
  return (
    <div className="block">
      <div>{data && data.status}</div>
      <div>{error && error.message}</div>
      <div>{isLoading && "Загрузка..."}</div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <CostumHook url={"http://localhost:7777/data"} />
      <CostumHook url={"http://localhost:7777/error"} />
      <CostumHook url={"http://localhost:7777/loading"} />
    </div>
  );
}

export default App;
