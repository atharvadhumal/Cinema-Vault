import React from 'react'
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from 'react-icons/io'
import { motion } from 'framer-motion'

const Navigation = ({ page, setPage, setGroup, isMobile }) => {
    return (
        <div className='relative z-10'>
            
            <div className={`fixed ${isMobile ? 'bottom-4 left-1/2 -translate-x-1/2' : 'bottom-5 left-5'} flex items-center gap-x-2 text-lg sm:text-2xl bg-amber-500/50 rounded-full px-2 py-1`}>
                <motion.span 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.4 }}
                    onClick={() => page != 1 && setPage(() => page - 1)} 
                    className='cursor-pointer'
                >
                    <IoMdArrowDropleftCircle />
                </motion.span>

                <p className='text-base sm:text-xl select-none'>{page}</p>

                <motion.span 
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.4 }}
                    onClick={() => setPage((page) => page + 1)} 
                    className='cursor-pointer'
                >
                    <IoMdArrowDroprightCircle />
                </motion.span>
            </div>

           
            <select 
                defaultValue={"Popular"} 
                onChange={(e) => {
                    setGroup(e.target.value)
                    setPage(1)
                }} 
                className={`fixed ${isMobile ? 'top-4 right-4' : 'top-5 left-5'} bg-gray-200/90 text-xs sm:text-sm tracking-wide text-gray-800 uppercase rounded-md outline-none p-1 cursor-pointer hover:bg-gray-200`}
            >
                <option value="TopRated">Top Rated</option>
                <option value="Popular">Popular</option>
                <option value="Discover">Discover</option>
            </select>
        </div>
    )
}

export default Navigation