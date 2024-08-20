
import { useEffect, useState } from 'react'
import WeatherForm from '../components/weather-form/WeatherForm';
import WeatherHeader from '../components/header/Header';
import WeatherInfo from '../components/weather-info/WeatherInfo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WeatherInfoSkeleton from '../components/weather-info/WeatherInfoSkeleton';
import { useLocation } from 'react-router-dom';

const WeatherFinder = () => {

    const [cep,setCep] = useState<string>('');
    const [location,setLocation] = useState<string>('');
    const [weatherData,setWeatherData] = useState<any>(null);
    const [isLoadingData,setIsLoadingData] = useState(false);
    const [shouldShowInfo,setShouldShowInfo] = useState(false);

    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        const location = query.get('location');
        if (location) {
            setLocation(location);
        }
    }, []);  
   
    
    return (
        <div className='wf_container'>
            <WeatherHeader/>
            <WeatherForm
                cep={cep}
                location={location}
                weatherData={weatherData}
                setCep={setCep}
                setLocation={setLocation}
                setWeatherData={setWeatherData}
                setIsLoadingData={setIsLoadingData}
                setShouldShowInfo={setShouldShowInfo}
            />
            {shouldShowInfo ? (!isLoadingData ? (<WeatherInfo weatherData={weatherData}/>) : (<WeatherInfoSkeleton/>) ) : null}
            
            <ToastContainer />
        </div>
    )
}

export default WeatherFinder
