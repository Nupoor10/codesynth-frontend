import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';
import CodeContainer from '../../components/CodeContainer/CodeContainer';
import "./UserCodes.css";

const UserCodes = () => {
  const [ userCodes, setUserCodes] = useState([]);

  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    const getAllCodes = async () => {
      if (user) {
        try {
          const config = {
            headers: {
              Authorization: user?.accessToken
            }
          };
          const response = await axios.get("http://localhost:8080/api/v1/codes/all", config);
          if (response && response.status === 200 && response.data.codeDocs) {
            setUserCodes(response.data.codeDocs);
          }
        } catch (error) {
          console.log(error);
          toast.error(error?.message);
        }
      }
    };
  
    getAllCodes();
  }, [user]);  

  return (
    <div className='usercodes__page__wrapper'>
      <div className='usercodes__page__header'>
        <h2 onClick={() => {navigate("/home")}}>⬅️</h2>
            <h1>&nbsp; &nbsp; My Codes ⚙️</h1> 
        </div>
        <div className='usercodes__page__content'>
          <button onClick={() => {navigate("/code")}} className='colored__btn'>Create New +</button>
          {userCodes.length > 0 ? (
            <div className='usercodes__grid__container'>
              {userCodes.map((code) => {
                return <CodeContainer key={code._id} title={code.title} id={code._id} time={code.updatedAt}/>
              })}
            </div>
            ) : (
              <p>No Codes Created Yet</p>
            )
          }
        </div>
        <Toaster
            position="top-center"
            reverseOrder={false}
            />
    </div>
  )
}

export default UserCodes;
