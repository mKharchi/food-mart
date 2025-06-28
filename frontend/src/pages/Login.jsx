import React, { useState } from 'react'
import Hero from '../components/Hero'
import { Link, useNavigate   } from 'react-router'
import { useAuth } from '../context/authContext'

const LoginForm = ({ form, handleChange, handleSubmit }) => {
    
    return (
        <section className='flex flex-col justify-start gap-10 sm:gap-20 items-center min-h-screen w-full p-8 sm:px-32  sm:py-32'>
            <h1 className='text-3xl sm:text-5xl font-semibold w-full text-center'>Login</h1>
            <form onSubmit={handleSubmit} className="w-full sm:w-1/3 mx-auto flex flex-col justify-center gap-6 items-center">

                <div className="w-full ">
                    <input placeholder="Email" name='email' onChange={handleChange} value={form.email} type="text" className="px-6 py-4 w-full border" />
                </div>
                <div className="w-full ">
                    <input placeholder="Password" name='password' onChange={handleChange} value={form.password} type="password" className="px-6 py-4 w-full border" />
                </div>
                
                <button className='bg-black text-xl px-8 py-3 text-white' type='submit'>Submit</button>

            </form>
            <hr className='border w-1/3' />
            <p className=' sm:text-xl '>Don't have an account? <Link className='opacity-80 ' to={"/signup"}>Create one</Link></p>
        </section>
    )

}


const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "", password: ""
    })

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form);
        
        login(form)
    }
    return (
        <>

            <Hero image={"/login.png"} title={"Login To Your Account"} />
            <LoginForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} />

        </>
    )
}

export default Login