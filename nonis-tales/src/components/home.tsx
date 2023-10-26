import { Parallax } from 'react-scroll-parallax'
import pirate from '../assets/images/background/pirate.png'
import balloon1 from '../assets/images/background/balloon.png'
import balloon2 from '../assets/images/background/balloon1.png'
import balloon3 from '../assets/images/background/balloon2.png'
import { MouseParallaxChild, MouseParallaxContainer } from 'react-parallax-mouse'

export const Home = (): JSX.Element => {
  return (
    <>
      <div className='h-screen w-screen bg-gray-800 items-center flex justify-center'>
        <Parallax speed={-500} className='relative w-full h-full'>
          <div className='w-full h-full bg-gray-900 relative flex justify-center'>
            <div className='w-full h-20 bg-blue-800 bottom-0 absolute'></div>
            <div className='w-full h-32 bg-blue-50 bottom-20 absolute animate-wiggle_1'></div>
            <div className='w-full h-36 bg-blue-100 bottom-16 absolute animate-wiggle_2'></div>
            <img className='absolute top-72' src={pirate} />
            <div className='w-full h-32 bg-blue-200 bottom-12 absolute animate-wiggle_3'></div>
            <div className='w-full h-36 bg-blue-300 bottom-10 absolute animate-wiggle_4'></div>
            <div className='w-full h-36 bg-blue-400 bottom-5 absolute animate-wiggle_5'></div>
          </div>
        </Parallax>

        <Parallax speed={5} className='absolute mb-96'>
          <MouseParallaxContainer globalFactorX={0.5} globalFactorY={0.5} containerStyle={{ overflow: 'visible' }}>
            <MouseParallaxChild factorX={0.8} factorY={0.4}>
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
      <div className='h-screen w-screen bg-gray-800 items-center flex justify-center text-5xl'>
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
          <img src={balloon1} />
          <img src={balloon2} />
        </Parallax>
      </div>

      <div className='h-screen w-screen bg-gray-400 items-center flex justify-center text-2xl'>
        <Parallax speed={5}>
          <section className='text-white text-center gap-40 flex flex-col'>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet quam, assumenda quas,<br/>
              repellendus excepturi voluptatibus dolorum?
            </p>
            <img src={balloon3} />
          </section>
        </Parallax>
      </div>
    </>
  )
}
