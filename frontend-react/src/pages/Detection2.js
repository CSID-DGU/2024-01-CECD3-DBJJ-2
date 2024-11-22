import React, { useState } from 'react';
import '../styles/Detection.css';

const Detection = () => {

        // 데이터 목록 상태
        const [data, setData] = useState([
            { name: 'BreakfastBox', tags: 'Test', isOpen: false }
        ]);
    
        // 드롭다운 토글 핸들러
        const toggleDropdown = (index) => {
            setData((prevData) =>
                prevData.map((item, i) =>
                    i === index ? { ...item, isOpen: !item.isOpen } : item
                )
            );
        };

    const imagePaths = Array.from({ length: 1 }, (_, i) => 
            `/images/Detection2/${String(i).padStart(3, '0')}.png`
    ); 

    const codetext = `
        now detecting ...
        Selecting Coreset Indices.: 100%|████████████████████████| 4704/4704 [00:07<00:00, 593.97it/s]
        Epoch 0: 100%|██████████████████████████████| 2/2 [00:09<00:00, 0.21it/s, image_AUROC=0.500, image_F1Score=0.769]
        Trainer.fit stopped: max_epochs=1 reached.
        Epoch 0: 100%|██████████████████████████████| 2/2 [00:10<00:00, 0.19it/s, image_AUROC=0.500, image_F1Score=0.769]
    `;

    return (
        <div class="full-container">
            <div class="data-set">
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
            <div class="det-container">
                <div class="pic-view">
                {imagePaths.map((path, index) => (
                        <img
                            key={index}
                            src={path}
                            alt={`Sample ${index + 1}`}
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
