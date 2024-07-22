import React from 'react'
import Hero from '../Components/Hero';
import Biography from '../Components/Biography';
import Departement from '../Components/Departement';
import MessageForm from '../Components/Messageform';
const Home = () => {
  return (
    <>
     <Hero title={"Welcome to Care Hospital"} imageUrl={"./about2.png"}/>
     <Biography imageUrl={"/vant.png"}/>
     <Departement/>
     <MessageForm/>

    </>
  )
}

export default Home