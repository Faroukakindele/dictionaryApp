import { Navbar } from "./components/Navbar";
import { SearchQuery } from "./components/SearchQuery";
import { DictionaryBody } from "./components/DictionaryBody";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { useFetchWords } from "./hooks/useFetchWords";
import { useLocaleStorage } from "./hooks/useLocaleStorageState";

export const arr = ["Mono", "Serif", "Sans Serif"];
function App() {
  const { fontFamily, setFontFamily, query, setQuery } =
    useLocaleStorage("words");
  const fontStyle =
    (Number(fontFamily) === 0 && "mono") ||
    (Number(fontFamily) === 1 && "serif") ||
    (Number(fontFamily) === 2 && "sanSerif");

  const { isLoading, error, data } = useFetchWords(query);
  return (
    <div
      className={`
     App dark-mode ${fontStyle}`}
    >
      <Navbar fontFamily={fontFamily} setFontFamily={setFontFamily} />
      <SearchQuery fontStyle={fontStyle} setQuery={setQuery} />
      {!isLoading && !error && <DictionaryBody data={data} />}
      {error && <ErrorMessage error={error} />}
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
