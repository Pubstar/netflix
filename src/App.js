import { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

function App() {

  const sliderUpcoming = document.getElementById('sliderUpcoming');
  const sliderPopular = document.getElementById('sliderPopular');
  const [moviesPopular, setmoviesPopular] = useState([]);
  const [moviesUpcoming, setmoviesUpcoming] = useState([]);

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

  return (
    <div className=' text-white'>
      <div className='h-[550px] text-white font-semibold'> {/* Header */}
        <div className='absolute w-full h-[550px] z-[-19] bg-gradient-to-r from-black/80'></div>
        <img className='absolute z-[-20] w-full h-[550px] object-cover' src={`https://image.tmdb.org/t/p/original/${moviesPopular[randomMovie] && moviesPopular[randomMovie].backdrop_path}`} alt={`${moviesPopular[randomMovie] && moviesPopular[randomMovie].title}`}></img>
        <div className="flex justify-between p-4"> {/* Navbar */}
          <span className=" text-red-700 text-3xl font-bold cursor-pointer">NETFLIX</span>
          <div>
            <button className="mx-3">Sign In</button>
            <button className="bg-red-700 rounded-md py-2 px-4 text-white">Sign Up</button>
          </div>
        </div>
        <div className="px-4 h-full justify-center flex flex-col">
          <h1 className="text-4xl font-semibold mb-5">{moviesPopular[randomMovie] && moviesPopular[randomMovie].original_title}</h1>
          <div className='mb-5'>
            <button className="py-2 px-4 text-black bg-white mr-3">Play</button>
            <button className="bg-black text-gray-400 border border-gray-400 py-2 px-4">Watch Later</button>
          </div>
          <span className=' text-gray-500 mb-3'>Released {moviesPopular[randomMovie] && moviesPopular[randomMovie].release_date}</span>
          <p>{moviesPopular[randomMovie] && moviesPopular[randomMovie].overview}</p>
        </div>
      </div>
      <div className='bg-black h-screen p-4'> {/* Main */}
        <div>
          <h2 className='font-bold text-lg mb-5'>Upcoming</h2>
          <div className='relative'>
            <BsArrowLeftCircleFill onClick={scrollLeftUpcoming} className='absolute w-10 h-10 z-50 top-20 left-5 cursor-pointer' />
            <BsArrowRightCircleFill onClick={scrollRightUpcoming} className='absolute w-10 h-10 z-50 top-20 right-5 cursor-pointer' />
            <div id='sliderUpcoming' className='scroll-smooth relative overflow-auto no-scrollbar h-48 flex gap-7'>
              {moviesUpcoming.map(movie => {
                return <img key={movie.original_title} src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.original_title}></img>
              })}
            </div>
          </div>
          <h2 className='font-bold text-lg mb-5'>Popular</h2>
          <div className='relative'>
            <BsArrowLeftCircleFill onClick={scrollLeftPopular} className='absolute w-10 h-10 z-50 top-20 left-5 cursor-pointer' />
            <BsArrowRightCircleFill onClick={scrollRightPopular} className='absolute w-10 h-10 z-50 top-20 right-5 cursor-pointer' />
            <div id='sliderPopular' className='scroll-smooth overflow-auto no-scrollbar h-48 flex gap-7'>
              {moviesPopular.map(movie => {
                return <img key={movie.original_title} src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.original_title}></img>
              })}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
