import React, { useState } from 'react';
import '../styles/Detection.css';
import '../styles/Reports.css';

const Reports = () => {
    const [data, setData] = useState([
        { name: 'breakfast', tags: 'Test', isOpen: false },
        { name: 'pushPins', tags: 'Test', isOpen: false },
        { name: 'screwBag', tags: 'Test', isOpen: false },
    ]);

    const [selectedDataset, setSelectedDataset] = useState('breakfast');
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [resultText, setResultText] = useState('');
    const [labelImages, setLabelImages] = useState([]);
    const [resultImages, setResultImages] = useState([]);

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
        const imagePaths = Array.from({ length: 21 }, (_, i) =>
            `/images/result/${dataset}/label_visualization/${String(i).padStart(3, '0')}_label_visualization.png`
        );
        setLabelImages(imagePaths);
    };

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);

        const resultTextPath = `/images/result/${selectedDataset}/${String(index).padStart(3, '0')}/${String(index).padStart(3, '0')}_result.txt`;
        fetch(resultTextPath)
            .then((response) => response.text())
            .then((text) => setResultText(text))
            .catch((error) => {
                console.error('Failed to fetch result text:', error);
                setResultText('Error loading result text.');
            });

        const resultImagePaths = Array.from({ length: 5 }, (_, i) =>
            `/images/result/${selectedDataset}/${String(index).padStart(3, '0')}/${String(index).padStart(3, '0')}_crop_${i}.png`
        );
        setResultImages(resultImagePaths);
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
                        labelImages.map((path, index) => (
                            <img
                                key={index}
                                src={path}
                                alt={`Label Visualization ${index}`}
                                className="sample-image2"
                                onClick={() => handleImageClick(index)}
                                style={{
                                    border: selectedImageIndex === index ? '3px solid blue' : 'none',
                                    cursor: 'pointer',
                                }}
                            />
                        ))
                    ) : (
                        <p>No images available</p>
                    )}
                </div>

                <div className="result-view">
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
