// src/App.js
import React from 'react';
import Pagination from './Pagination';
import './App.css'; // Optional: Add your styles here

const App = () => {
  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <Pagination />
    </div>
  );
};

export default App;