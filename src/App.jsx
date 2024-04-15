import { useEffect, useRef, useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch';
import LocationData from './components/LocationData';
import ResidentCard from './components/ResidentCard';

function App() {

  const [inputValue, setInputValue] = useState(Math.floor(Math.random() * 126) + 1);
  const [location, getLocation, isLoading, hasError] = useFetch();


  

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
    getLocation(url);
  }, [inputValue]);

 

  const textInput = useRef();

  const handleSubmit = (event) =>{
    event.preventDefault();
    setInputValue(textInput.current.value.toLowerCase().trim());
    textInput.current.value = '';
  }
  
   //console.log(location);
 
  return (
    <>
    {
      isLoading ?
        <h2>Loading...</h2>
        :
        <div className='app'>
            <img className='app__img'  src="https://m.media-amazon.com/images/S/stores-image-uploads-na-prod/1/AmazonStores/A1AM78C64UM0Y8/e3bae82d9658c0b38859a2ff0361a5b7.w3000.h600.png" alt="banner_Rick_and_Morty" />
          <form className='app__form' onSubmit={handleSubmit}>
            <input className='app_input' type='text' ref={textInput}/>
            <button className='app__btn'>Search</button>
          </form>
          {
              hasError || inputValue === '0' || inputValue === ''?
              <h2 className='app__error'>Hey! you must provide an id from 1 to 126 😒 </h2>
              :
              <>
                  <LocationData
                    location={location}>

                  </LocationData>
                  <div className='app__container'>
                    {
                      location?.residents.map(resident => (
                        <ResidentCard
                        key={resident}
                        url={resident}>

                        </ResidentCard>
                      ))
                    }
                  </div>
              </>
          }
         
        </div>
    }
   
   </>
  )
}

export default App;
