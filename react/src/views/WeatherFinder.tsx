
import React, { useState } from 'react'
import WeatherForm from '../components/weather-form/WeatherForm';
import WeatherHeader from '../components/header/Header';
import WeatherInfo from '../components/weather-info/WeatherInfo';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WeatherInfoSkeleton from '../components/weather-info/WeatherInfoSkeleton';

const WeatherFinder = () => {

    const [cep,setCep] = useState<string>('');
    const [location,setLocation] = useState<string>('');
    const [weatherData,setWeatherData] = useState<any>(null);
    const [isLoadingData,setIsLoadingData] = useState(false);
    const [shouldShowInfo,setShouldShowInfo] = useState(false);
    const [isCepInvalid, setIsCepInvalid] = useState<boolean>(false);
    const [isLocationInvalid, setIsLocationInvalid] = useState<boolean>(false);

    async function fetchWeatherFromLocation(){
        const apiKey = import.meta.env.VITE_REACT_APP_WEATHERSTACK_API_KEY ;
        const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;
        setWeatherData(null);
        setIsLoadingData(true);
        setShouldShowInfo(true);
        try{
            const res = await fetch(url);
            const data = await res.json();
            if(data.success!==false){
                setIsLocationInvalid(false);
                setWeatherData(data);
                console.log(weatherData);
            } else{
                setIsLocationInvalid(true);
                toast.error('location-not-found.', {
                    position: "bottom-right",
                    autoClose: 3000,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }catch(e){
            console.log(`Erro: ${e}`);
        }finally{
            setIsLoadingData(false)
        }
    }

    async function fetchLocationFromCep(){
        try{
            const res = await fetch(`https://viacep.com.br/ws/${cep}/json`);
            const data = await res.json();
            if(data.localidade){
                setLocation(data.localidade);
                setIsLocationInvalid(false);
            }else{
                setIsCepInvalid(true);
                toast.error('zip-code-not-found.', {
                    position: "bottom-right",
                    autoClose: 3000,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }catch(e){
            console.log(`Erro: ${e}`);
        }
    }     
    
    return (
        <div className='wf_container'>
            <WeatherHeader/>
            <WeatherForm
                cep={cep}
                setCep={setCep}
                isCepInvalid={isCepInvalid}
                location={location}
                setLocation={setLocation}
                isLocationInvalid={isLocationInvalid}
                setIsCepInvalid={setIsCepInvalid}
                fetchWeather={fetchWeatherFromLocation}
                fetchLocation={fetchLocationFromCep}
            />
            {shouldShowInfo ? (!isLoadingData ? (<WeatherInfo weatherData={weatherData}/>) : (<WeatherInfoSkeleton/>) ) : null}
            
            <ToastContainer />
        </div>
    )
}

export default WeatherFinder
