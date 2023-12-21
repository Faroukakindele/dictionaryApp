export function Meaning({ words }) {
  return (
    <li>
      {words.definition}
      <span>"{words?.example}"</span>
    </li>
  );
}
