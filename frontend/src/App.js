import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [selectedFile, setSelectedFile] = useState("");
  const [image, setImage] = useState("");

  const postImage = async (file) => {
    setSelectedFile(file[0].path);
    const data = new FormData();
    data.append("file", file[0]);

    const fetchedFile = await axios.post(
      "http://localhost:8080/v1/file/",
      data
    );

    setImage(bufferToBase64(fetchedFile.data.data.data));
  };

  const bufferToBase64 = (buf) => {
    let binstr = Array.prototype.map
      .call(buf, (ch) => {
        return String.fromCharCode(ch);
      })
      .join("");
    return btoa(binstr);
  };

  return (
    <main>
      <div className="container">
        {image ? (
          <img src={`data:image/jpeg;base64,${image}`} />
        ) : (
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
        )}
      </div>
    </main>
  );
}

export default App;
