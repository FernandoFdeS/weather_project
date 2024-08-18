
import React, { useState } from 'react'
import WeatherForm from '../components/weather-form/WeatherForm';
import WeatherHeader from '../components/header/Header';
import WeatherInfo from '../components/weather-info/WeatherInfo';

const WeatherFinder = () => {

    const [cep,setCep] = useState<string>('');
    const [location,setLocation] = useState<string>('');
    const [weatherData,setWeatherData] = useState<any>(null);

    async function fetchWeatherFromLocation(){
        const apiKey = import.meta.env.VITE_REACT_APP_WEATHERSTACK_API_KEY ;
        const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;
        setWeatherData(null);
        console.log(url);
        try{
            const res = await fetch(url);
            const data = await res.json();
            setWeatherData(data);
            console.log(weatherData); 
        }catch(e){
            console.log(`Erro: ${e}`);
        }
    }

    async function fetchLocationFromCep(){
        try{
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json`);
            const data = await res.json();
            if(data['localidade']){
                setLocation(data['localidade']);
            }else{
                console.log("Toast avisando que não deu boa.")
            }
        }catch(e){
            console.log(`Erro: ${e}`);
        }
    }    

    function handleAddFavorite(e:React.MouseEvent):void{
        e.preventDefault()
        console.log(`Adicionando ${location} aos favoritos`);
    }    
    
    return (
        <div className='wf_container'>
            <WeatherHeader/>
            <WeatherForm
                cep={cep}
                setCep={setCep}
                location={location}
                setLocation={setLocation}
                fetchWeather={fetchWeatherFromLocation}
                fetchLocation={fetchLocationFromCep}
            />
            {weatherData && <WeatherInfo weatherData={weatherData} handleAddFavorite={handleAddFavorite} />}
        </div>
    )
}

export default WeatherFinder
