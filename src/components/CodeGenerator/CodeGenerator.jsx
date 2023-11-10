import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';
import "../Modal/Modal.css";

const CodeGenerator = () => {

    const [ inputVal, setInputVal ] = useState('Write a code snippet in HTML to create a heading and subheading having text Hello World');
    const [ codeVal, setCodeVal ] = useState('');

    const { user } = useAuthContext();

    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(codeVal);
        toast.success("Copied to Clipboard");
      };
    
    const handleGenerateCode = async() => {
      try {
        const config = {
          headers : {
            Authorization : user?.accessToken
          }
        }
        const response = await axios.post("http://localhost:8080/api/v1/llm/generate", {
          inputVal
        }, config);
        if(response && response?.status === 200) {
          setCodeVal(response?.data?.prediction);
        }
      } catch(error) {
        console.log(error);
        toast.error(error?.message);
      }
    }

  return (
    <div className='generater__container'>
        <p>Experience Effortless Code Generation: Empower Your Ideas with Our Component, Modifying Prompts into Functional Code, Boosting Development Efficiency and Creativity.</p>
        <p>Just Enter your Prompt and Get Started🚀</p>
        <div className='input__prompt'>
            <input type='text' name='prompt' className='prompt__value' value={inputVal}
            onChange={(e) => {setInputVal(e.target.value)}}
            ></input>
            <button onClick={handleGenerateCode} className='monochrome__btn'>Generate</button>
        </div>
        <div className='output__div'>
            <p>Output</p>
            <button onClick={copyCodeToClipboard} className='monochrome__btn'>Copy</button>
        </div>
        <textarea
        rows="20"
        cols="89"
        value={codeVal}
        readOnly
        className='text__area__nobg'
         />
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  )
}

export default CodeGenerator