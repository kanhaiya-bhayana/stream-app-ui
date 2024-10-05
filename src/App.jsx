import { useState, useEffect } from 'react';
import './App.css';
import VideoUpload from './components/VideoUpload';
import { HR } from "flowbite-react";
import axios from 'axios';

axios.defaults.withCredentials = false;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function App() {
  const [videoUrls, setVideoUrls] = useState([]);

  useEffect(() => {
    // Fetch video URLs from the backend
    axios.get('http://localhost:8080/api/v1/videos')
      .then((response) => {
        setVideoUrls(response.data); // assuming response data is an array of URLs
      })
      .catch((error) => {
        console.error('Error fetching videos:', error);
      });
  }, []);

  return (
    <>
      <div className='flex flex-col items-center space-y-5 justify-center py-9'>
        <h1 className='text-5xl dark:text-white'>Stream Application</h1>
        <HR />
        <VideoUpload />

        {/* Video display section */}
        <div className="grid grid-cols-3 gap-4">
          {videoUrls.map((url, index) => (
            <div key={index} className="p-2">
              <video src={url} controls className="w-full h-auto"></video>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
