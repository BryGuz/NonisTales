import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ParallaxProvider } from 'react-scroll-parallax'

import './App.css'
import { Home } from './components/home'
import { Title } from './components/title'

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/hidden-path" element={(
          <ParallaxProvider>
            <Home />
          </ParallaxProvider>
        )} />
        <Route path="/" element={<Title />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
