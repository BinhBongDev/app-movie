import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';

import './style.scss'

import tmdbApi, {category, movieType} from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'


const HeroSlide = () => {
    const [movieItems, setMovieItems] = useState([])

    useEffect(() => {
        const getMovies = async() => {
            const params = {page:1}
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params})
                setMovieItems(response.results.slice(0, 5))
            } catch (error) {
                console.log('ERR: ',error.message)
            }
        }
        getMovies() 
    }, [])
    console.log(movieItems)
  return (
    <div className='hero-slide'>
        <Swiper
           spaceBetween={0}
           slidesPerView={1}
           onSlideChange={() => console.log('slide change')}
           onSwiper={(swiper) => console.log(swiper)}
        >
            {
                movieItems.map(movie => (
                    <SwiperSlide key={movie.id}>
                        {({isActive}) => (
                            <img src={apiConfig.originalImage(movie.backdrop_path)} alt={movie.title} />
                        )}
                    </SwiperSlide>
                ))
            }

        </Swiper>
    </div>
  )
}

export default HeroSlide