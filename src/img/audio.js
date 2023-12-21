export default function PlayAudio({ onSetPlay }) {
  const style = {
    height: "100%",
    width: "100%",
    zIndex: "3",
    display: "block",
  };

  function handleplay() {
    onSetPlay((s) => !s);
  }

  return (
    <div style={style} onMouseEnter={handleplay} onMouseLeave={handleplay}>
      <svg
        className="playAudio"
        width="75"
        height="75"
        viewBox="0 0 75 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 4">
          <circle
            id="Oval"
            opacity=".25"
            cx="37.5"
            cy="37.5"
            r="37.5"
            fill="#A445ED"
          />
          <path
            id="Path 2"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29 27V48L50 37.5L29 27Z"
            fill="#A445ED"
          />
        </g>
      </svg>
    </div>
  );
}
