import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Footer from "../../components/Footer/Footer";
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { dispatch } = useAuthContext();

	const loginUser = async(e) => {
		try {
			e.preventDefault(); 
			const response = await axios.post("http://localhost:8080/api/v1/users/login", {
				email,
				password
			})
			if ( response && response?.status === 200 && response?.data?.exisitingUser) {
				dispatch({type: 'LOGIN', payload: {
					accessToken: response.data.jwtToken,
					name: response.data.exisitingUser.username,
				}})
				localStorage.setItem("User", JSON.stringify({
					accessToken: response.data.jwtToken,
					name: response.data.exisitingUser.username,
				}));
                toast.success("Logged In Successfully!");
                setTimeout(() => {
                    navigate("/home");
                }, 2000)
			}
		} catch(error) {
			console.log(error);
			toast.error(error?.message);
		}
	}

  return (
    <div className='login__page__wrapper'>
		<div className='login__container'>
			<h1>Login To CodeSynth</h1>
			<div className='login__form'>
				<form>
					<input
						className='login__input'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
					/>
					<br />
					<input
						className='login__input'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
					/>
					<br />
					<button type="submit" className="login__btn" onClick={(e) => {loginUser(e)}}>Login</button>
					<h3>Not Registered Yet? <Link to='/register'>Click Here</Link> to Register</h3>
				</form>
			</div>
		</div>
        <Toaster
            position="top-center"
            reverseOrder={false}
            />
		<Footer />
	</div>
  )
}

export default Login