import React, { useState, useEffect } from 'react';
import '../styles/Detection.css';

const Detection = () => {

        // 데이터 목록 상태
        const [data, setData] = useState([
            { name: 'Bottle', tags: 'Test', isOpen: false }
        ]);

        // 코드 텍스트 상태
        const [codetext, setCodetext] = useState('');
    
        // 드롭다운 토글 핸들러
        const toggleDropdown = (index) => {
            setData((prevData) =>
                prevData.map((item, i) =>
                    i === index ? { ...item, isOpen: !item.isOpen } : item
                )
            );
        };

    const imagePaths = Array.from({ length: 22 }, (_, i) => 
            `/images/detection1/detect1/${String(i).padStart(3, '0')}.png`
    ); 

    // 텍스트 파일을 불러오는 useEffect
    useEffect(() => {
        fetch('/images/detection1/detect1_text/codetext.txt')
            .then((response) => response.text())
            .then((text) => setCodetext(text))
            .catch((error) => console.error('Failed to load codetext.txt:', error));
    }, []);

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
                {imagePaths.map((path, index) => (
                        <img
                            key={index}
                            src={path}
                            alt={`Sample ${index}`}
                            className="sample-image"
                        />
                    ))}
                </div>

                <div class="code-view">
                <pre>{codetext}</pre>
                </div>
            </div>
            </div> 
    );

};

export default Detection;
