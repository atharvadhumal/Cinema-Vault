import React from 'react'
import godfather from '../assets/img.png'

const Card = ({ cardWidth, movie }) => {
    const { name, image, genres, originalLanguage, firstAirDate, overview } = movie
    return (
        <div style={{ width: cardWidth }} className='h-[650px] relative flex justify-center items-center shrink-0 p-2 bg-gray-600 group'>
            <div className='w-[97%] h-[97%] m-auto text-white absolute rounded-lg bg-black/50 flex flex-col justify-center gap-y-2 p-10 cursor-pointer'>
                <h1 className='text-4xl'>{name}</h1>
                <div className='flex gap-x-2 items-center'>
                    <span className='text-lg'>Genres:</span>
                    {
                        genres.map((genre, i) => (
                            <span key={i} className='font-semibold text-red-600'>{genre}</span>
                        ))
                    }

                </div>
                <span className='flex gap-x-2'>Original Language: <span className='mr-2 uppercase'>{originalLanguage}</span></span>
                <span className='flex gap-x-2'>Release Date: <span className='mr-2 text-yellow-400'>{firstAirDate}</span></span>
                <p className='flex flex-col gap-y-1'>
                    <span className='text-red-500'>Summary:</span>
                    <span className='first-letter:pl-2'>{overview || "Summary Not Available"}</span>
                </p>
            </div>
            <img
                src={image}
                alt="Movie img"
                className='absolute w-[97%] h-[97%] object-cover rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500' />
        </div>
    )
}

export default Card