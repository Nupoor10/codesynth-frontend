import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import "./Features.css";

const Features = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className='features__page__wrapper'>
        <div className='features__page__header'>
            <h2 onClick={() => {navigate("/home")}}>⬅️</h2>
            <h1>&nbsp;&nbsp; Features 📃</h1> 
        </div>
        <div className="features__page__content">
          <h2>1. Web Code Editor</h2>
          <ul>
              <li>Write Code in the Browser: Our platform provides an in-browser code editor, allowing you to write HTML, CSS,
                  and JavaScript code directly on the website.</li>
              <li>Real-Time Preview: See the immediate results of your code as you type with a real-time preview feature.</li>
              <li>Syntax Highlighting: Enjoy syntax highlighting for easier code readability.</li>
          </ul>

          <h2>2. Generative AI Assistance</h2>
          <ul>
              <li>Code Generation: Get creative with AI-generated code! Provide prompts, and our powerful GPT-3.5 AI will
                  assist you in generating new code snippets.</li>
              <li>Code Correctness: Ensure your code is correct with AI-powered code correctness checks.</li>
              <li>Refactoring Suggestions: Receive refactoring suggestions to improve the quality of your code.</li>
          </ul>

          <h2>3. Auto-Generated Documentation</h2>
          <ul>
              <li>Effortless Documentation: Generate documentation for your code snippets effortlessly.</li>
              <li>Notes Storage: Save your code documentation as notes for future reference.</li>
          </ul>

          <h2>4. Canvas for Creative Ideas</h2>
          <ul>
              <li>Drawing Board: Unleash your creativity on our simple canvas. Draw and save your ideas for later
                  reference.</li>
          </ul>

          <h2>5. AI-Powered Support Bot</h2>
          <ul>
              <li>Interactive Learning: Chat with our AI-powered bot that answers your queries and helps you learn new
                  topics.</li>
              <li>Coding Assistance: Receive coding assistance and guidance right within your code playground.</li>
          </ul>

          <h2>6. Code Management</h2>
          <ul>
              <li>Save and Organize: Save your code creations as code playgrounds. Access, update, and delete them
                  as needed.</li>
              <li>Notebook Access: Access and manage your saved notes for easy reference.</li>
          </ul>

          <h2>7. Resource Hub</h2>
          <ul>
              <li>Learning Resources: Explore a resource hub filled with valuable materials to kickstart your coding journey.
              </li>
              <li>Project Ideas: Find beginner-friendly project ideas to apply your skills.</li>
          </ul>

          <h2>8. User-Friendly Interface</h2>
          <ul>
              <li>Intuitive Design: Enjoy a user-friendly and intuitive interface for a seamless coding experience.</li>
              <li>Responsive: Access the platform on various devices with a responsive design.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Features