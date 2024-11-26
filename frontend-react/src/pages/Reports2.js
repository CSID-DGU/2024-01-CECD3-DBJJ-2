import React, { useState } from 'react';
import '../styles/Detection.css';
import '../styles/Reports.css';

const Reports = () => {
    const [data, setData] = useState([
        { name: 'breakfast', tags: 'Production', type: 'good', isOpen: false },
        { name: 'pushPins', tags: 'Production', type: 'good', isOpen: false },
        { name: 'screwBag', tags: 'Production', type: 'good', isOpen: false },
    ]);

    const [selectedDataset, setSelectedDataset] = useState('breakfast');
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

        const resultImagePaths = Array.from({ length: 5 }, (_, i) =>
            `/images/detection2/result/${selectedDataset}/${String(index+1).padStart(3, '0')}/${String(index+1).padStart(3, '0')}_crop_${i}.png`
        );
        setResultImages(resultImagePaths);

        const clickedData = data.find((item) => item.name === selectedDataset);
        
            // 타입 결정 로직 추가
        let type = 'good'; // 기본값
        if (selectedDataset === 'breakfast') {
            if ([19, 20].includes(index + 1)) type = 'structural';
            if ([6, 7, 8].includes(index + 1)) type = 'logical';
        } else if (selectedDataset === 'pushPins') {
            if ([3, 9, 20].includes(index + 1)) type = 'structural';
            if ([8, 12].includes(index + 1)) type = 'logical';
        } else if (selectedDataset === 'screwBag') {
            if ([1, 3].includes(index + 1)) type = 'structural';
            if ([2, 20].includes(index + 1)) type = 'logical';
        }

        // 선택한 데이터에 타입 추가
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
                        // Determine border color based on type
                        let borderColor = 'none'; // Default (no border)
                        if (selectedDataset === 'breakfast') {
                            if ([19, 20].includes(index + 1)) borderColor = 'yellow'; // Structural
                            if ([6, 7, 8].includes(index + 1)) borderColor = 'red';    // Logical
                        } else if (selectedDataset === 'pushPins') {
                            if ([3, 9, 20].includes(index + 1)) borderColor = 'yellow'; // Structural
                            if ([8, 12].includes(index + 1)) borderColor = 'red';      // Logical
                        } else if (selectedDataset === 'screwBag') {
                            if ([1, 3].includes(index + 1)) borderColor = 'yellow'; // Structural
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
                                    border: selectedImageIndex === index ? '3px solid blue' : `3px solid ${borderColor}`,
                                    cursor: 'pointer',
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
                                        <td colSpan="3">No data selected</td>
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
