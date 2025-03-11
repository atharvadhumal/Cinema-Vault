import React, { useEffect, useState } from 'react'
import Card from './Card'

const Home = () => {
  const [cardWidth, setCardWidth] = useState(500)
  const cardsInRow = 5
  const [wrapperWidth, setWrapperWidth] = useState(cardWidth * cardsInRow)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      const url = 'https://tvshow.p.rapidapi.com/Serie/Popular?Page=1&Language=en-US';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '4720b7b4ffmshe35679867c057e8p1dd0ccjsn25907c40e5ca',
          'x-rapidapi-host': 'tvshow.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setMovies(result)
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    getMovies()
  }, [])

  return (
    <div className='flex justify-center items-center' style={{ width: wrapperWidth }}>
      <div className='flex flex-wrap'>
        {
          movies.map((movie, i) => (
            <div key={i}>
              <Card movie={movie} cardWidth={cardWidth} />
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default Home