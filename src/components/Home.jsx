import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    // State to manage text visibility
    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(true);
    const [value,setValue]=useState('')

    // Toggle visibility on click
    const toggleVisibility = () => {
        setIsVisible(prevVisibility => !prevVisibility);
    };

    const redirect = () => {
        console.log("Ahsutosh")
          if(value==='SHUBHRA' || value==='shubhra'){
            navigate('/gate')
          }
    }

    return (
        <div className='bg-black flex-col flex justify-center items-center h-screen w-full'>
            <h1
                className={`text-6xl m-4 font-semibold ${isVisible?'text-white':'text-black'}`}
                onClick={toggleVisibility}
            >
                ARHBUHS
            </h1>
            <input className='border-black' onChange={(e)=>{
                setValue(e.target.value);
              
                
            }}/>
            <button onClick={redirect} className='py-2 px-5 font-semibold px rounded mt-4 bg-slate-500'>Click</button>
        </div>
    );
};

export default Home;
