import { Meaning } from "./Meaning";

export function DictionaryMeaning({ item }) {
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
