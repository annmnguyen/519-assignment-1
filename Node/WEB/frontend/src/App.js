import logo from './logo.svg';
import './App.css';

function App() {
  const handleUpload = (event) => {
    event.preventDefault(); // Prevent the default form submission
    document.getElementById('fileUploadForm').submit(); // Submit the form
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        <form id="fileUploadForm" action="http://localhost:3000/analyze" method="post" enctype="multipart/form-data">
          <input type="file" name="file" required />
          <button type="button" onClick={handleUpload} style={{ background: "#801212" }}>
            Upload Image
          </button>
        </form>
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
