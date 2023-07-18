import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Component/Layout';
import SortShowTutorial from './Container/Student.container/SortWordsTutorial/SortShowTutorial';
import SortByPicture from './Container/Teacher.container/SortByPicture/SortByPicture';
import SortTutorial from './Container/Teacher.container/SortWordsTutorial/SortTutorial';
import './App.css'
import TestCheck from './Container/Test.container/Test.Check';
import SortShowPictureTutorial from './Container/Student.container/SortPictureTutorial/SortShowPictureTutorial';

function App() {




  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} >
            <Route index element={<SortTutorial/>} />
            <Route path='/show' element={<SortShowTutorial/>} />
            <Route path='/sort' element={<SortByPicture/>} />
            <Route path='/showSort' element={<SortShowPictureTutorial/>}/>
          </Route>
        </Routes>
      
      </BrowserRouter>

      {/* <TestCheck/> */}
    </>
  );
}

export default App;
