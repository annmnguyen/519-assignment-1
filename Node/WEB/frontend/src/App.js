import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null); // Initialize file state to null
  const [images, setImages] = useState([]); // Move images state here, shared by ImageList and UploadBar

  // Handle file input change
  function handleChange(e) {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  // Handle new images
  const handleNewImage = (newImage) => {
    setImages([...images, newImage]); // Add new image data to the images array
  };

  // UploadBar component
  function UploadBar({ onUpload }) {
    const handleUpload = async () => {
      if (file) {
        const formData = new FormData();
        formData.append('file', file); // Make sure to append the actual file object

        try {
          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
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
      <UploadBar onUpload={handleNewImage} />
      <ImageList images={images} />
    </div>
  );
}

export default App;
