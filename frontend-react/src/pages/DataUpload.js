import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/DataUpload.css'; // CSS 파일 가져오기

const DataUpload = () => {
  const [dataName, setDataName] = useState('');
  const [tags, setTags] = useState('');
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div className="container">
      <h2 className="header">Data Upload</h2>
      <div className="inputRow">
        <input
          type="text"
          placeholder="Data Name"
          value={dataName}
          onChange={(e) => setDataName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="input"
        />
      </div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>파일을 선택하거나 여기로 드래그하세요</p>
        <button className="button">Select Files</button>
        <button className="button">Select Folder</button>
      </div>
      <div>
        {files.map((file) => (
          <p key={file.path}>{file.path} - {file.size} bytes</p>
        ))}
      </div>
    </div>
  );
};

export default DataUpload;
