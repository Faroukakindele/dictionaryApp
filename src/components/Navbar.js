import { useState } from "react";
import Logo from "../img/dictionaryLogo";
import Moon from "../img/moonSVG";
import { arr } from "../App";

export function Navbar({ fontFamily, setFontFamily }) {
  const [showOptions, setShowOptions] = useState(false);

  function handleClick(e) {
    if (!e.target.id) return;
    setShowOptions(!showOptions);
    setFontFamily(() => Number(e.target.id));
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
          <label>{arr[fontFamily]}</label>
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
