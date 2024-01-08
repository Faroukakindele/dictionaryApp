import { useState, useEffect } from "react";
export function useFetchWords(query) {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  useEffect(
    function () {
      async function fetchWords() {
        try {
          setError("");
          setIsloading(true);

          const res = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
          );

          if (!res.ok) throw new Error(" Could not find words ");
          const words = await res.json();
          setData(words);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsloading(false);
        }
      }
      if (!query.length) {
        setError("");
        return;
      }
      fetchWords();
    },
    [query]
  );
  return { isLoading, error, data };
}
