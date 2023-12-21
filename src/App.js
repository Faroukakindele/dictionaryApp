import { useEffect, useState } from "react";
import Logo from "./img/dictionaryLogo";
import SearchIcon from "./img/magnifying-glass";
import Moon from "./img/moonSVG";
import PlayAudio from "./img/audio";

const arr = ["Mono", "Serif", "Sans Serif"];
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

function Navbar({ setFontFamily }) {
  const [showOptions, setShowOptions] = useState(false);

  const [list, setList] = useState(0);
  function handleClick(e) {
    if (!e.target.id) return;
    setList(e.target.id);
    setShowOptions(!showOptions);
    setFontFamily(() => e.target.id);
  }
  function mouseEnter() {
    setShowOptions(!showOptions);
  }
  return (
    <nav className="navbar">
      <Logo />

      <div className="navIcons">
        <div
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseEnter}
          className="select"
        >
          <label>{arr[list]}</label>
          <i className="arrow"></i>
          {showOptions && (
            <ul className="options" onClick={handleClick}>
              <li id="0">{arr[0]}</li>
              <li id="1">{arr[1]}</li>
              <li id="2">{arr[2]}</li>
            </ul>
          )}
        </div>
        <hr></hr>
        <div className="darkmode">
          <Moon />
        </div>
      </div>
    </nav>
  );
}
function SearchQuery({ fontStyle, setQuery }) {
  const [onClick, setOnClick] = useState(false);
  const [errorborder, setErrorBorder] = useState(false);
  const [search, setSearch] = useState("Keyboard");

  function handleClick(e) {
    setErrorBorder(false);
    setSearch(e.target.value);
    setOnClick(true);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!search) setErrorBorder(true);
    setQuery(search);
  }
  return (
    <form className={`form`} onSubmit={(e) => handleSubmit(e)}>
      <div>
        <input
          className={errorborder ? "errorBorder" : onClick ? "onactive" : ""}
          onClick={() => setOnClick(!onClick)}
          type="text"
          value={search}
          placeholder="Search for any word ..."
          onChange={(e) => handleClick(e)}
        ></input>
        <button>
          <SearchIcon />
        </button>
      </div>
      {errorborder && <p>Whoops, can’t be empty…</p>}
    </form>
  );
}
function DictionaryMeaning({ item }) {
  return (
    <div>
      <div className="message__type">
        <p>{item.partOfSpeech}</p>
        <hr />
      </div>
      <div className="meaning">
        <p>meaning</p>
        <ul>
          {item.definitions.map((itr, i) => (
            <Meaning key={i} words={itr} />
          ))}
        </ul>
      </div>
      <div className="synomyms">
        <p> Synomyms</p>
        <p className="synonym">
          {item.synonyms.length === 0 ? (
            <span>No Available Synonyms</span>
          ) : (
            item.synonyms?.map((syn, i) => <span key={i}>{syn},</span>)
          )}
        </p>
      </div>
    </div>
  );
}
function DictionaryBody({ data }) {
  const [play, setPlay] = useState(false);
  const [items] = data;

  return (
    <div className="dictionary">
      <div className="message__heading">
        <ul>
          <li>{items?.word}</li>
          <li>{items?.phonetic}</li>
        </ul>
        <div>
          <PlayAudio onSetPlay={setPlay} />
          {play && (
            <audio src={items?.phonetics?.at(-1)?.audio || ""} autoPlay />
          )}
          <audio src={items?.phonetics?.at(-1)?.audio || ""} autoPlay />
        </div>
      </div>
      {items?.meanings?.map((item, i) => (
        <DictionaryMeaning key={i} item={item} />
      ))}
    </div>
  );
}
function Meaning({ words }) {
  return <li>{words.definition}</li>;
}
function Loader() {
  return (
    <div className="loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
function ErrorMessage({ error }) {
  return (
    <div className="errorMessage">
      <h2> 😕</h2>
      <h3> No Definitions Found</h3>
      <p>
        Sorry pal, we couldn't find definitions for the word you were looking
        for. You can try the search again at later time or head to the web
        instead.
      </p>
    </div>
  );
}
export default App;
