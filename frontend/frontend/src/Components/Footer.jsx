import React from 'react'
import {Link} from "react-router-dom";
import{FaPhone,FaLocationArrow} from "react-icons/fa";
import{MdEmail} from "react-icons/md";
const Footer = () => {
    const hours = [
        {
          id: 1,
          day: "Monday",
          time: "9:00 AM - 11:00 PM",
        },
        {
          id: 2,
          day: "Tuesday",
          time: "12:00 PM - 12:00 AM",
        },
        {
          id: 3,
          day: "Wednesday",
          time: "10:00 AM - 10:00 PM",
        },
        {
          id: 4,
          day: "Thursday",
          time: "9:00 AM - 9:00 PM",
        },
        {
          id: 5,
          day: "Monday",
          time: "3:00 PM - 9:00 PM",
        },
        {
          id: 6,
          day: "Saturday",
          time: "9:00 AM - 3:00 PM",
        },
      ];
    
  return (
    <>
    
     <footer className='container'>
        <hr></hr>
        <div className="content">
            <div className=''>
                <img src='/health care.png' alt='logo' className='logo-img'/>
            </div>
            <div>
                <h1>Quick Links</h1>
                <ul>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/appointement"}>Appointement</Link>
                    <Link to={"/about"}>About</Link>
                </ul>
            </div>
            <div>
                <h4>Hours</h4>
                {
                hours.map((element)=>
                {
                    return(
                        <li key={element.id}>
                            <span>{element.day}</span>
                            <span>{element.time}</span>
                        </li>
                    )
                })
                }
            </div>
            <div>
                <h4>Contacts</h4>
                <div>
                    <FaPhone/>
                    <span>987-987-987-8</span>
                </div>
                <div>
                    <MdEmail/>
                    <span>healthcare@gmail.com</span>
                </div>
                <div>
                    <FaLocationArrow/>
                    <span>India,Jammu</span>
                </div>
            </div>
        </div>
     </footer>
    </>
  )
}

export default Footer
