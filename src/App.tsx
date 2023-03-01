import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';
import { AnimalDetailsPage } from './components/AnimalDetailPage/AnimalDetailPage';
import { Animals } from './components/AnimalList/AnimalList';
import { HomePage } from './components/HomePage/HomePage';


function App() {
  return (
    <div className="App">
      <> 
        <main>
          <Outlet context={{Animals,AnimalDetailsPage}}></Outlet>
        </main>
      </>
    </div>
  );
}

export default App;
