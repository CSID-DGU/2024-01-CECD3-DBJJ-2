import React, { useState, useEffect, useRef } from 'react';
import '../styles/Detection.css';

const Detection = () => {
    // 데이터 목록 상태
    const [data, setData] = useState([
        { name: 'Breakfast', tags: 'Test', isOpen: false },
        { name: 'Pushpins', tags: 'Test', isOpen: false },
        { name: 'Screwbag', tags: 'Test', isOpen: false }
    ]);

    // 코드 텍스트 상태
    const [codetext, setCodetext] = useState('');
    const [typedText, setTypedText] = useState(''); // 타이핑 효과용 상태
    const [isTypingComplete, setIsTypingComplete] = useState(false); // 타이핑 완료 상태

    // 현재 선택된 데이터셋 상태
    const [selectedDataset, setSelectedDataset] = useState('breakfast');
    const [imagePaths, setImagePaths] = useState([]);
    const [visibleImageCount, setVisibleImageCount] = useState(0); // 현재 표시 중인 이미지 개수
    const picViewRef = useRef(null); // 이미지 뷰 컨테이너 참조
    const codeViewRef = useRef(null); // 코드 뷰 컨테이너 참조

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
        setIsTypingComplete(false); // 새로운 데이터셋 선택 시 초기화
        setTypedText('');
        setVisibleImageCount(0);

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
            .then((text) => {
                setCodetext(text);
            })
            .catch((error) => {
                console.error('Failed to load text file:', error);
                setCodetext('Error loading text file.');
            });
    };

    // 타이핑 효과 구현
    useEffect(() => {
        if (codetext) {
            let index = 0;
            const interval = setInterval(() => {
                setTypedText((prev) => prev + codetext[index]);
                index++;
                if (index === codetext.length) {
                    clearInterval(interval);
                    setIsTypingComplete(true); // 타이핑 완료 상태 설정
                }
            }, 0.1); // 각 문자 간 타이핑 속도 (0.1ms)
            return () => clearInterval(interval);
        }
    }, [codetext]);

    // 코드 뷰의 스크롤 자동 이동
    useEffect(() => {
        if (codeViewRef.current) {
            codeViewRef.current.scrollTop = codeViewRef.current.scrollHeight;
        }
    }, [typedText]); // typedText가 변경될 때마다 스크롤 업데이트

    // 이미지 순차적으로 표시
    useEffect(() => {
        if (isTypingComplete && visibleImageCount < imagePaths.length) {
            const interval = setInterval(() => {
                setVisibleImageCount((prevCount) => prevCount + 1);
            }, 300); // 각 이미지 간 표시 시간 간격 (300ms)
            return () => clearInterval(interval);
        }
    }, [isTypingComplete, visibleImageCount, imagePaths.length]);

    // 이미지 뷰의 스크롤 자동 이동
    useEffect(() => {
        if (picViewRef.current) {
            picViewRef.current.scrollLeft = picViewRef.current.scrollWidth;
        }
    }, [visibleImageCount]);

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
                <div className="pic-view" ref={picViewRef}>
                    {imagePaths.slice(0, visibleImageCount).map((path, index) => (
                        <img
                            key={index}
                            src={path}
                            alt={`Sample ${index + 1}`}
                            className="sample-image2"
                        />
                    ))}
                </div>

                <div className="code-view" ref={codeViewRef}>
                    <pre>{typedText}</pre>
                </div>
            </div>
        </div>
    );
};

export default Detection;
