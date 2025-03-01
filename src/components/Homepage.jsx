import React from 'react'
import './Home.css';
import DataImage from '../assets/Data.jpg';


const Homepage = () => {
  return (
    <>
    <div className='homebox'>
      <div className="homepagecss">
        <div className='hb'>  FINISH !
          <br />WHAT  YOU STARTED </div>
        <div className='powerby'></div>
      </div>
      <div className='usercards'>
        <div className="usertext">Delivering Creative Strategy</div>
      </div>
      <hr className='homehr' />

    </div>

    <section className='Card'>
        <div className="card-main">

          <div className="cardimg"></div>
          <div className="card-desc"></div>
        </div>

    </section>
    </>
  )
}

export default Homepage
