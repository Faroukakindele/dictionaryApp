import { useState } from "react";
import SearchIcon from "../img/magnifying-glass";

export function SearchQuery({ fontStyle, setQuery }) {
  const [onClick, setOnClick] = useState(false);
  const [errorborder, setErrorBorder] = useState(false);
  const [search, setSearch] = useState("");

  function handleClick(e) {
    setErrorBorder(false);
    setSearch(e.target.value);
    setOnClick(true);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!search) setErrorBorder(true);
    setQuery(search);
    setOnClick(false);
  }
  return (
    <form className={`form`} onSubmit={(e) => handleSubmit(e)}>
      <div>
        <input
          className={errorborder ? "errorBorder" : onClick ? "onactive" : ""}
          onFocus={() => setOnClick(true)}
          onBlur={() => setOnClick(false)}
          autoFocus
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
