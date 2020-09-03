import React from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <main>
      <div className="container">
        <div className="container__item">
          <form>
            <label htmlFor="file-uplod" className="file">
              <FontAwesomeIcon
                icon={faImages}
                color="#292929"
                opacity="0.8"
                transform="grow-128"
              />
            </label>
            <input id="file-uplod" type="file" name="image"></input>
          </form>
        </div>
      </div>
    </main>
  );
}

export default App;
