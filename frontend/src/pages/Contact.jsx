import React from 'react'
import Hero from '../components/Hero'
import Reservation from '../components/Reservation'

const ContactInfo = () => {
  return (
    <section
      style={{
        backgroundImage: `url(/Address+Location.png)`,
        backgroundSize: '70vw',
        backgroundPosition: 'top',
        backgroundPositionY: "10px",
        backgroundRepeat: "no-repeat"

      }}
      className='min-h-screen text-xl 2xl:text- 2xl: w-full flex flex-col justify-center item-center gap-3 p-16 2xl:px-32 py-8 2xl:py-16'>
      <div className="flex 2xl:flex-row flex-col 2xl:mt-32 mt-16 items-center justify-between w-full">
        <div className='w-full flex items-center justify-center'>
          <img src="/contact1.png" 
          className='  2xl:w-[95%] w-full py-6 2xl:p-12 min-h-[40vh] 2xl:min-h-[50vh]' alt="" />
        </div>
        <div className='w-full flex flex-col  gap-2 items-center justify-center'>
          <span className='w-full'>We can be contacted via </span>
          <span className='w-full'>email <span className='text-yellow-700'>info@foodzero.com</span> </span>
          <span className='w-full'>or telephone on <span className='text-yellow-700'>+86 852 346 000</span></span>
        </div>
      </div>
      <div className="flex 2xl:flex-row flex-col-reverse 2xl:mt-32 mt-16 items-center justify-between w-full">
        <div className='w-full flex flex-col items-end 2xl:gap-4 gap-6 justify-center'>
          <span className='  2xl:w-1/2 w-full text- 2xl: 2xl:max-w-[30vw] '>We are located in <b>1959 Sepulveda Blvd. Culver City, CA, 90230</b></span>
          <button className='p-4 border text- 2xl:'>Locate in Maps</button>
        </div>
        <div className='w-full flex items-center justify-center'>
          <img src="/contact2.png" 
          className='  2xl:w-[95%] w-full py-6 2xl:p-12 min-h-[40vh] 2xl:min-h-[50vh]' alt="" />
          </div>
      </div>
    </section>)
}




const Contact = () => {
  return (
    <div>
      <Hero image={'/Contact.png'}
        title={"Get in Touch"}
        description={"The freshest ingredients for you every day"}
        isContact={true}
      />
      <ContactInfo />
      <Reservation />
    </div>
  )
}

export default Contact
