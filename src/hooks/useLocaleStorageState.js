import { useEffect, useState } from "react";

export function useLocaleStorage(key) {
  const [fontFamily, setFontFamily] = useState(function () {
    const storedValue = Number(localStorage.getItem("fontFamily"));
    return Number(storedValue) ?? 0;
  });
  const [query, setQuery] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? storedValue : "Dictionary";
  });

  useEffect(
    function () {
      localStorage.setItem(key, query);
    },
    [key, query]
  );
  useEffect(
    function () {
      localStorage.setItem("fontFamily", JSON.stringify(fontFamily));
    },
    [fontFamily]
  );
  return { fontFamily, setFontFamily, query, setQuery };
}
