import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, {Toaster}  from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';
import CommunityCodeCard from '../../components/CommunityCodeCard/CommunityCodeCard';
import "./Community.css"

const Community = () => {
    const [allCodes, setAllCodes] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuthContext()

    useEffect(() => {
        const getAllCodes = async () => {
            if (user) {        
              try {
                const config = {
                    headers: {
                      Authorization: user?.accessToken
                    }
                };
                const response = await axios.get("http://localhost:8080/api/v1/codes/users/all", config);
                if (response && response.status === 200 && response.data.codeDocs) {
                  setAllCodes(response.data.codeDocs);
                }
              } catch (error) {
                console.error(error);
                toast.error(error?.message)
              }
            }
          };

        getAllCodes();
    }, [user])

  return (
    <div className='community__page__wrapper'>
      <div className='community__page__header'>
        <h2 onClick={() => {navigate("/home")}}>⬅️</h2>
            <h1>&nbsp; &nbsp;View All Community Codes ⚙️</h1> 
        </div>
        <div className='community__page__content'>
          {allCodes.length > 0 ? (
            <div className='community__grid__container'>
              {allCodes.map((code) => {
                return <CommunityCodeCard key={code._id} title={code.title} id={code._id}/>
              })}
            </div>
            ) : (
              <p>No Codes Available Yet</p>
            )
          }
        </div>
        <Toaster position='top-center' reverseOrder={false}/>
    </div>
  )
}

export default Community