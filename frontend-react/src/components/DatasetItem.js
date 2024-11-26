import React from 'react';
import '../styles/DatasetItem.css';

const DatasetItem = ({ item, onTypeChange }) => {
  return (
    <>
      <tr className="dataset-group">
        <td colSpan="2">{item.name}</td>
        <td>
          {item.name === 'Bottle' ? (
            'Structural' // Bottle의 type은 고정
          ) : (
            // Pushpins의 type은 라디오 버튼으로 선택 가능
            <div>
              <label>
                <input
                  type="radio"
                  name={`type-${item.name}`}
                  value="Pair"
                  checked={item.type === 'Pair'}
                  onChange={() => onTypeChange('Pair')}
                />
                Pair
              </label>
              <label>
                <input
                  type="radio"
                  name={`type-${item.name}`}
                  value="Num"
                  checked={item.type === 'Num'}
                  onChange={() => onTypeChange('Num')}
                />
                Num
              </label>
              <label>
                <input
                  type="radio"
                  name={`type-${item.name}`}
                  value="Portion"
                  checked={item.type === 'Portion'}
                  onChange={() => onTypeChange('Portion')}
                />
                Portion
              </label>
            </div>
          )}
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