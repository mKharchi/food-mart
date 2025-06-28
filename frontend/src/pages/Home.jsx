import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { GrLocationPin } from 'react-icons/gr'
import { NavLink, useNavigate } from 'react-router'
import Hero from '../components/Hero'
import { FaArrowRight } from 'react-icons/fa'
import Reservation from '../components/Reservation'
import { useAuth } from '../context/authContext'

const Gallery = () => {
    return (
        <section className='flex bg-[url(/Chef.png)] bg-cover bg-center min-h-screen my-4 sm:my-8 lg:my-16 w-full lg:flex-row flex-col-reverse items-center justify-center gap-5 px-4 sm:px-8 lg:px-16 xl:px-32'>
            <div className='w-full relative flex flex-col items-start justify-start'>
                <img src="/Image.png" className='hidden xl:flex absolute -top-70' width={1024} height={1024} alt="" />
            </div>
            <div className='w-full flex flex-col items-start justify-start h-full gap-5'>
                <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-semibold leading-tight'>
                    Excellent <br className='hidden lg:block' /> cook
                </h3>
                <p className='text-sm sm:text-base lg:text-lg max-w-lg w-full'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus lorem id penatibus imperdiet. Turpis egestas ultricies purus auctor tincidunt lacus nunc.
                </p>
            </div>
        </section>
    )
}

const Services = () => {
    const service = [
        {
            name: "Premium Quality",
            image: "fish.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque congue arcu"
        },
        {
            name: "Seasonal Vegetables",
            image: "vegetable.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque congue arcu"
        },
        {
            name: "Fresh Fruit",
            image: "fruit.png",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque congue arcu"
        }
    ]

    return (
        <section className='flex flex-col w-full items-center justify-center px-4 sm:px-8 lg:px-16 xl:px-32 py-8 '>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full max-w-6xl'>
                {service.map((item, index) => (
                    <div key={index} className='flex flex-col items-center justify-center gap-3 lg:gap-5 rounded-lg w-full'>
                        <img
                            src={`/${item.image}`}
                            width={256}
                            height={256}
                            className='w-16 sm:w-20 md:w-24   h-16 sm:h-20 md:h-24  '
                            alt={item.name}
                        />
                        <h3 className='text-xl sm:text-2xl lg:text-3xl text-center font-semibold'>{item.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    )
}

const Recommended = ({ menu }) => {
    const navigate = useNavigate();
    const entries = Object.entries(menu);
    const [firstCategory, items] = entries[1 ] || [];

    return (
        <section
            style={{
                backgroundImage: `url(/MenuHome.png)`,
                backgroundSize: 'contain',
                backgroundPosition: 'right center',
                backgroundRepeat: "no-repeat"
            }}
            className='flex flex-col min-h-screen w-full items-start justify-start py-8 lg:py-16 gap-8 lg:gap-16 px-4 sm:px-8 lg:px-16 xl:px-32'
        >
            <div className='flex flex-col items-start mt-8 sm:mt-16 lg:mt-24 justify-start gap-2 w-full lg:w-1/2'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold'>Our Menu</h1>
                <p className='text-sm sm:text-base lg:text-lg text-left w-full max-w-md'>
                    This is a section of your menu. Give your section a brief description
                </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 w-full max-w-4xl'>
                {items?.map((item, index) => (
                    <div key={item._id || index} className='flex flex-col items-start justify-center gap-3 lg:gap-5 rounded-lg w-full'>
                        <div className='flex items-center text-lg sm:text-xl font-semibold justify-end w-full px-2 sm:px-4 py-2'>
                            ${item.price}
                        </div>
                        <hr className='border w-full' />
                        <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-left px-2 sm:px-4 w-full leading-tight'>
                            {item.name}
                        </h2>
                        <p className='text-sm sm:text-base lg:text-lg text-left text-gray-600 px-2 sm:px-4 w-full max-w-md'>
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}



const NewsLetter = () => {
    return (
        <div className='min-h-[40vh] px-4 sm:px-8 lg:px-16 xl:px-40 flex items-center justify-center'>
            <div className='w-full py-8 sm:py-12 gap-4 sm:gap-8 flex items-center justify-center'>
                <div className='w-full flex gap-4 flex-col justify-center items-center lg:items-end'>
                    <div className='flex flex-col gap-2 justify-center items-start w-full h-full'>
                        <h1 className='text-xl sm:text-2xl lg:text-3xl w-full text-center lg:text-left'>
                            Subscribe to newsletter
                        </h1>
                        <p className='text-sm sm:text-base w-full max-w-xl text-center lg:text-left'>
                            Sign up for our newsletter to stay up-to-date on the latest promotions, discounts, and new features releases.
                        </p>
                    </div>
                    <div className='w-full lg:w-3/4 flex items-center border p-2 rounded-full overflow-hidden justify-between'>
                        <input
                            className='border-none w-full py-2 px-2 focus:outline-none'
                            placeholder='Enter Your Email'
                            type="email"
                        />
                        <button className='py-2 px-4 bg-black text-white rounded-full whitespace-nowrap'>
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Calories = ({ menu }) => {
    const entries = Object.entries(menu);
    const [firstCategory, items] = entries[0] || [];
    const [secondCategory, items1] = entries[1] || [];
    const [thirdCategory, items2] = entries[2] || [];

    console.log('Entries:', entries);
    console.log('First Category:', firstCategory);
    console.log('Items:', items);

    return (
        <section className='flex flex-col min-h-screen w-full items-center justify-center py-8 lg:py-16 gap-4 px-4 sm:px-8 lg:px-16 xl:px-32'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl w-full lg:w-2/3 xl:w-1/3 text-center font-semibold leading-tight'>
                Calories Energy Balance
            </h1>
            <p className='w-full text-center text-sm sm:text-base lg:text-lg max-w-2xl'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>

            <div className='my-6 lg:my-12 w-full flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-1'>
                {[
                    { image: '/Image1.png', title: firstCategory },
                    { image: '/Image2.png', title: secondCategory },
                    { image: '/Image3.png', title: thirdCategory }
                ].map((item, index) => (
                    <div key={index} className='w-full flex flex-col items-center justify-center px-2 sm:px-4 lg:px-8 xl:px-16 py-4 lg:py-8'>
                        <div
                            className="flex shadow-lg hover:shadow-none transition-all duration-200 ease-in flex-col items-center w-full lg:w-[90%] justify-start min-h-[30vh] sm:min-h-[40vh] lg:min-h-[50vh] rounded-lg overflow-hidden"
                            style={{
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: "no-repeat"
                            }}
                        >
                            <NavLink to={'/menu'} className='w-full py-3 sm:py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between text-black hover:text-white hover:bg-black hover:bg-opacity-20 transition-all duration-200 ease-in'>
                                <span  className='text-sm sm:text-base lg:text-lg font-medium'>
                                    {item.title}
                                </span>
                                <FaArrowRight className='text-sm sm:text-base' />
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Home = () => {
    const { menu } = useAuth()
    return (
        <div className='flex flex-col items-center justify-center gap-6 min-h-screen bg-white'>
            <Hero
                image={'/home.jpg'}
                title={"Healthy Eating is important part of lifestyle"}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque congue arcu"}
            />
            <Services />
            <Gallery />
            <Recommended menu={menu} />
            <Reservation />
            <Calories menu={menu} />
            <NewsLetter />
        </div>
    )
}

export default Home

