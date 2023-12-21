export function ErrorMessage({ error }) {
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
