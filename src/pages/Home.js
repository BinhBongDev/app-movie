import React from 'react'
import { Link } from 'react-router-dom'
import { OutlineButton } from '../components/Button'
import HeroSlide from '../components/HeroSlide'
import MoiveList from '../components/MovieList'
import {category, movieType, tvType} from '../api/tmdbApi'

const Home = () => {
  return (
    <>
      <HeroSlide /> 
      <div className='container'>
        {/* POPULAR */}
        <div className='section mb-3'>
          <div className='section__header mb-2'>
            <h2>Trending Movie</h2>
            <Link to={'/movie'}>
              <OutlineButton className="small">
                View more
              </OutlineButton>
            </Link>
          </div>
          <MoiveList category={category.movie} type={movieType.popular} />
        </div>
        {/* top rated */}
        <div className="section mb-3">
              <div className="section__header mb-2">
                  <h2>Top Rated Movies</h2>
                  <Link to="/movie">
                      <OutlineButton className="small">View more</OutlineButton>
                  </Link>
              </div>
              <MoiveList category={category.movie} type={movieType.top_rated}/>
          </div>
          {/*  */}

          <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MoiveList category={category.tv} type={tvType.popular}/>
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MoiveList category={category.tv} type={tvType.top_rated}/>
                </div>
      </div>
    </>
  )
}

export default Home
