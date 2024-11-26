import React, { useState, useEffect, useRef } from 'react';
import '../styles/Detection.css';

const Detection = () => {
    // 데이터 목록 상태
    const [data, setData] = useState([
        { name: 'Bottle', tags: 'Test', isOpen: false }
    ]);

    // 코드 텍스트 상태
    const [codetext, setCodetext] = useState('');
    const [typedText, setTypedText] = useState(''); // 타이핑 효과용 상태
    const [isTypingComplete, setIsTypingComplete] = useState(false); // 타이핑 완료 상태
    const [visibleImageCount, setVisibleImageCount] = useState(0); // 현재 표시할 이미지 개수
    const codeViewRef = useRef(null); // 스크롤 컨테이너 참조
    const picViewRef = useRef(null); // 이미지 뷰 컨테이너 참조

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

    // 타이핑 효과를 구현하는 useEffect
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

    // 스크롤이 텍스트 타이핑에 따라 자동으로 따라가도록 하는 useEffect
    useEffect(() => {
        if (codeViewRef.current) {
            codeViewRef.current.scrollTop = codeViewRef.current.scrollHeight;
        }
    }, [typedText]);

    // 이미지 순차적으로 표시
    useEffect(() => {
        if (isTypingComplete && visibleImageCount < imagePaths.length) {
            const interval = setInterval(() => {
                setVisibleImageCount((prevCount) => prevCount + 1);
            }, 300); // 각 이미지 간 표시 시간 간격 (500ms)
            return () => clearInterval(interval);
        }
    }, [isTypingComplete, visibleImageCount, imagePaths.length]);

    // 이미지 스크롤 자동으로 따라가도록 하는 useEffect
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
            <div className="det-container">
                <div className="pic-view" ref={picViewRef}>
                    {imagePaths.slice(0, visibleImageCount).map((path, index) => (
                        <img
                            key={index}
                            src={path}
                            alt={`Sample ${index}`}
                            className="sample-image"
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
