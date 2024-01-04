"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

/**
 * Register component.
 *
 * @param {event} e - The event object.
 * @return {void}
 */

/* This code snippet defines a React functional component called Register. It renders a form for user registration. When the form is submitted, it prevents the default behavior of the event, logs the user's name, email, and password to the console, and then makes a POST request to the /api/register endpoint using the axios library. If the request is successful, it redirects the user to the /login page. If there is an error, it logs the error to the console.
*/
const Register = () => {
    const router = useRouter();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    /**
     * Registers a user by making a POST request to the /api/register endpoint.
     *
     * @param {Event} e - The event object.
     * @return {Promise<void>} - A promise that resolves when the user is successfully registered.
     */

    /* This code snippet defines a function called registerUser that is used to register a user by making a POST request to the '/api/register' endpoint. It takes an event object as a parameter and returns a promise that resolves when the user is successfully registered. Inside the function, it prevents the default behavior of the event, logs the user's name, email, and password to the console, and then makes the POST request using axios. If the request is successful, it redirects the user to the '/login' page. If there is an error, it logs the error to the console.
     */
    const registerUser = async (e) => {
        e.preventDefault();
        console.log('User: ', { name: data.name, email: data.email, password: data.password });
        try {
            const response = await axios.post('/api/register', { name: data.name, email: data.email, password: data.password },
                    { headers: { 'Content-Type': 'application/json' } });
            const user = response.data;
            router.push('/login');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }
    return (
        <section className='flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10 m-auto mt-24'>
            {/* Register Section */}
            <h2 className='self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl'>Register</h2>
            <form onSubmit={registerUser} >
                {/* Email Input */}
                <div className='flex flex-col mb-2'>
                    <div className='flex relative'>
                        <input
                            className='rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm w-full p-4'
                            placeholder='Email'
                            name='email'
                            id='email'
                            type='email'
                            value={data.email}
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value });
                            }}
                        />
                    </div>
                </div>
                {/* Password Input */}
                <div className='flex flex-col mb-2'>
                    <div className='flex relative'>
                        <input
                            className='rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm w-full p-4'
                            placeholder='Password'
                            name='password'
                            id='password'
                            type='password'
                            value={data.password}
                            onChange={(e) => {
                                setData({ ...data, password: e.target.value });
                            }}
                        />
                    </div>
                </div>
                {/* Name Input */}
                <div className='flex flex-col mb-2'>
                    <div className='flex relative'>
                        <input
                            placeholder='Name'
                            className='rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm w-full p-4'
                            name='name'
                            id='name'
                            type='text'
                            value={data.name}
                            onChange={(e) => {
                                setData({ ...data, name: e.target.value });
                            }}
                        />
                    </div>
                </div>
                {/* Register Button */}
                <button
                    className='py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg'
                    type='submit'>Register</button>
            </form>
        </section>
    )
}

export default Register