import React from 'react'
import Hero from '../components/Hero'
import Reservation from "../components/Reservation"

const Story = () => {
  return (
    <section
      style={{
        backgroundImage: `url(/OurStory.png)`,
        backgroundSize: 'contain',
        backgroundPosition: 'top center',
        backgroundRepeat: "no-repeat"
      }}
      className='min-h-screen w-full flex flex-col justify-center items-center gap-5 lg:gap-8 p-4 sm:p-8 lg:p-16 xl:px-32 py-8 lg:py-16'
    >
      <div className="flex flex-col-reverse lg:flex-row-reverse mt-8 sm:mt-12 lg:mt-24 items-center justify-center gap-4 lg:gap-8 w-full">
        <div className='w-full flex items-center justify-center'>
          <img 
            src="/about2.png" 
            className='w-full lg:w-[95%] py-4 lg:p-12 min-h-[30vh] lg:min-h-[50vh] object-cover rounded-lg' 
            alt="About us" 
          />
        </div>
        <div className='w-full flex flex-col gap-3 items-center lg:items-start justify-center'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-center lg:text-left w-full font-semibold'>
            Our Story
          </h1>
          <p className='text-sm sm:text-base lg:text-lg text-center lg:text-left'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus lorem id penatibus imperdiet. Turpis egestas ultricies purus auctor tincidunt lacus nunc.
          </p>
        </div>
      </div>
      
      {/* Restaurant Manager Section */}
      <div className="flex lg:flex-row flex-col items-center justify-between w-full gap-8 lg:gap-4">
        <div className='w-full flex flex-col items-center lg:items-start gap-2 lg:gap-4 justify-center'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold w-full text-center lg:text-left'>
            Restaurant Manager
          </h2>
          <p className='w-full text-center lg:text-left text-sm sm:text-base lg:text-lg'>Carson Hugh</p>
          <img 
            src="/about1.png" 
            className='w-full lg:w-[95%] min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] xl:min-h-[80vh] py-4 sm:py-8 lg:p-12 object-cover rounded-lg' 
            alt="Restaurant Manager" 
          />
        </div>
        <div className='w-full flex flex-col items-center lg:items-start gap-4 justify-center'>
          <p className='w-full lg:w-2/3 text-center lg:text-left text-sm sm:text-base lg:text-lg'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et in sed in pellentesque ornare nunc nisl.
          </p>
        </div>
      </div>
      
      {/* Executive Chef Section */}
      <div className="flex flex-col lg:flex-row-reverse items-center justify-center w-full gap-8 lg:gap-4">
        <div className='w-full flex flex-col items-center lg:items-end gap-2 lg:gap-4'>
          <h2 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-center lg:text-right w-full font-semibold'>
            Executive Chef
          </h2>
          <p className='w-full text-center lg:text-right text-sm sm:text-base lg:text-lg'>Jane Cooper</p>
          <img 
            src="/about3.png" 
            className='w-full lg:w-[95%] min-h-[40vh] sm:min-h-[50vh] object-cover rounded-lg' 
            alt="Executive Chef" 
          />
        </div>
        <div className='w-full flex flex-col gap-3 items-center lg:items-end justify-center'>
          <p className='w-full lg:w-1/2 text-center lg:text-right text-sm sm:text-base lg:text-lg'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus lorem id penatibus imperdiet. Turpis egestas ultricies purus auctor tincidunt lacus nunc.
          </p>
        </div>
      </div>
    </section>
  )
}



const About = () => {
  return (
    <div>
      <Hero image={'/Header.png'}
        isAbout={true}
        title={"Who We Are"}
        description={"The most important thing for us is to give you the comfortable dining experience"}

      />
      <Story />
      <Reservation />

    </div>
  )
}

export default About
