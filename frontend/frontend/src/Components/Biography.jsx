import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="imgg" className="animated-image2" />
        </div>
        <div className="banner">
          {/* <p>Biography</p> */}
          <h1>Who We Are</h1>
          <p>
            Vision: To be a trusted, people-centric integrated healthcare system
            as a model for global healthcare.
          </p>
          <p>
            Mission: To provide the best and cost-effective care, accessible to
            every patient through integrated clinical practice, education and
            research.
          </p>
          <p>
            <ul>
              <li>
                Transparency: Being transparent requires courage and we stand
                for transparency. Every aspect of our business is clear and
                comprehensive to the relevant stakeholder and we never
                compromise on the fundamentals at any cost.
              </li>
              <li>
                Teamwork: A collaborative work ecosystem is where all the
                collective efficiencies are harnessed and propelled towards
                delivering the best possible care.
              </li>
              <li>
                Empathy & Compassion: The ability to understand and respond to
                the feelings of both the patients and the employees, so that all
                the services are rendered in a supportive work environment with
                a humane touch.
              </li>
              <li>
                Education: Learning continuously to create an advanced and
                sustainable healthcare system that results in collective growth
                of both the employees and the organization.
              </li>
            </ul>
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
