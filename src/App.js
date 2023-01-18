import { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'


function App() {

  const sliderUpcoming = document.getElementById('sliderUpcoming');
  const sliderPopular = document.getElementById('sliderPopular');
  const sliderTrending = document.getElementById('sliderTrending');
  const navOverlay = document.getElementById('navOverlay');
  const [moviesPopular, setmoviesPopular] = useState([]);
  const [moviesUpcoming, setmoviesUpcoming] = useState([]);
  const [moviesTrending, setmoviesTrending] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(res => {
        setmoviesPopular(res.results);
      })
      .catch(err => alert('Couldnt fetch moviesPopular! ' + err))

    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(res => {
        setmoviesUpcoming(res.results);
      })
      .catch(err => alert('Couldnt fetch moviesUpcoming! ' + err))

    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(res => {
        setmoviesTrending(res.results);
      })
      .catch(err => alert('Couldnt fetch moviesTrending! ' + err))
  }, [])

  let randomMovie = Math.floor(Math.random() * moviesPopular.length);

  const scrollLeftUpcoming = () => {
    sliderUpcoming.scrollLeft = sliderUpcoming.scrollLeft - 500;
  }
  const scrollRightUpcoming = () => {
    sliderUpcoming.scrollLeft = sliderUpcoming.scrollLeft + 500;
  }
  const scrollLeftPopular = () => {
    sliderPopular.scrollLeft = sliderPopular.scrollLeft - 500;
  }
  const scrollRightPopular = () => {
    sliderPopular.scrollLeft = sliderPopular.scrollLeft + 500;
  }
  const scrollLeftTrending = () => {
    sliderTrending.scrollLeft = sliderTrending.scrollLeft - 500;
  }
  const scrollRightTrending = () => {
    sliderTrending.scrollLeft = sliderTrending.scrollLeft + 500;
  }

  const handleBurgerIcon = () => {
    if (navOverlay.style.visibility === 'visible') {
      navOverlay.style.visibility = 'hidden'
    } else {
      navOverlay.style.visibility = 'visible'
    }
  }

  return (
    <div className=' text-white'>
      <div id='navOverlay' style={{ 'visibility': 'hidden', }} className='z-40 fixed h-screen w-full bg-black/95 flex items-center justify-center flex-col gap-20'>
        <button className="mx-3 scale-150">Sign In</button>
        <button className="bg-red-700 rounded-md py-2 px-4 text-white scale-150">Sign Up</button>
      </div>
      <div className='h-[550px] text-white font-semibold'> {/* Header */}
        <div className='absolute w-full h-[550px] z-[-19] bg-gradient-to-r from-black/80'></div>
        <img className='absolute z-[-20] w-full h-[550px] object-fill' src={`https://image.tmdb.org/t/p/original/${moviesPopular[randomMovie] && moviesPopular[randomMovie].backdrop_path}`} alt={`${moviesPopular[randomMovie] && moviesPopular[randomMovie].title}`}></img>
        <div className="flex justify-between items-center p-4"> {/* Navbar */}
          <span className=" text-red-700 text-3xl font-bold cursor-pointer">NETFLIX</span>
          <div className='scale-0 md:scale-100'>
            <button className="mx-3">Sign In</button>
            <button className="bg-red-700 rounded-md py-2 px-4 text-white">Sign Up</button>
          </div>
          <GiHamburgerMenu onClick={handleBurgerIcon} className='z-50 scale-150 md:scale-0 md:absolute cursor-pointer' />
        </div>
        <div className="px-4 h-full justify-center flex flex-col">
          <h1 className="text-4xl font-semibold mb-5">{moviesPopular[randomMovie] && moviesPopular[randomMovie].original_title}</h1>
          <div className='mb-5'>
            <button className="py-2 px-4 text-black bg-white mr-3">Play</button>
            <button className="bg-black text-gray-400 border border-gray-400 py-2 px-4">Watch Later</button>
          </div>
          <span className=' text-gray-500 mb-3'>Released {moviesPopular[randomMovie] && moviesPopular[randomMovie].release_date}</span>
          <p className=' lg:w-[40%]'>{moviesPopular[randomMovie]?.overview.slice(0, 125) + '...'}</p>
        </div>
      </div>
      <div className='bg-black h-screen p-4'> {/* Main */}
        <div>
          <h2 className='font-bold text-lg mb-5'>Upcoming</h2>
          <div className='relative mb-3 group/arrows'>
            <BsArrowLeftCircleFill onClick={scrollLeftUpcoming} className='scale-0 group-hover/arrows:scale-100 absolute w-10 h-10 z-50 top-20 left-5 cursor-pointer' />
            <BsArrowRightCircleFill onClick={scrollRightUpcoming} className='scale-0 group-hover/arrows:scale-100 absolute w-10 h-10 z-50 top-20 right-5 cursor-pointer' />
            <div id='sliderUpcoming' className='scroll-smooth relative overflow-auto no-scrollbar h-48 flex gap-7'>
              {moviesUpcoming.map(movie => {
                return (
                  <div className=' w-[341.33px] relative group cursor-pointer flex-none' key={movie.original_title}>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.original_title}></img>
                    <div className=' scale-0 group-hover:scale-100 absolute h-full w-full top-0 left-0 bg-black/80 font-bold text-lg flex items-center justify-center p-2'>{movie.original_title}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <h2 className='font-bold text-lg mb-5'>Popular</h2>
          <div className='relative mb-3 group/arrows'>
            <BsArrowLeftCircleFill onClick={scrollLeftPopular} className='scale-0 group-hover/arrows:scale-100 absolute w-10 h-10 z-50 top-20 left-5 cursor-pointer' />
            <BsArrowRightCircleFill onClick={scrollRightPopular} className='scale-0 group-hover/arrows:scale-100 absolute w-10 h-10 z-50 top-20 right-5 cursor-pointer' />
            <div id='sliderPopular' className='scroll-smooth overflow-auto no-scrollbar h-48 flex gap-7'>
              {moviesPopular.map(movie => {
                return (
                  <div className=' w-[341.33px] relative group cursor-pointer flex-none' key={movie.original_title}>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.original_title}></img>
                    <div className=' scale-0 group-hover:scale-100 absolute h-full w-full top-0 left-0 bg-black/80 font-bold text-lg flex items-center justify-center p-2'>{movie.original_title}</div>
                  </div>
                )
              })}</div>
          </div>
          <h2 className='font-bold text-lg mb-5 '>Trending</h2>
          <div className='relative group/arrows'>
            <BsArrowLeftCircleFill onClick={scrollLeftTrending} className='scale-0 group-hover/arrows:scale-100 absolute w-10 h-10 z-50 top-20 left-5 cursor-pointer' />
            <BsArrowRightCircleFill onClick={scrollRightTrending} className='scale-0 group-hover/arrows:scale-100 absolute w-10 h-10 z-50 top-20 right-5 cursor-pointer' />
            <div id='sliderTrending' className='scroll-smooth overflow-auto no-scrollbar h-48 flex gap-7'>
              {moviesTrending.map(movie => {
                return (
                  <div className=' w-[341.33px] relative group cursor-pointer flex-none' key={movie.original_title}>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.original_title}></img>
                    <div className=' scale-0 group-hover:scale-100 absolute h-full w-full top-0 left-0 bg-black/80 font-bold text-lg flex items-center justify-center p-2'>{movie.original_title}</div>
                  </div>
                )
              })}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
