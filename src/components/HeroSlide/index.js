import React, { useEffect, useRef, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {useNavigate} from 'react-router-dom'

import 'swiper/css';
import './style.scss'

import tmdbApi, {category, movieType} from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import Button, {OutlineButton} from '../Button';
import Modal, {ModalContent} from '../Modal'


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
        {
            movieItems.map((item) => <TrailerModal key={item.id} item={item} />)
        }
    </div>
  )
}

const HeroSlideItem = props => {
    let navigate = useNavigate()
    const item = props.item

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    const setModalActive = async() => {
        const modal  = document.querySelector(`#modal_${item.id}`)

        const videos = await tmdbApi.getVideos(category.movie, item.id)

        if(videos.results.length > 0) {
            const videoSrc = `https://www.youtube.com/embed/${videos.results[0].key}`
            modal.querySelector(`.modal__content > iframe`).setAttribute('src', videoSrc)
        } else {
            modal.querySelector('.modal__content').innerHTML = "No Trailer this film"
        }

        modal.classList.toggle('active')
    }
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
                        <OutlineButton
                            onClick = {() => setModalActive()}
                        >
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

const TrailerModal = props => {
        const item = props.item

        const ifFrameRef = useRef(null)

        const onClose = () => ifFrameRef.current.setAttribute('src', '')

        return (
            <Modal id={`modal_${item.id}`} active={false}>
                <ModalContent onClose={onClose}>
                    <iframe ref={ifFrameRef} width="100%" height={'500px'} title="trailer"></iframe>
                </ModalContent>
            </Modal>
        )
}

export default HeroSlide