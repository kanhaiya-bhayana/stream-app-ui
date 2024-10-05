import React, { useState } from 'react';
import { CiYoutube } from "react-icons/ci";
import { Button, Card, Label, TextInput, Textarea, Spinner } from 'flowbite-react';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';  // Import a success icon
import axios from 'axios';

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [errorUploading, setErrorUploading] = useState(false); // Error flag
  const [message, setMessage] = useState("");

  // State for metadata containing title and description
  const [metadata, setMetadata] = useState({
    title: "",
    description: ""
  });

  function handleFileChange(event) {
    const file = event.target.files[0];
    setSelectedFile(file);
  }

  // Reset form fields
  function resetForm() {
    setSelectedFile(null);
    setMetadata({ title: "", description: "" });
    // setProgress(0);
    // setMessage("");
  }

  // Generic input change handler
  function handleInputChange(event) {
    const { name, value } = event.target;
    setMetadata(prevMetadata => ({
      ...prevMetadata,
      [name]: value // Update the corresponding field based on the name attribute
    }));
  }

  function handleForm(formEvent) {
    formEvent.preventDefault();

    if (!selectedFile) {
      alert("Select file first.");
      return;
    }
    saveFileToServer(selectedFile, metadata);
  }

  async function saveFileToServer(selectedFile, metadata) {
    setUploading(true); // Set uploading to true when the process starts
    setMessage(""); // Clear any previous messages

    try {
      let formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", metadata.title);
      formData.append("description", metadata.description);

      let response = await axios.post("http://localhost:8080/api/v1/videos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted); // Update the progress state
          console.log(`Progress: ${percentCompleted}%`);
        }
      });

      console.log(response);
      setMessage("File uploaded successfully"); // Show success message
    } catch (error) {
      console.error("File upload error:", error.message);
      setErrorUploading(true);
      setMessage("File upload failed"); // Show error message
    } finally {
      setUploading(false); // Set uploading to false after process ends
    }
  }

  return (
    <div className="flex w-full justify-center">
      <Card className="max-w-3xl w-full">
        <h1 className='dark:text-white'>Upload videos</h1>
        <form className="space-y-4" onSubmit={handleForm}>
          {/* Title input field */}
          <div>
            <Label htmlFor="title" value="Video Title" />
            <TextInput
              id="title"
              name="title"
              type="text"
              sizing="sm"
              className="w-full"
              value={metadata.title}
              onChange={handleInputChange}
            />
          </div>

          {/* Description box */}
          <div>
            <Label htmlFor="description" value="Video Description" />
            <Textarea
              id="description"
              name="description"
              className="w-full"
              rows={4}
              value={metadata.description}
              onChange={handleInputChange}
            />
          </div>

          {/* File input and upload button */}
          <div className="flex items-center space-x-4">
            <div className="shrink-0">
              <CiYoutube className='text-2xl' />
            </div>
            <label className="block w-full">
              <span className="sr-only">Choose video file</span>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
              />
            </label>
            <Button type="button" color="gray" onClick={resetForm}>Reset</Button> {/* Reset button */}
            <Button type="submit" disabled={uploading}>Upload</Button>
          </div>

          {/* Display the spinner or success message */}
          {uploading && <div className='flex items-center space-x-2'>
            <Spinner aria-label="Default status example" />
            <span>Uploading... {progress}%</span>
          </div>}

          {/* Conditional rendering based on errorUploading flag */}
          {errorUploading ? (
            <div className="flex items-center text-lg text-red-600">
              <HiExclamationCircle className="mr-2" />
              <span>{message}</span>
            </div>
          ) : (
            message && (
              <div className="flex items-center text-green-600">
                <HiCheckCircle className="mr-2" />
                <span>{message}</span>
              </div>
            )
          )}
        </form>
      </Card>
    </div>
  );
}

export default VideoUpload;
