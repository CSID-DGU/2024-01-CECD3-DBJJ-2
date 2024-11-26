import React, { useState, useEffect } from 'react';
import '../styles/Detection.css';

const Detection = () => {
    // 데이터 목록 상태
    const [data, setData] = useState([
        { name: 'breakfast', tags: 'Test', isOpen: false },
        { name: 'pushPins', tags: 'Test', isOpen: false },
        { name: 'screwBag', tags: 'Test', isOpen: false }
    ]);

    // 코드 텍스트 상태
    const [codetext, setCodetext] = useState('');
    

    // 현재 선택된 데이터셋 상태
    const [selectedDataset, setSelectedDataset] = useState('breakfast');
    const [imagePaths, setImagePaths] = useState([]);

    // 드롭다운 토글 핸들러
    const toggleDropdown = (index) => {
        setData((prevData) =>
            prevData.map((item, i) =>
                i === index ? { ...item, isOpen: !item.isOpen } : item
            )
        );
    };

    // 데이터셋 클릭 시 이미지 로드
    const loadImages = (datasetName) => {
        setSelectedDataset(datasetName);

        // 이미지 경로 업데이트
        const paths = Array.from({ length: 20 }, (_, i) =>
            `/images/detection2/data/${datasetName}/${String(i + 1).padStart(3, '0')}.png`
        );
        setImagePaths(paths);

        // 텍스트 파일 경로 생성
        const textFilePath = `/images/detection2/text/${datasetName}.txt`;

        // 텍스트 파일 로드
        fetch(textFilePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch text file: ${response.statusText}`);
                }
                return response.text();
            })
            .then((text) => setCodetext(text))
            .catch((error) => {
                console.error('Failed to load text file:', error);
                setCodetext('Error loading text file.');
            });
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
                                <tr
                                    onClick={() => {
                                        toggleDropdown(index);
                                        loadImages(item.name); // 선택된 데이터셋 로드
                                    }}
                                >
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
                    {imagePaths.map((path, index) => (
                        <img
                            key={index}
                            src={path}
                            alt={`Sample ${index + 1}`}
                            className="sample-image2"
                        />
                    ))}
                </div>

                <div className="code-view">
                    <pre>{codetext}</pre>
                </div>
            </div>
        </div>
    );
};

export default Detection;
