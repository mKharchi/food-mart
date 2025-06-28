import React from 'react'
import Hero from '../components/Hero'
import Reservation from '../components/Reservation'
import { useAuth } from '../context/authContext'



const Menu = () => {
  const { menu } = useAuth()

  
  return (
    <div>
      <Hero image={'/menu.png'}
        title={"View Our New Menu"}
        description={"The freshest ingredients for you every day"} />
 
      <div className='p-8 sm:px-36 sm:py-16 flex flex-col gap-8'>

        <div className=''>
          {Object.entries(menu).map(([category, items], index) => (
            <div key={category} className='mb-6 flex  flex-col gap-4'>
              <h1 className='text-3xl 2xl:text-6xl mb-2 text-center w-full font-bold'>{category}</h1>

              <div
                className={`flex flex-col gap-3 items-center w-1/2 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                  }`}
              >
                {items.map(item => (
                  <div
                    key={item._id}
                    className='flex flex-col 2xl:p-2 items-start justify-center gap-3 rounded-lg min-w-[255px] w-full  p-4'
                  >
                    <div className='flex items-center text-2xl font-semibold justify-end w-full 2xl:px-4 py-2'>
                      ${item.price}
                    </div>
                    <hr className='border w-full' />
                    <h1 className='text-3xl 2xl:text-5xl text-left 2xl:px-4 w-full'>{item.name}</h1>
                    <p className='flex items-center justify-start w-full 2xl:max-w-sm text-lg text-left text-gray-600 2xl:px-4'>
                      {item.description}
                    </p>

                  </div>
                ))}

              </div>
            </div>
          ))}

        </div>
      </div>
      <Reservation />
    </div>
  )
}

export default Menu
