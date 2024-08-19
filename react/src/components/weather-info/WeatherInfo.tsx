import React from 'react'
import {  StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline'
import WeatherIcon from '../card/Icons/WeatherIcon';
import { WiThermometer, WiHumidity, WiThermometerExterior, WiRaindrops } from 'react-icons/wi';
import WeatherCard from '../card/Card';
import WindIcon from '../card/Icons/WindIcon';

interface WeatherInfoProps{
    weatherData: any;
    handleAddFavorite: (e:React.MouseEvent) => void;
}

const WeatherInfo = ({weatherData,handleAddFavorite}:WeatherInfoProps) => {
  return (
    <div className='wf_content'>
                    <div className='wf_content__location'>
                        <div>
                            <h3 className='wf_content__location_title'>{weatherData?.request?.query}</h3>
                            <p className='wf_content__location_weather_description'>{weatherData?.current?.weather_descriptions}</p>
                        </div>
                        <WeatherIcon description={weatherData?.current?.weather_descriptions[0]} size={42}/>                   
                    </div>
                    <div className='wf_content__weather_info'>
                        <WeatherCard icon={<WiThermometer size={72} />} label='Temperatura' value={`${weatherData?.current?.temperature}°C`} />
                        <WeatherCard icon={<WiHumidity size={72} />} label='Umidade' value={weatherData?.current?.humidity} />
                        <WeatherCard icon={<WiThermometerExterior size={72} />} label='Sensação térmica' value={`${weatherData?.current?.feelslike}°C`} />
                        <WeatherCard icon={<WiRaindrops size={72} />} label='Precipitação' value={`${weatherData?.current?.precip} mm`} />
                        <WeatherCard icon={<WindIcon windDirection={weatherData?.current?.wind_dir} />} label='Direção do vento' />
                        <WeatherCard label='Velocidade do vento' value={`${weatherData?.current?.wind_speed} km/h`} />
                    </div>
                    <div>
                        <button className='button add_fav_button' onClick={(e)=>{handleAddFavorite(e)}}>                            
                            <p className='m-2'>Adicionar aos favoritos</p>                           
                            <OutlineStarIcon width={20}/>
                        </button>
                    </div>
                </div>
  )
}

export default WeatherInfo