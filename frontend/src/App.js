import React, { useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

function App() {
  const onDrop = useCallback((acceptedFiles) => {
    alert("files");
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <main>
      <div className="container">
        {/* <div className="container__item"> */}
        {/* <form> */}

        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section className="container__item">
              <div className="container__item__file" {...getRootProps()}>
                <input {...getInputProps()} />
                <FontAwesomeIcon
                  className="icon"
                  icon={faImages}
                  color="#292929"
                  opacity="0.8"
                  size="6x"
                />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>

        {/* <div {...getRootProps()}>
            <label htmlFor="file-uplod" className="file">
              <FontAwesomeIcon
                className="icon"
                icon={faImages}
                color="#292929"
                opacity="0.8"
                size="6x"
              />
            </label>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div> */}

        {/* <input id="file-uplod" type="file" name="image"></input> */}
        {/* <input type="submit" value="Upload" className="submit"></input> */}
        {/* </form> */}
      </div>
      {/* </div> */}
    </main>
  );
}

export default App;
