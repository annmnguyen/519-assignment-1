import logo from './logo.svg';
import './App.css';
import React { UseEffect, UseState } from 'react';
import axios from 'axios';

function App() {
  const handleUpload = (evemt) => {
    const files = event.target.files;
    const filedata = new FileData();
    Array.from(files).forEach(file => fileData.append('photos', file));
    axios.post('/api/UploadFile', filedata)
      .then(response => {
        console.log('upload success', reponse.data);
      })
      .catch(error => {
        console.error('upload failed', error);
      });
  };
    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" multiple onChange={handleUpload} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
