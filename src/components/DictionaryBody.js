import { useState } from "react";
import PlayAudio from "../img/audio";
import { DictionaryMeaning } from "./DictionaryMeaning";

export function DictionaryBody({ data }) {
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
