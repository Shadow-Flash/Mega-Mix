import React from 'react';
import './App.css';
import ImageUploader from './Components/ImageUploader';
import UrlShortner from './Components/UrlShortner';

function App() {
  return (
    <div className="App">
     <h1>
      Mega Mix!
      </h1>
      <ul style={{textAlign: 'left'}}>
        <li>
          <UrlShortner/>
        </li>
        <li>
          <ImageUploader/>
        </li>
      </ul>
    </div>
  );
}

export default App;
