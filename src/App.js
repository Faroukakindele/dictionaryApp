import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { SearchQuery } from "./components/SearchQuery";
import { DictionaryBody } from "./components/DictionaryBody";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";

export const arr = ["Mono", "Serif", "Sans Serif"];
function App() {
  const [data, setData] = useState([]);
  const [fontFamily, setFontFamily] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("Keyboard");

  const fontStyle =
    (Number(fontFamily) === 0 && "mono") ||
    (Number(fontFamily) === 1 && "serif") ||
    (Number(fontFamily) === 2 && "sanSerif");

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
  return (
    <div
      className={`
     App ${fontStyle}`}
    >
      <Navbar setFontFamily={setFontFamily} />
      <SearchQuery fontStyle={fontStyle} setQuery={setQuery} />
      {!isLoading && !error && <DictionaryBody data={data} />}
      {error && <ErrorMessage error={error} />}
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
