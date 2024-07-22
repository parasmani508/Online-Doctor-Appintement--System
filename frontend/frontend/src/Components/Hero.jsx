import React from "react";

const Hero = ({title, imageUrl}) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Founded in 2022 by a team of India's leading cardiologists, CARE
          Hospitals started its journey as a 100-bedded Heart Institute with a
          core team of 20 cardiologists, 1 operating theatre, and 1
          catheterization laboratory. 25 years later, the CARE Hospitals Group
          is a multi-speciality healthcare provider with 17 healthcare
          facilities serving 7 cities across 6 states in India. It is the
          regional leader in South and Central India and is amongst the top 5
          Pan-Indian hospital chains.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-imagedoc"/>
        <span>
            <img src="/Vector.png" alt="vector"/>
        </span>
      </div>
    </div>
  );
};

export default Hero;
