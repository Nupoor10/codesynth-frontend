import React, { useState, useRef } from 'react';
import { FaUserCircle} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import HomeCard from '../../components/HomeCard/HomeCard';
import Footer from "../../components/Footer/Footer";
import "./Home.css";

const Home = () => {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { dispatch, user } = useAuthContext();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div>
      <div className='home__page__wrapper'>
        <div className='home__page__header'>
        <div className='centered-content'>
          <h1>Welcome to CodeSynth⚙️</h1>
        </div>
        <div className='dashboard__header__icons__container'>
          <FaUserCircle className='dashboard__header__icons' onClick={toggleDropdown}/>
          <div style={{display : isOpen ? "block" : "none"}} className="user-dropdown" ref={dropdownRef} onClick={handleLogout}>Logout</div>
        </div>
        </div>
        <div className='home__page__content'>
          <p>CodeSynth is a community driven AI-powered coding application designed to help developers - <span style={{color: '#ACFF33'}}>from complete newbies 
            to seasoned pros </span> in their development journey by harnessing the power of generative AI</p>
          <div className='home__page__cards'>
            <HomeCard title={"What is CodeSynth🤔 ➡️"}
            text={"Explore the myriad features that CodeSynth offers, gain insights into effective platform navigation, and delve into the world of cutting-edge generative AI capabilities. Our comprehensive resources will guide you every step of the way, ensuring you make the most of CodeSynth's innovative offerings"}
            path ={"/features"}/>
            <HomeCard title={"My Codes👩‍💻 ➡️"}
            text={"Step into your personal code haven, a place where your ingenious code creations, aka 'codes' thrive. Here, you can manage your existing codes and craft fresh code playgrounds effortlessly."}
            path ={"/mycodes"}/>
            <HomeCard title={"Info Hub📑 ➡️"}
            text={"CodeSynth was crafted to foster collaboration among coders. Dive into our Explore feature to discover the incredible code projects created by others. Embrace the collaborative spirit and explore the vibrant world of coding innovations within the CodeSynth community."}
            path ={"/resources"}/>
            <HomeCard title={"Community 🧑‍🤝‍🧑 ➡️"}
            text={"Explore a diverse collection of community-shared code snippets and projects on our interactive platform, where coders collaborate and showcase their work for learning and inspiration"}
            path ={"/community"}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home;