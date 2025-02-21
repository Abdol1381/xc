'use client'
import Container from "../Container"
import styles from '../../app/Home.module.css';
import emailjs from 'emailjs-com';
import { useEffect, useState } from "react";

const Support = () => {
    const [email, setEmail] = useState('')
    const [isEmailValid, setIsValid] = useState(false)


    const [values, setValues] = useState({
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    function handleSubmit(event) {
        event.preventDefault()
        if (!isEmailValid) {
            setStatus({ message: 'please enter a valid email', messageColor: 'text-red-500' });
            console.log('not valid')

        } else {
            emailjs.send('service_bqh61l8', 'template_2y8houm', values, 'jB241984fHUicJsXK')
                .then(response => {
                    console.log('SUCCESS!')
                    setValues({
                        email: '',
                        subject: '',
                        message: ''
                    });
                    setStatus({ message: 'message sent successfully', messageColor: 'text-green-500' })
                    setTimeout(() => {
                        setStatus('')
                    }, 3000)
                }, error => {
                    setStatus({ message: 'message not sent!', messageColor: 'text-red-500' })
                });

        }
    }


    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(e.target.value))
    }

    useEffect(() => {
        if (status === 'SUCCESS') {
            setTimeout(() => {
                setStatus('');
            }, 1000);
        }
    }, [status]);
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <section className={styles.section} style={{ bottom: 0, height: 100 + 'vh' }}>
                <Container>
                    <form onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col gap-3 items-start">
                        <p>Submit a Ticket</p>
                        <div className="flex flex-col w-full gap-1">
                            <label>Subject</label>
                            <input value={values.subject} name="subject" onChange={(e) => handleChange(e)} type="text" className="p-2 rounded text-gray-900 outline-none" placeholder="Enter Subject" />
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <label>Details</label>
                            <input value={values.message} name="message" onChange={(e) => handleChange(e)} type="text" className={` rounded p-2 text-gray-900 outline-none`} placeholder="Explain your problem" />
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <label>Email</label>
                            <input value={values.email} name="email" onChange={(e) => handleChange(e)} onKeyUp={handleEmailChange} type="email" className={`${isEmailValid ? `border border-green-600 shadow-green` : `border focus:border-red-500 shadow-red`} p-2 rounded text-gray-900 outline-none`} placeholder="Enter your Email" />
                        </div>
                        <div className="flex gap-1 justify-start w-full">
                            <input type="checkbox" id="remember" className="rounded" />
                            <label htmlFor="remember" className="text-[#00FF5E]">Remember this choice as default</label>
                        </div>
                        <div className="w-full text-center">
                            <button className="py-1 px-6 border rounded-full border-[#20FF44] text-center">Submit</button>
                        </div>
                    </form>
                </Container>
                {status && renderAlert(status)}
            </section>
        </>
    )
}



const renderAlert = ({ message, messageColor }) => (
    <div className={`px-4 py-3 leading-normal ${messageColor} rounded-xl backdrop-blur-sm border border-[#00F0FF] shadow-main mb-5 text-center`}>
        <p>{message}</p>
    </div>
)


export default Support