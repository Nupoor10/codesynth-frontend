import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { FaHtml5, FaCss3Alt } from "react-icons/fa"
import { RiAiGenerate, RiJavascriptFill } from "react-icons/ri";
import { BsFillPatchCheckFill } from "react-icons/bs";
import Modal from '../Modal/Modal';
import CodeGenerator from '../CodeGenerator/CodeGenerator';
import CodeChecker from '../CodeChecker/CodeChecker';
import "./CodeEditor.css"

const CodeEditor = ({codeValue, setCodeValue, isGuest, editorLang}) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState('')

  const openModal = (type) => {
    setModalType(type)
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCheck = () => {
    openModal("check");
  }

  const handleGenerate = () => {
    openModal("generate");
  }

  function handleEditorChange(value, event) {
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
        {!isGuest && (
        <div className="dropdown">
          <p style={{cursor: 'pointer'}} onClick={handleGenerate}><RiAiGenerate /></p>
          <div className="dropdown-content">
            <h3>Generate Code</h3>
            <h5>
              Generate Awesome code using customized prompts!👩‍💻
            </h5>
          </div>
        </div>
        )}
        {!isGuest && (
          <div className="dropdown">
            <p onClick={handleCheck}><BsFillPatchCheckFill/></p>
              <div className="dropdown-content">
                <h3>Check Code</h3>
                <h5>
                  Check Code to ensure your code is optimized and bug-free!🐞
                </h5>
              </div>
          </div>
        )} 
      </div>
      <Editor
        readOnly={isGuest}
        height="38vh"
        width="32vw"
        defaultLanguage={editorLang}
        theme='vs-dark'
        value={codeValue}
        onChange={handleEditorChange}
        disabled={isGuest}
      />
      <Modal isOpen={modalIsOpen} closeModal={closeModal} 
        children={
          (modalType === "generate") ? <CodeGenerator /> : 
          <CodeChecker userCodeVal={codeValue} editorLang={editorLang}/>
        }
      />
    </div>
  )
}

export default CodeEditor;