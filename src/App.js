import { useEffect, useState } from 'react';

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`)
      .then(response => response.json())
      .then(res => {
        setMovies(res.results);
      })
      .catch(err => alert('Couldnt fetch movies! ' + err))
  }, [])

  let randomMovie = Math.floor(Math.random() * movies.length);
  console.log(randomMovie);

  return (
    <div className=' text-white'>
      <div className='h-[550px] text-white font-semibold'> {/* Header */}
        <div className='absolute w-full h-[550px] z-[-19] bg-gradient-to-r from-black/80'></div>
        <img className='absolute z-[-20] w-full h-[550px] object-cover' src={`https://image.tmdb.org/t/p/original/${movies[randomMovie] && movies[randomMovie].backdrop_path}`} alt={`${movies[randomMovie] && movies[randomMovie].title}`}></img>
        <div className="flex justify-between p-4"> {/* Navbar */}
          <span className=" text-red-700 text-3xl font-bold cursor-pointer">NETFLIX</span>
          <div>
            <button className="mx-3">Sign In</button>
            <button className="bg-red-700 rounded-md py-2 px-4 text-white">Sign Up</button>
          </div>
        </div>
        <div className="px-4 h-full justify-center flex flex-col">
          <h1 className="text-4xl font-semibold mb-5">{movies[randomMovie] && movies[randomMovie].original_title}</h1>
          <div className='mb-5'>
            <button className="py-2 px-4 text-black bg-white mr-3">Play</button>
            <button className="bg-black text-gray-400 border border-gray-400 py-2 px-4">Watch Later</button>
          </div>
          <span className=' text-gray-500 mb-3'>Released {movies[randomMovie] && movies[randomMovie].release_date}</span>
          <p>{movies[randomMovie] && movies[randomMovie].overview}</p>
        </div>
      </div>
      <div className='bg-black h-screen p-4'> {/* Main */}
        <div>
          <h2 className=' font-bold text-lg'>Upcoming</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
