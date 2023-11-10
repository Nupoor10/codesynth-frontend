import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast"
import { useAuthContext } from '../../hooks/useAuthContext';
import "./CodeContainer.css";

const CodeContainer = ({title, id, time}) => {

    const { user }= useAuthContext();
    const navigate = useNavigate();

    const deleteCode = async() => {
        try {
            if(user) {
                const config = {
                    headers : {
                      Authorization : user?.accessToken
                    }
                  }
                const response = await axios.delete(`http://localhost:8080/api/v1/codes/delete/${id}`, config);
                if(response && response.status === 200) {
                    toast.success("Deleted Successfully");
                }
            }
        } catch(error) {
            console.log(error);
            toast.error(error?.message)
        }
    }

    const navigateToPlayground = () => {
        navigate(`/code/${id}`);
    }

    const goToNotes = () => {
        navigate(`/notes/${id}`)
    }

  return (
    <div className='single__code__container'>
        <div>
            <p>{title}</p>
            <p>🗓️{time?.slice(0, 10)}</p>
            <p className='notes__navigate__btn' onClick={goToNotes}>Go To Notes ➡️</p>
        </div>
        <div>
            <p className='code__container__btn' onClick={deleteCode}>🗑️</p>
            <p className='code__container__btn' onClick={navigateToPlayground}>➡️</p>
        </div>
        <Toaster 
            position='top-center' 
            reverseOrder={false}
        />
    </div>
  )
}

export default CodeContainer