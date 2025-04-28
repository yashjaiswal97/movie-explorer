import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import './TrendingSlider.css';

const API_KEY = '5941163f63c495835215f3402295dc9f';  

const TrendingSlider = () => {
  const [trending, setTrending] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`);
        setTrending(res.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };
    fetchTrending();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Optional: hide arrows
  };

  return (
    <div className="trending-slider">
      {trending.length > 0 ? (
        <Slider {...settings}>
          {trending.map((item) => (
            <div key={item.id} className="slider-item">
              <img
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={item.title || item.name}
                className="slider-image"
              />
              <div className="slider-caption">
                <h2>{item.title || item.name}</h2>
                {/* Optional: <p>{item.overview}</p> */}
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};

export default TrendingSlider;