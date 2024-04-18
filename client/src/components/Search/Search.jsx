import React, {  useState } from "react";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';



import { getData } from "../../api/api";



const Search = () => {

    const [searchName , setSearchname] = useState("");
    const [svgData , setSvgData] = useState(""); 

    const [notFound , setNotfound] = useState(false);



const handleNameChange = (e) => { 
    setSearchname(e.target.value)
  }

  const getSvg = async () => {
   const result = await getData(searchName);
  if(result !== undefined) {
    setNotfound(false)
    const {status , message , payload} = result;
   
    if(status === 200 ){
      console.log(message)
     if(payload !== null && payload !== undefined){
       setSvgData(payload[0].svg_data)
     }
    } else {
      setNotfound(true)
     alert("Enter correct name");
    }
   }
   else{
      alert("Enter correct name");
      setSearchname(null)
   }
  }
  

 const handleSubmit = () => {
    getSvg();
  }


return (<div style={{height: "max-content" , width:"90%" ,marginTop:"100px"}}>

    <h1>Search your SVG:</h1>
    <input
    placeholder="Enter name to search"
    value={searchName}
    onChange={handleNameChange}
    style={{height: "30px" , width:"300px" ,marginRight:"10px"}}
    />
    
    <Button
    onClick={handleSubmit}
    component="label"
    variant="contained"
    tabIndex={-1}
    startIcon={<SendIcon />}
  >
    Search
  </Button>
    
    
    <div style={{height : "600px" , width:"800px" , border:"2px solid black" , marginTop:"20px" , marginLeft:"20vw" , paddingTop:"65px", backgroundColor:"black" }}>
        {notFound ? <div> </div> : <div dangerouslySetInnerHTML={{ __html: svgData }} />  }
      </div>



</div>)
}
export default Search;


