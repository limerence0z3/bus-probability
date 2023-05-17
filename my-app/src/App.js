import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
import HomeRoute from './page/HomeRoute';
import Home from './page/Home';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeRoute/>}>
          <Route index element= {<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
