import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Card = ({ cardWidth, movie }) => {
    const { name, image, genres, originalLanguage, firstAirDate, overview } = movie
    const [showDesc, setShowDesc] = useState(false)
    return (
        <div style={{ width: cardWidth }} className='h-[500px] md:h-[600px] lg:h-[650px] relative flex justify-center items-center shrink-0 p-2 group'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showDesc ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowDesc(!showDesc)}
                className='w-[97%] h-[97%] m-auto text-white absolute rounded-lg bg-black/50 flex flex-col justify-center gap-y-2 p-4 md:p-6 lg:p-10 cursor-pointer backdrop-blur-2xl'>

                <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl'>{name}</h1>

                <div className='flex flex-wrap gap-x-2 items-center'>
                    <span className='text-sm md:text-lg'>Genres:</span>
                    {
                        genres.map((genre, i) => (
                            <span key={i} className='font-semibold text-red-600 text-sm md:text-base'>{genre}</span>
                        ))
                    }
                </div>

                <span className='flex gap-x-2 text-sm md:text-base'>Original Language: <span className='mr-2 uppercase'>{originalLanguage}</span></span>

                <span className='flex gap-x-2 text-sm md:text-base'>Release Date: <span className='mr-2 text-yellow-400'>{firstAirDate}</span></span>

                <p className='flex flex-col gap-y-1 text-sm md:text-base'>
                    <span className='text-red-500'>Summary:</span>
                    <span className='first-letter:pl-2 line-clamp-6 md:line-clamp-none'>{overview || "Summary Not Available"}</span>
                </p>
            </motion.div>

            <img
                src={image}
                alt="Movie img"
                className='absolute w-[97%] h-[97%] object-cover rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10' />
        </div>
    )
}

export default Card