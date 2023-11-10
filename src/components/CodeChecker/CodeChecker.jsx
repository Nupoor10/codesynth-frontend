import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';
import "../Modal/Modal.css";

const CodeChecker = ({userCodeVal, editorLang}) => {
    const [ inputVal, setInputVal ] = useState('Correct and refactor my code : ');
    const [ codeVal, setCodeVal ] = useState('');

    const { user } = useAuthContext();

    const copyCodeToClipboard = () => {
      navigator.clipboard.writeText(codeVal);
      toast.success("Copied to Clipboard");
    };

    const handleCorrectCode = async() => {
      try {
        let prompt = "";
        if (editorLang === "html") {
          const newCodeVal = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Sample Title</title>
            </head>
            <body>
                ${userCodeVal}
            </body>
            </html>
            `;  
          prompt = inputVal + newCodeVal;
        } else {
          prompt = inputVal + userCodeVal;
        } 
        const config = {
          headers : {
            Authorization : user?.accessToken
          }
        }
        const response = await axios.post("http://localhost:8080/api/v1/llm/generate", {
          prompt
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
        <p>Elevate Code Quality Seamlessly: Our Component Corrects and Refactors Your Codebase, Enhancing Readability and Efficiency with Precision and Ease.</p>
        <p>Just Enter your Prompt and Get Started🚀</p>
        <div className='input__prompt'>
            <input type='text' name='prompt' className='prompt__value' value={inputVal}
            onChange={(e) => {setInputVal(e.target.value)}}
            ></input>
            <button onClick={handleCorrectCode} className='monochrome__btn'>Correct</button>
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

export default CodeChecker