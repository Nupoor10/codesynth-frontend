import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { GiTeacher, GiNotebook } from "react-icons/gi";
import { TbBulbFilled } from "react-icons/tb";
import toast, { Toaster } from 'react-hot-toast';
import Dropdown from 'react-dropdown';
import { useAuthContext } from '../../hooks/useAuthContext';
import Modal from '../Modal/Modal';
import CoderMate from '../CoderMate/CoderMate';
import NotesGenerator from "../NotesGenerator/NotesGenerator";
import Canvas from '../Canvas/Canvas';
import 'react-dropdown/style.css';
import "./PlaygroundNav.css";

const PlaygroundNav = ({htmlValue, cssValue, jsValue, title, setTitle, status, setStatus, toBeUpdated, isGuest, id}) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const openModal = (type) => {
    setModalType(type)
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const options = [
    'public', 'private'
  ];

  const handleChange = (option) => {
    setStatus(option.value)
  }

  const saveCode = async() => {
    try {
      if(user) {
        const config = {
          headers : {
            Authorization : user?.accessToken
          }
        }
        if(toBeUpdated) {
          const response = await axios.put(`http://localhost:8080/api/v1/codes/update/${id}`, {
            title,
            html : htmlValue,
            css : cssValue, 
            javascript : jsValue,
            status
          },
          config)
          if(response && response.status === 200) {
            toast.success("Updated successfully!");
            setTimeout(() => {
              navigate("/mycodes");
            }, 2000)
          }
        } else {
          const response = await axios.post("http://localhost:8080/api/v1/codes/create", {
            title,
            html : htmlValue,
            css : cssValue, 
            javascript : jsValue,
            status
          },
          config)
          if(response && response.status === 201) {
            toast.success("Saved successfully!");
            setTimeout(() => {
              navigate("/mycodes");
            }, 2000)
          }
        }
      }
    } catch(error) {
      console.log(error);
      toast.error(error?.message);
    }
  }

  return (
    <div className='playground__controls'>
      <div className='home__icon__container'>
        <p><Link to={!isGuest ? "/mycodes" : "/community"} className='home__link'>⚙️</Link></p>
        <div className='details__container'>
          <input disabled={isGuest} className='playground__title' value={title} type='text' onChange={(event) => setTitle(event.target.value)}/>
          {!isGuest && (
            <p>{user?.name}</p>
          )}
        </div>
        {!isGuest && (
          <>
            <Dropdown options={options} onChange={handleChange} value={status ? status : options[0]}/>
            <button onClick={saveCode} className='colored__btn'>Save</button>
          </>
        )}
      </div>
      <div className='playground__controls__container'>
        {!isGuest && (
          <button onClick={() => {openModal("bot")}} className='colored__btn'>Teach Me<span><GiTeacher/></span></button>
        )}
        {(toBeUpdated && !isGuest) && (
          <button onClick={() => {openModal("notes")}} className='colored__btn'>DocGen<span><GiNotebook/></span></button>
        )}
        {(toBeUpdated && !isGuest) &&(
         <button onClick={() => {openModal("board")}} className='colored__btn'>IdeaMap<span><TbBulbFilled/></span></button>
         )}
        </div>
        
        <Modal isOpen={modalIsOpen} closeModal={closeModal} 
        children={
          (modalType === "bot") ? <CoderMate /> : 
          (modalType === "notes") ? <NotesGenerator htmlValue={htmlValue} cssValue={cssValue} jsValue={jsValue} id={id}/> : 
          <Canvas  id={id}/>
        }
        canvas={
          (modalType=== "board" ? "true" : "false")
        }
        />
       <Toaster
          position="top-center"
          reverseOrder={false}
      />
    </div>
  )
}

export default PlaygroundNav