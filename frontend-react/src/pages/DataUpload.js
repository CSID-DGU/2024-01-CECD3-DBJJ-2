import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/DataUpload.css';

const DataUpload = () => {
  const [dataName, setDataName] = useState('');
  const [anomalyDetail, setAnomalyDetail] = useState('logical');
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const handleFolderUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
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
        <select
          value={anomalyDetail}
          onChange={(e) => setAnomalyDetail(e.target.value)}
          className="input"
        >
          <option value="Structural">Structural</option>
          <option value="Logical-Count">Logical-Count</option>
          <option value="Logical-Pair">Logical-Pair</option>
          <option value="Logical-Portion">Logical-Portion</option>
        </select>
      </div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop files here, or use the button below</p>
        <label className="button">
          Select Folder
          <input
            type="file"
            ref={fileInputRef}
            webkitdirectory="true"
            mozdirectory="true"
            directory="true"
            onChange={handleFolderUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      <div className="fileList">
        {files.map((file) => (
          <p key={file.path || file.name}>
            {file.path || file.name} - {file.size} bytes
          </p>
        ))}
      </div>
    </div>
  );
};

export default DataUpload;
