import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoUpload from './components/VideoUpload'
import { HR } from "flowbite-react";
import axios from 'axios';

axios.defaults.withCredentials = false;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex flex-col items-center space-y-5 justify-center py-9'>
      <h1 className='text-5xl dark:text-white'>Stream Application</h1>
      <HR />
      <VideoUpload />
    </div>
      
    </>
  )
}

export default App
