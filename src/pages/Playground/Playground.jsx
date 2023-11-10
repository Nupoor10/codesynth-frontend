import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import PlaygroundNav from '../../components/PlaygroundNav/PlaygroundNav';
import CodeEditor from '../../components/CodeEditor/CodeEditor';
import { useAuthContext } from '../../hooks/useAuthContext';
import "./Playground.css"

const Playground = () => {

  const { user } = useAuthContext();
  const { id } = useParams();

  const [ htmlValue, setHtmlValue] = useState('<h1>Welcome to CodeSynth</h1>');
  const [ cssValue, setCssValue] = useState('body {\n\tbackground: linear-gradient(109.6deg, rgb(20, 30, 48) 11.2%, rgb(36, 59, 85) 91.1%);\n\tcolor : #ffffff \n}');
  const [ jsValue, setJsValue] = useState('');
  const [ collapsed, setCollapsed] = useState(false);
  const [title, setTitle] = useState('New Code Container');
  const [status, setStatus] = useState('public');
  const [ toBeUpdated, setToBeUpdated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const fetchCode = async() => {
      if(id && user) {
        try {
          const config = {
            headers: {
              Authorization: user?.accessToken
            }
          };
          const response = await axios.get(`http://localhost:8080/api/v1/codes/get/${id}`, config);
          if(response && response.status === 200) {
            setHtmlValue(response?.data?.codeDoc?.html)
            setCssValue(response?.data?.codeDoc?.css);
            setJsValue(response?.data?.codeDoc?.javascript);
            setStatus(response?.data?.codeDoc?.status);
            setTitle(response?.data?.codeDoc?.title);
            setToBeUpdated(true);
            if(response?.data?.codeDoc?.owner?.username !== user.name) {
              setIsGuest(true);
            }
          }
        }
         catch(error) {
          console.log(error);
          toast.error(error?.message);
        }
      }
    }

    fetchCode();
  }, [id, user])

  const doc = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Hello, World!</title>
      <style>${cssValue}</style>
  </head>
  <body>
      ${htmlValue}
      <script>${jsValue}</script>
  </body>
  </html>
  `;  

  return (
    <div className='playground__page__wrapper'>
      <div className='playground__nav__wrapper'>
        <PlaygroundNav htmlValue={htmlValue} cssValue={cssValue} jsValue={jsValue} title={title} setTitle={setTitle} status={status} setStatus={setStatus} isGuest={isGuest} toBeUpdated={toBeUpdated} id={id}/>
        <button onClick={() => {setCollapsed(!collapsed)}}>
          {collapsed ? (<IoIosArrowDropdown />) : (<IoIosArrowDropup />)}
        </button>
      </div>
        <div style={{display : collapsed ? 'none' : 'flex'}}>
          <div className='editor__components'>
            <CodeEditor id="html" codeValue={htmlValue} setCodeValue={setHtmlValue} editorLang={"html"} isGuest={isGuest}/>
            <CodeEditor id="css" codeValue={cssValue} setCodeValue={setCssValue} editorLang={"css"} isGuest={isGuest}/>
            <CodeEditor id="js" codeValue={jsValue} setCodeValue={setJsValue} editorLang={"javascript"} isGuest={isGuest}/>
          </div> 
        </div>
        <div className='iframe__component'>
          <iframe style={{height : collapsed ? '100vh' : '47vh'}} title="myDoc" srcDoc={`${doc}`}></iframe>
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
    </div>
  )
}

export default Playground