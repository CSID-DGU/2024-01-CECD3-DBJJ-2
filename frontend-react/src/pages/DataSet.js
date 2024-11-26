import React, { useState } from 'react';
import DatasetItem from '../components/DatasetItem';
import '../styles/Dataset.css';

const Dataset = () => {
  const [data, setData] = useState([
    {
      name: 'Bottle',
      type: 'Structural', // Structural로 고정
      size: '180MB',
      date: '03/10/2024',
      details: [
        { tags: 'Train', detailType: ' ', size: '10.0MB', date: '03/10/2024' },
        { tags: 'Test', detailType: ' ', size: '15.6MB', date: '03/10/2024' },
        { tags: 'Test', detailType: ' ', size: '28.0MB', date: '03/10/2024' },
        { tags: 'Test', detailType: ' ', size: '19.0MB', date: '03/10/2024' },
      ],
    },
    {
      name: 'Pushpins',
      type: 'Logical', // 라디오 버튼으로 선택 가능
      size: '180MB',
      date: '03/10/2024',
      details: [
        { tags: 'Train', detailType: ' ', size: '10.0MB', date: '03/10/2024' },
        { tags: 'Test', detailType: ' ', size: '10.0MB', date: '03/10/2024' },
        { tags: 'Test', detailType: ' ', size: '10.0MB', date: '03/10/2024' },
      ],
    },
  ]);
  const handleTypeChange = (itemIndex, newType) => {
    const updatedData = [...data];
    updatedData[itemIndex].type = newType;
    setData(updatedData);
  };
  // Structural과 Logical 데이터를 필터링
  const structuralData = data.filter((item) => item.name === 'Bottle');
  const logicalData = data.filter((item) => item.name === 'Pushpins');

  return (
    <div className="full">
      {/* Structural Section */}
      <div className="dataset">
        <h2>Structural</h2>
        <table className="dataset-table">
          <thead>
            <tr>
              <th>Data Name</th>
              <th>Tags</th>
              <th>Detection Type</th>
              <th>Size</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {structuralData.map((item, index) => (
              <DatasetItem
                key={index}
                item={item}
                onTypeChange={() => {}} // Structural은 고정이므로 변경 불가
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Logical Section */}
      <div className="dataset">
        <h2>Logical</h2>
        <table className="dataset-table">
          <thead>
            <tr>
              <th>Data Name</th>
              <th>Tags</th>
              <th>Detection Type</th>
              <th>Size</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {logicalData.map((item, index) => (
              <DatasetItem
                key={index}
                item={item}
                onTypeChange={(newType) => handleTypeChange(index, newType)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dataset;