import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Component/Layout';
import SortShowTutorial from './Container/Student.container/SortWordsTutorial/SortShowTutorial';
import SortByPicture from './Container/Teacher.container/SortByPicture/SortByPicture';
import SortTutorial from './Container/Teacher.container/SortWordsTutorial/SortTutorial';
import './App.css'

function App() {




  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} >
            <Route index element={<SortTutorial/>} />
            <Route path='/show' element={<SortShowTutorial/>} />
            <Route path='/sort' element={<SortByPicture/>} />
            <Route path='/showSort' element={<h2>awdad</h2>}/>
          </Route>
        </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
