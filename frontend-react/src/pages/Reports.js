import React, { useState } from 'react';
import '../styles/Detection.css';
import '../styles/Reports.css';

const Reports = () => {

        // 데이터 목록 상태
        const [data, setData] = useState([
            { name: 'Bottle', tags: 'Production', isOpen: false }
        ]);
    
        // 드롭다운 토글 핸들러
        const toggleDropdown = (index) => {
            setData((prevData) =>
                prevData.map((item, i) =>
                    i === index ? { ...item, isOpen: !item.isOpen } : item
                )
            );
        };

    const images = Array.from({ length: 22 }, (_, i) => {
        const anomalyTypes = {
            3: 'broken_large',
            5: 'broken_large',
            6: 'broken_large',
            20: 'broken_small',
            21: 'broken_small',
            9: 'contamination',
            13: 'contamination',
        };
        
        return {
            path: `/images/detection1/detect1_report/${String(i).padStart(3, '0')}.png`,
            tableData: `Table Data for Image ${i}`,
            resultImage: `/images/detection1/detect1_result/${String(i).padStart(3, '0')}.png`,
            anomalyType: anomalyTypes[i] || 'good', // 나머지는 'good'
        };
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div class="full-container">
            <div class="data-set">
            <table className="data-table">
                    <thead>
                        <tr>
                            <th>Data Name</th>
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

            <div class="det-container">
                <div class="pic-view">
                {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.path}
                            alt={`Sample ${index}`}
                            className="sample-image"
                            onClick={() => setSelectedIndex(index)} // 이미지 클릭 시 상태 업데이트
                            style={{
                                border: selectedIndex === index ? '3px solid blue' : 'none', // 선택된 이미지 강조
                                cursor: 'pointer'
                            }}
                        />
                ))}
                </div>

                <div class="result-view">
                <div className="result-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Data Name</th>
                                    <th>Tags</th>
                                    <th>Anomaly Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Bottle</td>
                                    <td>Production</td>
                                    <td>{images[selectedIndex].anomalyType}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="result-pic">
                        <img
                            src={images[selectedIndex].resultImage}
                            alt={`Result for Image ${selectedIndex}`}

                        />
                    </div>
                </div>
            </div>
            </div> 
    );
};

export default Reports;
