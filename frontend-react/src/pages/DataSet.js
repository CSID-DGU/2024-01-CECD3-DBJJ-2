import React from 'react';
import DatasetItem from '../components/DatasetItem';
import '../styles/Dataset.css';

const Dataset = () => {
  const data = [
    {
      name: 'Bottle',
      type: 'Structural',
      size: '180MB',
      date: '03/10/2024',
      details: [
        { tags: 'Train', detailType: 'good', size: '10.0MB', date: '03/10/2024' },
        { tags: 'Test', detailType: 'broken_large', size: '15.6MB', date: '03/10/2024' },
        { tags: 'Test', detailType: 'broken_small', size: '28.0MB', date: '03/10/2024' },
        { tags: 'Test', detailType: 'contamination', size: '19.0MB', date: '03/10/2024' },
      ],
    },
    {
      name: 'pushpins',
      type: 'Logical',
      size: '180MB',
      date: '03/10/2024',
      details: [
        { tags: 'Train', detailType: 'good', size: '10.0MB', date: '03/10/2024' },
        { tags: 'Test', detailType: 'good', size: '10.0MB', date: '03/10/2024' },
        { tags: 'Test', detailType: 'logical_anomalies', size: '10.0MB', date: '03/10/2024' },
      ],
    },
  ];

  // Structural과 Logical 데이터를 필터링
  const structuralData = data.filter((item) => item.type === 'Structural');
  const logicalData = data.filter((item) => item.type === 'Logical');

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
              <th>Detail Type</th>
              <th>Size</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {structuralData.map((item, index) => (
              <DatasetItem key={index} item={item} />
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
              <th>Detail Type</th>
              <th>Size</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {logicalData.map((item, index) => (
              <DatasetItem key={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dataset;
