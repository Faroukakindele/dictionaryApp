export function Meaning({ words }) {
  return (
    <li>
      {words.definition}
      {words?.example && <span>"{words?.example}"</span>}
    </li>
  );
}
