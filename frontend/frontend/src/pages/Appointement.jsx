import React from 'react'
import Hero from '../Components/Hero';
import AppointementForm from '../Components/AppointementForm'
const Appointement = () => {
  return (
    <>
    <Hero title={"Schedule Your Appointement"} imageUrl={'/doc2.png'} para={""}/>
    <AppointementForm/>
    
    </>
  )
}

export default Appointement