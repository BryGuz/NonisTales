import './App.css'
import video from './assets/videos/background/bg.mp4'

function App (): JSX.Element {
  return (
    <>
    <div className='relative min-w-full min-h-screen overflow-hidden text-center flex items-center justify-center'>
      <video className='videoTag absolute top-0 left-0 object-cover h-full w-full' autoPlay loop muted>
        <source src={video} type='video/mp4' />
      </video>
      <h1 className='z-10 text-5xl sm:text-7xl text-white font-serif font-bold hover:text-cyan-700'>NONIS TALES</h1>
    </div>
    </>
  )
}

export default App
