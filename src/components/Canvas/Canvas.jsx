import React, { useState, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import "./Canvas.css";

const Canvas = ({id}) => {
  const canvas = useRef();

  const [image, setImage] = useState(null);
  const [ noteTitle, setNoteTitle ] = useState('Sample Note Title')

  const exportImage = () => {
    canvas.current
      .exportImage("png")
      .then(data => {
        setImage(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const clearCanvas = () => {
    canvas.current.clearCanvas();
    setImage(null)
  }

  const handleSaveImg = async() => {
    console.log(image);
    clearCanvas();
  }

  return (
    <div className="canvas__container">
      <ReactSketchCanvas
        ref={canvas}
        width="95%"
        height="80vh"
        strokeWidth={5}
        strokeColor="black"
        backgroundImage={"https://upload.wikimedia.org/wikipedia/commons/7/70/Graph_paper_scan_1600x1000_%286509259561%29.jpg"}
      />
      <div className="canvas__controls">
        <button className="monochrome__btn" onClick={exportImage}>Get Image</button>
        <button className="monochrome__btn" onClick={clearCanvas}>Clear</button>
      </div>
      {image && (
        <div className="image__container">
          <img src={image} alt="Drawing" />
          <div className='input__prompt'>
            <input type='text' name='prompt' className='prompt__value' value={noteTitle} onChange={(e) => {setNoteTitle(e.target.value)}} />
          </div>
          <button className="monochrome__btn" onClick={handleSaveImg}>Save as a Note</button>
        </div>
        )}
    </div>
  );
};

export default Canvas;
