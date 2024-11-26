import React from 'react';
import '../styles/DatasetItem.css';

const DatasetItem = ({ item }) => {
  return (
    <>
      <tr className="dataset-group">
        <td colSpan="2">{item.name}</td>
        <td>
          {item.name === 'Bottle'
            ? 'Structural'
            : 'Logical - Count'}
        </td>
        <td>{item.size}</td>
        <td>{item.date}</td>
        <td>
          <button className="delete-button">Delete</button>
        </td>
      </tr>
      {item.details.map((detail, idx) => (
        <tr key={idx} className="dataset-detail">
          <td>
            <input type="checkbox" />
          </td>
          <td>{detail.tags}</td>
          <td>{detail.detailType}</td>
          <td>{detail.size}</td>
          <td>{detail.date}</td>
          <td></td>
        </tr>
      ))}
    </>
  );
};

export default DatasetItem;
