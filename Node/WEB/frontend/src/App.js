import './App.css';
import { useState } from 'react';
import axios from 'axios';


function App() {
  const [file, setFile] = useState(null); // Initialize file state to null
  const [images, setImages] = useState([]); // Move images state here, shared by ImageList and UploadBar
  const { AzureKeyCredential } = require('@azure/core-auth');
  


  function processImage() {
    var subscriptionkey = '6f5eff14860c4d96b270295eb020094b';
    var uriBase = 'https://eastus.api.cognitive.microsoft.com/vision/2.0/analyze';
    var params = {
      "Features": 'Caption, DenseCaptions, Objects, People, Read, SmartCrops,Tags',
      "details": "",
      "language": "en",
    }

    const imageUrl = document.getElementById("inputImage").value;
    axios.post('/api/analyze', { imageUrl })
      .then(response => {
      document.querySelector("#responseTextArea").value = JSON.stringify(response.data, null, 2);
      document.querySelector("#sourceImage").src = imageUrl;
    })
    .catch(error => {
      console.error('Error processing image:', error);
      document.querySelector("#responseTextArea").value = "Failed to analyze image.";
    });
}
 
  // Handle file input change
  function handleChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  // Handle new images
  const handleNewImage = (newImage) => {
    setImages([...images, newImage]); // Add new image data to the images array
  }

  // UploadBar component
  function UploadBar({ onUpload }) {
    const handleUpload = async () => {
      if (file) {
        const formData = new FormData();
        const imageUrl = document.getElementById("inputImage").value;
        formData.append('file', file); // Make sure to append the actual file object

        try {
          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              //'Content-Type': 'application/json'
              'Ocp-Apim-Subscription-Key': '187ecef29cf949fc99d89a3bc047aa40',
            },
            type: "POST",

            data: '{"url": ' + '"' + imageUrl + '"}',
          })
          .done(function(data) {
            ('#responseTextArea').valueOf(JSON.stringify(data, null, 2));
          })
          ;
          onUpload(response.data); // Assuming the server responds with the new image data
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };

    return (
      <div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    );
  }

  // ImageList component
  function ImageList({ images }) {
    return (
      <div>
        {images.map((image, index) => (
          <img key={index} src={image.url} alt={`Uploaded ${index}`} style={{ width: '100px', height: '100px' }} />
        ))}
      </div>
    );
  }

  // Main App component render
  return (
    <div>
      <h1>Mary's Photo App </h1>
      Enter the URL to an image, then click the <strong>Analyze image</strong> button <br />
      Image to analyze:
      <input type='text' name='inputImage' id='inputImage'
        defaultValue='https://aka.ms/azsdk/image-analysis/sample.jpg' /> 
      <button onClick={processImage('https://aka.ms/azsdk/image-analysis/sample.jpg')}>Analyze image</button>
      <br /><br />
      <div id='wrapper' style={{ width: '1020px', display: 'table' }}>
        <div id="jsonOutput" style={{ width: '600px', display: 'table-cell' }}>
          Response: 
          <br /><br />
          <textarea id="responseTextArea" className="UIInput"
            style={{ width: '580px', height: '400px' }}></textarea>
        </div>
        <div id="imageDiv" style={{ width: '420px', display: 'table-cell' }}>
          Source image:
          <img id="sourceImage" width="400" alt="Source" />
        </div>
      </div>  
    <UploadBar onUpload={handleNewImage} />
    <ImageList images={images} />
    {images.map((image, index) => (
      <div key={index}>
        <img src={image.url} alt={`Uploaded ${index}`} style={{ width: '100px', height: '100px' }} />
        <div>

          {/* You can add more fields here based on what analysis results you want to display */}
        </div>
      </div>
    ))}
  </div>
);
}
async function fetchImageAnalysis(imageUrl) {
  try {
      const response = await fetch('/analyze-image', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ imageUrl })
      });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Analysis Results:', data);
  } catch (error) {
      console.error('Error:', error);
  }
}

// Call this function with the URL of the image you want to analyze


export default App;
