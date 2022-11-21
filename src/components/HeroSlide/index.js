import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {useNavigate} from 'react-router-dom'

import 'swiper/css';
import './style.scss'

import tmdbApi, {movieType} from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import Button, {OutlineButton} from '../Button';


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
                            <HeroSlideItem
                                item={movie}
                                className={`${isActive ? 'active' : ''}`}
                            />
                        )}
                    </SwiperSlide>
                ))
            }

        </Swiper>
    </div>
  )
}

const HeroSlideItem = props => {
    let navigate = useNavigate()
    const item = props.item

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style = {{backgroundImage: `url(${background})`}}
        >
            <div className='hero-slide__item__content container'>
                <div className='hero-slide__item__content__info'>
                    <h2 className='title'>{item.title}</h2>
                    <p className='overview'>{item.overview}</p>
                    <div className='btns'>
                        <Button
                            onClick={() => navigate(`/movie/${item.id}`)}>
                            Watch Now
                        </Button>
                        <OutlineButton onClick = {() => console.log(`Trailer ID: ${item.id}`)}>
                            Watch Trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className='hero-slide__item__content__poster'>
                    <img src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
                </div>

            </div>

        </div>
    )
}

export default HeroSlide