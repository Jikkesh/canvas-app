import React, { useEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { addData } from "../../api/api";


const createElement = (id, x1, y1) => {
  return { id, points: [{ x: x1, y: y1 }] };
};


const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const [name , setName] = useState(null);

  const svgRef = useRef();


useEffect(() => {
  const svg = svgRef.current;

  elements.forEach(element => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const d = `M ${element.points[0].x} ${element.points[0].y} ${element.points
      .slice(1)
      .map(point => `L ${point.x} ${point.y}`)
      .join(" ")}`;
    path.setAttribute("d", d);
    path.setAttribute("stroke", "black");
    path.setAttribute("fill", "none");
    svg.appendChild(path);
  });
}, [elements]);

const getMouseCoordinates = event => {
  const svg = svgRef.current;
  const pt = svg.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
  return { x: svgPoint.x, y: svgPoint.y };
};


  const handleMouseDown = event => {

    const { x, y } = getMouseCoordinates(event);
    const id = elements.length;
    const element = createElement(id, x, y);
    setElements(prevState => [...prevState, element]);
    setSelectedElement(element);
  };

  const handleMouseMove = event => {
    const { x, y } = getMouseCoordinates(event);

    if (selectedElement) {
      const updatedElement = { ...selectedElement };
      updatedElement.points.push({ x: x, y: y });

      setElements(prevState =>
        prevState.map(el => (el.id === selectedElement.id ? updatedElement : el))
      );
    }
  };

  const handleMouseUp = () => {
    setSelectedElement(null);
  };

  const handleNameChange = (event) =>{
    setName(event.target.value)
  }

  const convertToSvg = () => {
    const svgElement = document.getElementById('canvas');
    const svgString = svgElement.outerHTML;
    return svgString.toString();

  };

const handleSubmit = async () =>{

  if(name === "" ){
    alert("Enter the name to save");
    return;
  }

  const svgData = convertToSvg();
  const data = {name : name , svgData : svgData}
  console.log(data)
  const result = await addData(data)
  const {status , message} = result;
  if(status === 200){
    console.log(message)
    alert("Submited Successful");
    setName(null);
  }else{
    alert("Error, Try Again")
  }
  
}

  return (
    <div style={{display:"flex" , flexDirection: "column" , gap:"20px"}}>
      <svg
      id="canvas"
      ref={svgRef}
      width={700} 
      height={500} 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ backgroundColor: "white" , border:"2px solid black", borderRadius:"20px"}}
    />

    <input 
    type="text" 
    placeholder="Name your Drawing" 
    onChange={handleNameChange}
    value={name} 
    />
    <div style={{display:"flex" , gap:"10px"}}>   
    

    <Button
    style={{width:"50%"}}
    onClick={handleSubmit}
    component="label"
    role={undefined}
    variant="contained"
    tabIndex={-1}
    startIcon={<CloudUploadIcon />}
  >
    Upload file
  </Button> </div>
  
  </div>
  );
};

export default Canvas;