import React from 'react';
import Editor from '@monaco-editor/react';
import { FaHtml5, FaCss3Alt } from "react-icons/fa"
import { RiJavascriptFill } from "react-icons/ri";
import "./CodeEditor.css"

const CodeEditor = ({codeValue, setCodeValue, isGuest, editorLang}) => {

  function handleEditorChange(value) {
    setCodeValue(value);
  }

  return (
    <div className='code__editor__component' style={{pointerEvents : isGuest ? 'none' : 'auto'}}>
      <div className='editor__toolbar'>
        <h5>
            {editorLang === "html" ? 
            (<FaHtml5 />) : editorLang === "css" ? 
            (<FaCss3Alt />) : (<RiJavascriptFill />)}
            {editorLang.toUpperCase()}
        </h5>
      </div>
      <Editor
        readOnly={isGuest}
        defaultLanguage={editorLang}
        theme='vs-dark'
        value={codeValue}
        onChange={handleEditorChange}
        disabled={isGuest}
      />
    </div>
  )
}

export default CodeEditor;