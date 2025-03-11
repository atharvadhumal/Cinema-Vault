import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import Navigation from './Navigation'
import Lottie from 'lottie-react'
import { useMotionValue, useTransform, motion, useSpring } from 'framer-motion'
import loaderAnimation from '../assets/movieanimation.json'

const Home = () => {
  
  const [cardWidth, setCardWidth] = useState(300)
  const [cardsInRow, setCardsInRow] = useState(2)
  const [wrapperWidth, setWrapperWidth] = useState(cardWidth * cardsInRow)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [group, setGroup] = useState("Popular")
  const [mousePos, setMousePos] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const cardsRef = useRef(null)

 
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
      setIsMobile(window.innerWidth < 768)
      
      if (window.innerWidth < 640) {
        setCardWidth(window.innerWidth * 0.85)
        setCardsInRow(1)
      } else if (window.innerWidth < 768) {
        setCardWidth(280)
        setCardsInRow(2)
      } else if (window.innerWidth < 1024) {
        setCardWidth(320)
        setCardsInRow(3)
      } else if (window.innerWidth < 1280) {
        setCardWidth(400)
        setCardsInRow(4)
      } else {
        setCardWidth(500)
        setCardsInRow(5)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setWrapperWidth(cardWidth * cardsInRow)
  }, [cardWidth, cardsInRow])

  const getMousePositions = (e, referenceElement) => {
    if (!referenceElement || isMobile) return;
    
    const positions = {
      x: e.clientX,
      y: e.clientY,
    }

    const offset = {
      left: positions.x,
      top: positions.y,
      width: referenceElement.clientWidth,
      height: referenceElement.clientHeight,
    }

    setMousePos(offset)
  }

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  
  useEffect(() => {
    if (!isMobile) {
      x.set(mousePos.left)
      y.set(mousePos.top)
    }
  }, [mousePos.left, mousePos.top, isMobile])

  const xSpring = useSpring(x, { stiffness: 10, damping: 10 })
  const ySpring = useSpring(y, { stiffness: 10, damping: 10 })

  const translateX = useTransform(xSpring, [0, windowWidth], [0, -mousePos.width + windowWidth])
  const translateY = useTransform(ySpring, [0, windowHeight], [0, -mousePos.height + windowHeight])

  const apiKey = import.meta.env.VITE_API_KEY
  const baseUrl = import.meta.env.VITE_BASE_URL
  const abortControllerRef = useRef(null)

  useEffect(() => {
    const getMovies = async () => {
      abortControllerRef.current != null && abortControllerRef.current.abort()
      abortControllerRef.current = new AbortController()
      setLoading(true)

      await new Promise(resolve => setTimeout(resolve, 2000));

      const url = `${baseUrl}/${group}?Page=${page}&Language=en-US`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'tvshow.p.rapidapi.com'
        },
        signal: abortControllerRef.current!= null && abortControllerRef.current.siganl
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        
        setMovies(Array.isArray(result) ? result : result.results || [])
        console.log(result);
      } catch (error) {
        if(error.name === "AbortError") {
          console.log("Aborted")
          return;
          
        }
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
    getMovies()
  }, [page, group, apiKey, baseUrl])

  return (
    <>
      <Navigation page={page} setPage={setPage} setGroup={setGroup} isMobile={isMobile} />
      {
        loading ? (
          <div className='h-screen w-screen flex justify-center items-center bg-white'>
            <div className="w-32 sm:w-64 h-32 sm:h-64">
              <Lottie 
                animationData={loaderAnimation} 
                loop={true}
                autoplay={true}
              />
            </div>
          </div>
        ) : (
          <motion.div 
            className={`flex justify-center items-center ${isMobile ? 'relative py-16' : 'fixed left-0 top-0'} overflow-hidden`}
            style={isMobile ? { width: '100%' } : { width: wrapperWidth, translateX, translateY }}
            ref={cardsRef}
            onMouseMove={(e) => getMousePositions(e, cardsRef.current)}
          >
            <div className={`flex ${isMobile ? 'flex-col items-center' : 'flex-wrap'}`}>
              {Array.isArray(movies) && movies.length > 0 ? (
                movies.map((movie, i) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.3 }}
                    key={i}>
                    <Card movie={movie} cardWidth={cardWidth} />
                  </motion.div>
                ))
              ) : (
                <div className="text-black dark:text-white text-xl sm:text-2xl p-8">No movies found</div>
              )}
            </div>
          </motion.div>
        )
      }
    </>
  )
}

export default Home