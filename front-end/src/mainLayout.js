import React,{useState} from "react";
import { Routes,Route } from 'react-router';
import Home from './pages/home';


import Customer from "./queue/customer";
import Calendar from "./queue/calendar";
import InformationQueue from "./queue/informationQueue";
import RequestType from "./queue/requestType";


function MainLayout() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home  render={(props) =>({...props})} />}/>
        <Route path="/new-customer" element={<main><Customer/></main>}/>
        <Route path="/calendar" element={<main><Calendar render={(props) =>({...props})}  /></main>}/>
        <Route path="/info" element={<InformationQueue render={(props) =>({...props})}  />} />
        {/* <Route path="/request-type" element={<RequestType render={(props) =>({...props})}  />} /> */}
      </Routes>
     
    </div>

 
  );
}

export default MainLayout;
