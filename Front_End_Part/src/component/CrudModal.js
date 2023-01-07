import React from "react";
import Add from "../crudcomponent/Add";
import Delete from "../crudcomponent/Delete";
import Edit from "../crudcomponent/Edit";

const CrudModal = ({ open, close, selectedCheckboxes, setRefresh }) => {

  if (open === "") return null;

  if (open === "add") {

    return <Add open={true} close={close}  setRefresh={setRefresh}/>;

  } 
  else if (open === "edit") {
  
    return <Edit open={true} close={close} selectedCheckboxes={selectedCheckboxes} setRefresh={setRefresh}/>

  } else if (open === "delete") {
    
    return <Delete open={true} close={close} selectedCheckboxes={selectedCheckboxes} setRefresh={setRefresh}/>

  } else {

    return null;
    
  }
  
};

export default CrudModal;
