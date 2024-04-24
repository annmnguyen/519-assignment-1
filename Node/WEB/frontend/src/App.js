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
        <code>src/App.js</code> 
        </p>
        
        <form id="fileUploadForm" action="http://localhost:3000/analyze" method="post" enctype="multipart/form-data">
          <input type="file" name="file" required />
          
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
