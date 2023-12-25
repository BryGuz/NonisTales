import { Parallax } from 'react-scroll-parallax'
import boat from '../assets/images/pirate/boat.png'
import { MouseParallaxChild, MouseParallaxContainer } from 'react-parallax-mouse'

import './home.scss'

export const Home = (): JSX.Element => {
  return (
    <>
      <div className='h-screen w-screen bg-black items-center flex justify-center'>
        <Parallax speed={-500} className='relative w-full h-full'>
          <div className='w-full flex justify-center animate-boat-float'>
            <img className='absolute top-80 animate-boat-translate' src={boat} />
          </div>
        </Parallax>

        <Parallax speed={5} className='absolute mb-80'>
          <MouseParallaxContainer globalFactorX={0.5} globalFactorY={0.5} containerStyle={{ overflow: 'visible' }}>
            <MouseParallaxChild factorX={0.21} factorY={0.1}>
              <section className='text-center text-white text-3xl animate-boat'>
                <h1 className='text-9xl'>THE BOAT</h1>
                <p>BASED ON THE STORY BY NAM LE</p>
                <p>ADAPTATION BY MATT HUNT</p>
                <p>PRODUCEN BY SBS</p>
              </section>
            </MouseParallaxChild>
          </MouseParallaxContainer>
        </Parallax>
      </div>
      <div className='h-screen w-screen bg-black items-center flex justify-center text-5xl'>
        <Parallax speed={5}>
          <section className='text-white text-center'>
            <h2 className='text-4xl'>CHAPTER 1</h2>
            <h1 className='text-7xl'>THE STORM</h1>
          </section>
        </Parallax>
      </div>

      <div className='h-screen w-screen bg-gray-800 items-center flex justify-center text-2xl'>
        <Parallax speed={5}>
          <section className='text-white text-center gap-40 flex flex-col'>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet quam, assumenda quas,<br/>
              repellendus excepturi voluptatibus dolorum?
            </p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet quam, assumenda quas<br/>
              Suscipit quo sint beatae consequuntur earum omnis repudiandae!
            </p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet quam,<br/>
              Suscipit quo sint beatae consequuntur earum omnis.
            </p>
          </section>
        </Parallax>
      </div>

      <div className='h-screen w-screen bg-gray-400 items-center flex justify-center text-2xl'>
        <Parallax speed={5}>
          <section className='text-white text-center gap-40 flex flex-col'>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet quam, assumenda quas,<br/>
              repellendus excepturi voluptatibus dolorum?
            </p>
          </section>
        </Parallax>
      </div>

      <div className='h-screen w-screen bg-gray-400 items-center flex justify-center text-2xl'>
        <Parallax speed={5}>
          <div className="w-52 h-40 bg-gray-500 border-red-300 border-8"></div>
        </Parallax>
      </div>

      <div className='h-screen w-screen bg-gray-400 items-center flex justify-center text-2xl'>
        <Parallax speed={5}>
          <section className='text-white text-center gap-40 flex flex-col'>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet quam, assumenda quas,<br/>
              repellendus excepturi voluptatibus dolorum?
            </p>
            <div className="w-52 h-40 bg-gray-400 border-red-200 border-8"></div>
          </section>
        </Parallax>
      </div>
    </>
  )
}
