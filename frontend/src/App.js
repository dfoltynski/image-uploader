import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [selectedFile, setSelectedFile] = useState("");

  const postImage = (file) => {
    setSelectedFile(file[0].path);
    const data = new FormData();
    data.append("file", file[0]);

    axios.post("http://localhost:8080/v1/file/", data);
    console.log(file[0]);
  };

  return (
    <main>
      <div className="container">
        <Dropzone onDrop={(acceptedFile) => postImage(acceptedFile)}>
          {({ getRootProps, getInputProps }) => (
            <section className="container__item">
              <div className="container__item__file" {...getRootProps()}>
                <input {...getInputProps()} name="file" />
                <FontAwesomeIcon
                  className="icon"
                  icon={faImages}
                  color="#292929"
                  opacity="0.8"
                  size="6x"
                />
                <p>
                  {selectedFile ||
                    "Drag 'n' drop some files here, or click to select files"}
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    </main>
  );
}

export default App;
