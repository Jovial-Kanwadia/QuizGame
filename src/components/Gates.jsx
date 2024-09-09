import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Gates = () => {
    const [boxes, setBoxes] = useState([]);
    const [secretCode, setSecretCode] = useState('');
    const [correctBoxIndex, setCorrectBoxIndex] = useState(null); // State to store the index of the correct box
    const [visibleBoxIndex, setVisibleBoxIndex] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate()

    // Function to generate a random string
    const generateRandomString = () => {
        const str = 'ab123#$%cdef^&*(ghijklmnopqrstuvwxyz';
        let ans = '';
        for (let i = 0; i < 15; i++) {
            ans += str[Math.floor(Math.random() * str.length)];
        }
        return ans;
    };

    useEffect(() => {
        // Initialize boxes and secret code
        const numBoxes = 20;
        const newBoxes = Array(numBoxes).fill('').map(() => generateRandomString()); // Create boxes with random strings
        
        // Generate the secret code
        const newSecretCode = generateRandomString(); 

        // Set the secret code to the 19th box (index 18)
        const secretIndex = Math.floor(Math.random() * (numBoxes - 1)) + 1;
        newBoxes[secretIndex] = newSecretCode;

        setBoxes(newBoxes);
        setSecretCode(newSecretCode);
        setCorrectBoxIndex(secretIndex); // Store the index of the correct box
    }, []);

    const handleBoxClick = (index) => {
        if (!clicked) {
            if (index === correctBoxIndex) {
                setVisibleBoxIndex(index);
                setClicked(true);

                // Hide the text after 5 seconds
                const id = setTimeout(() => {
                    setVisibleBoxIndex(null);

                    // Prevent making the text visible for the next 10 seconds
                    setTimeout(() => {
                        setClicked(false);
                    }, 10000);
                }, 5000);

                setTimeoutId(id); // Save the timeout ID
            }
        }
    };

    useEffect(() => {
        // Clear timeout if the component is unmounted
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return (
        <div className='h-full w-full bg-slate-800 flex flex-wrap justify-center items-center'>
            {boxes.map((code, index) => (
                <div
                    key={index}
                    className='bg-slate-300 inline-block h-10 w-44 m-6 p-2 rounded-md cursor-pointer'
                    onClick={() => handleBoxClick(index)}
                >
                    <h1
                        className={
                            visibleBoxIndex === index
                                ? 'text-black'
                                : 'text-slate-300 select-none'
                        }
                    >
                        {visibleBoxIndex === index ? code : 'Click Me'}
                    </h1>
                </div>
            ))}

            <input
                className='m-2 p-2 rounded-sm bg-slate-200'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Enter the code here'
            />
            <button
                className='bg-blue-600 text-white px-4 py-2 rounded-md'
                onClick={() => {
                    if (inputValue === secretCode) {
                        navigate('/img')
                    } else {
                        alert('Incorrect code');
                    }
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default Gates;
