import React from 'react'
import WeatherIcon from '../card/Icons/WeatherIcon';
import { WiThermometer, WiHumidity, WiThermometerExterior, WiRaindrops } from 'react-icons/wi';
import WeatherCard from '../card/Card';
import { HeartIcon } from '@heroicons/react/24/outline';
import axiosClient from '../../axios';
import { Bounce, toast } from 'react-toastify';

interface WeatherInfoProps{
    weatherData: any;
}

const WeatherInfo = ({weatherData}:WeatherInfoProps) => {

    function handleAddFavorite(e:React.MouseEvent){
        e.preventDefault();
        console.log(weatherData?.location?.name);

        axiosClient.post('/locations',{
            location: weatherData?.location?.name
        })
            .then((data)=>{
                if(data.status==201){
                    toast.success('added to favorites', {
                        position: "bottom-right",
                        autoClose: 3000,
                        pauseOnHover: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
                console.log(data);
            })
            .catch((error)=>{
                console.log(error);
                toast.info(error.response.data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            });
    }

    return (
        <div className='wf_content'>
            <div className='wf_content__location'>
                <div>
                    <h3 className='wf_content__location_title'>{weatherData?.location?.name}</h3>
                    <p className='wf_content__location_weather_description'>{weatherData?.current?.weather_descriptions}
                    <WeatherIcon description={weatherData?.current?.weather_descriptions[0]} size={25}/> </p>
                </div>
                                  
            </div>
            <div className='wf_content__weather_info'>
                <WeatherCard icon={<WiThermometer size={72} />} label='Temperatura' value={`${weatherData?.current?.temperature}°C`} />
                <WeatherCard icon={<WiHumidity size={72} />} label='Umidade' value={weatherData?.current?.humidity} />
                <WeatherCard icon={<WiThermometerExterior size={72} />} label='Sensação térmica' value={`${weatherData?.current?.feelslike}°C`} />
                <WeatherCard icon={<WiRaindrops size={72} />} label='Precipitação' value={`${weatherData?.current?.precip} mm`} />
                <WeatherCard label='Direção do vento' value={weatherData?.current?.wind_dir}/>
                <WeatherCard label='Velocidade do vento' value={`${weatherData?.current?.wind_speed} km/h`} />
            </div>
            <div>
                <button className='button add_fav_button' onClick={(e)=>{handleAddFavorite(e)}}>                            
                    <p className='m-2'>Adicionar aos favoritos</p> <HeartIcon width={20}/>
                </button>
            </div>
        </div>
  )
}

export default WeatherInfo