import React, { useState } from 'react';
import '../styles/Detection.css';
import '../styles/Reports.css';

const Reports = () => {
    const [data, setData] = useState([
        { name: 'Breakfast', tags: 'Test', type: 'good', isOpen: false },
        { name: 'Pushpins', tags: 'Test', type: 'good', isOpen: false },
        { name: 'Screwbag', tags: 'Test', type: 'good', isOpen: false },
    ]);

    const [selectedDataset, setSelectedDataset] = useState('Breakfast');
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [resultText, setResultText] = useState('');
    const [labelImages, setLabelImages] = useState([]);
    const [resultImages, setResultImages] = useState([]);
    const [selectedData, setSelectedData] = useState(null);


    const toggleDropdown = (index) => {
        setData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, isOpen: !item.isOpen } : item
            )
        );
        setSelectedImageIndex(null);
        loadLabelImages(data[index].name);
    };

    const loadLabelImages = (dataset) => {
        setSelectedDataset(dataset);
        const imagePaths = Array.from({ length: 20 }, (_, i) =>
            `/images/detection2/result/${dataset}/label_visualization/${String(i+1).padStart(3, '0')}_label_visualization.png`
        );
        setLabelImages(imagePaths);
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);

        const resultTextPath = `/images/detection2/result/${selectedDataset}/${String(index+1).padStart(3, '0')}/${String(index+1).padStart(3, '0')}_result.txt`;
        fetch(resultTextPath)
            .then((response) => response.text())
            .then((text) => setResultText(text))
            .catch((error) => {
                console.error('Failed to fetch result text:', error);
                setResultText('Error loading result text.');
            });

        const resultImagePaths = Array.from({ length: 6 }, (_, i) =>
            `/images/detection2/result/${selectedDataset}/${String(index+1).padStart(3, '0')}/${String(index+1).padStart(3, '0')}_crop_${i}.png`
        );
        setResultImages(resultImagePaths);

        const clickedData = data.find((item) => item.name === selectedDataset);
        
        // 타입 결정 로직 추가
        let type = 'good'; // 기본값
        if (selectedDataset === 'Breakfast') {
            if ([19, 20].includes(index + 1)) type = 'structural';
            if ([6, 7, 8].includes(index + 1)) type = 'logical';
        } else if (selectedDataset === 'Pushpins') {
            if ([3, 9, 20].includes(index + 1)) type = 'structural';
            if ([8, 12].includes(index + 1)) type = 'logical';
        } else if (selectedDataset === 'Screwbag') {
            if ([1, 3].includes(index + 1)) type = 'structural';
            if ([2, 20].includes(index + 1)) type = 'logical';
        }


        setSelectedData({ ...clickedData, type });
    };

    return (
        <div className="full-container">
            <div className="data-set">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>DataName</th>
                            <th>Tags</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr onClick={() => toggleDropdown(index)}>
                                    <td>{item.name}</td>
                                    <td></td>
                                </tr>
                                {item.isOpen && (
                                    <tr className="dropdown-row">
                                        <td></td>
                                        <td>{item.tags}</td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="det-container">
            <div className="pic-view">
                {labelImages.length > 0 ? (
                    labelImages.map((path, index) => {
                        let borderColor = 'none';
                        if (selectedDataset === 'Breakfast') {
                            if ([19, 20].includes(index + 1)) borderColor = 'blue'; // Structural
                            if ([6, 7, 8].includes(index + 1)) borderColor = 'red';    // Logical
                        } else if (selectedDataset === 'Pushpins') {
                            if ([3, 9, 20].includes(index + 1)) borderColor = 'blue'; // Structural
                            if ([8, 12].includes(index + 1)) borderColor = 'red';      // Logical
                        } else if (selectedDataset === 'Screwbag') {
                            if ([1, 3].includes(index + 1)) borderColor = 'blue'; // Structural
                            if ([2, 20].includes(index + 1)) borderColor = 'red';   // Logical
                        }

                        return (
                                <img
                                key={index}
                                src={path}
                                alt={`Label Visualization ${index}`}
                                className="sample-image2"
                                onClick={() => handleImageClick(index)}
                                style={{
                                    border: selectedImageIndex === index ? 'none' : `3px solid ${borderColor}`, 
                                    boxShadow:
                                        selectedImageIndex === index
                                            ? '0 0 10px 5px gray' // 클릭된 이미지만 회색 box-shadow
                                            : 'none', 
                                    cursor: 'pointer',
                                    transition: 'box-shadow 0.3s ease, border 0.3s ease', 
                                }}
                            />
                        );
                    })
                ) : (
                    <p>No images available</p>
                )}
            </div>

                <div className="result-view">
                    <div className="result-table">
                    <table>
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Data Name</th>
                                    <th>Tags</th>
                                    <th>Anomaly Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedData ? (
                                    <tr>
                                        <td>{selectedImageIndex !== null ? selectedImageIndex + 1 : '-'}</td>
                                        <td>{selectedData.name}</td>
                                        <td>{selectedData.tags}</td>
                                        <td>{selectedData.type}</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="4">No data selected</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="result-text">
                        <pre>{resultText}</pre>
                    </div>
                    <div className="result-pic2">
                        {resultImages.map((resultImage, idx) => (
                            <img
                                key={idx}
                                src={resultImage}
                                alt={`Result Crop ${idx}`}
                                className="sample-image"
                                style={{
                                    margin: '5px',
                                    maxWidth: '100px',
                                    maxHeight: '100px',
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
