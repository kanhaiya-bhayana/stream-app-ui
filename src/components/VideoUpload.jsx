import React from 'react'
import { CiYoutube } from "react-icons/ci";
import { Button, Card } from 'flowbite-react';
const VideoUpload = () => {
  return (
    <div>
      <Card>
        <h1 className='dark:text-white'>Upload vidoes</h1>
      <form class="flex items-center space-x-9">
        <div class="shrink-0">
          {/* <img class="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" /> */}
          <CiYoutube className='text-2xl' />
        </div>
        <label class="block">
          <span class="sr-only">Choose video file</span>
          <input type="file" class="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
        "/>
        </label>
        <Button>Upload</Button>
      </form>
      </Card>
    </div>
  )
}

export default VideoUpload