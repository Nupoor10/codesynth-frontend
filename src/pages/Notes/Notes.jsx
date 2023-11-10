import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from '../../hooks/useAuthContext';
import Note from "../../components/Note/Note";
import "./Notes.css"

const Notes = () => {

    const { id } = useParams();
    const { user } = useAuthContext();
    const [ allNotes, setAllNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllNotes = async() => {
            try {
                const config = {
                    headers : {
                      Authorization : user?.accessToken
                    }
                  }
                const response = await axios.get(`http://localhost:8080/api/v1/notes/fetch/all/${id}`, config);
                if ( response && response.status === 200) {
                    setAllNotes(response?.data?.notes);
                }
            } catch(error) {
                console.log(error);
                toast.error(error?.message);
            }
        }

        fetchAllNotes();
    }, [id])

  return (
    <div className='notes__page__wrapper'>
         <div className='notes__page__header'>
            <h2 onClick={() => {navigate("/mycodes")}}>⬅️</h2>
            <h1>&nbsp;&nbsp; My Notes 📖</h1> 
        </div>
            {allNotes?.length > 0 ? (
                <div className='all__notes__container'>
                    {allNotes.map((note) => {
                        return <Note key={note._id}
                            id={note._id} title={note?.title} content={note?.content} images={note?.images}/>
                    })}
                </div>
            ) : (
                <p>No Notes Present</p>
            )}
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
    </div>
  )
}

export default Notes