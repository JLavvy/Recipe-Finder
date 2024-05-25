import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecipeFinder } from './component/recipe';

function App() {
 

  return (
    <>
     <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<RecipeFinder />} />
        </Routes>
      </Router>
     </div>
    
    </>
  )
}

export default App
