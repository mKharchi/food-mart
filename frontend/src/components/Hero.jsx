import React from "react"
import Navbar from "./Navbar"


const Hero = ({ image, title, description, isContact, isAbout }) => {
    return (
        <section className='flex flex-col relative items-center gap-8 w-full py-8 2xl:py-16 px-16 2xl:px-32 justify-center  h-full min-h-[80vh] sm:min-h-[78vh]  ' style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
        }}>
            <Navbar />

            <div className={`flex text-light gap-2 flex-col text-left w-full ${isAbout ? "  2xl:items-end" : "items-start"} justify-center h-full`}>
                <h1 className={` max-w-[60vw]  text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-9xl font-semibold mb-4 ${!isAbout && "w-full"}`}>{title}</h1>
                <p className='w-full 2xl:max-w-[20vw] text text-white text-md '>{description}</p>
            </div>


{isContact &&
            <div className="w-2/3 sm:absolute bottom-1/6 right-1/6 2xl:w-1/3 text-white flex flex-col justify-center gap-3 items-center">
                <div className="w-full flex items-center jsutify-between">
                    <span className="w-full">Open Time</span>
                    <span className="w-full text-right">Sunday - Friday</span>
                </div>
                <hr className="w-full border-dotted border border-white " />
                <div className="w-full flex items-center jsutify-between">
                    <div className="flex w-full flex-col items-start">
                        <span className="w-full">Brunch</span>
                        <span className="w-full">11:00–12:00</span>
                    </div>
                    <div className="flex w-full flex-col items-start">
                        <span className="w-full">Lunch</span>
                        <span className="w-full">13:00–17:00</span>
                    </div>
                    <div className="flex w-full flex-col items-start">
                        <span className="w-full">Dinner</span>
                        <span className="w-full">18:00–20:00</span>
                    </div>
                </div>
            </div>}
        </section>

    )
}

export default Hero
