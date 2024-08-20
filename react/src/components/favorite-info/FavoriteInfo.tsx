import React, { useEffect, useState } from 'react'
import { WiBarometer, WiHot, WiHumidity, WiRaindrops, WiThermometer, WiThermometerExterior } from 'react-icons/wi'
import { Bounce, toast } from 'react-toastify';
import FavoriteInfoSkeleton from './FavoriteInfoSkeleton';
import WeatherIcon from '../card/icons/WeatherIcon';
import { ClockIcon } from '@heroicons/react/24/solid';
import WeatherBadge from '../card/weather-badge/WeatherBadge';

interface FavoriteInfoProps{
    favorites:Array<any>;
}

const FavoriteInfo = ({favorites}:FavoriteInfoProps) => {
    const [currentFavoriteLocation,setCurrentFavoriteLocation] = useState('');
    const [favoriteLocationData,setFavoriteLocationData] = useState<any>(null);
    const [isLocationDataLoading,setIsLocationDataLoading] = useState(false);

    function handleSelect(e:any){
        setCurrentFavoriteLocation(e.target.value);
    }

    useEffect(() => {
        if (currentFavoriteLocation) {
            setIsLocationDataLoading(true);
            fetchFavoriteLocationData();
        }
    }, [currentFavoriteLocation]);

    async function fetchFavoriteLocationData(){
        const apiKey = import.meta.env.VITE_REACT_APP_WEATHERSTACK_API_KEY ;
        const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${currentFavoriteLocation}`;
        
        setFavoriteLocationData(null);
        try{
            const res = await fetch(url);
            const data = await res.json();
            if(data.success!==false){
                setFavoriteLocationData(data);
            } else{
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
            setIsLocationDataLoading(false);
        }
    }
    
    return (
        <div className='compare_container__card_wrap col-6'>
            <div className='compare_container__select'>
                <select className='form-group form-select' onChange={(e) => handleSelect(e)}>
                    <option value='' disabled selected>Escolha uma cidade</option>
                    {favorites && favorites.length ? (
                        favorites.map((item) => (
                            <option key={item.id} value={item.location}>
                                {item.location}
                            </option>
                        ))
                    ) : null}
                </select>
            </div>
            {isLocationDataLoading}
            {favoriteLocationData || isLocationDataLoading ? (
                isLocationDataLoading ? (
                    <FavoriteInfoSkeleton />
                ) : (
                    <div className='compare_container__card mt-2'>
                        <p className='compare_container_card_title'>{favoriteLocationData?.location?.name}</p>
                        <WeatherBadge 
                            icon={<WeatherIcon 
                                description={favoriteLocationData?.current?.weather_descriptions[0]} 
                                isDay={favoriteLocationData?.current?.is_day}
                                size={22}
                            />}
                            value={favoriteLocationData?.current?.weather_descriptions}
                            label="Condição do tempo"
                        />
                        <WeatherBadge 
                            icon={<WiThermometer size={22} />}
                            value={`${favoriteLocationData?.current?.temperature}°C`}
                            label="Temperatura"
                        />
                        <WeatherBadge 
                            icon={<WiHumidity size={22} />}
                            value={`${favoriteLocationData?.current?.humidity}%`}
                            label="Umidade"
                        />
                        <WeatherBadge 
                            icon={<WiThermometerExterior size={22} />}
                            value={`${favoriteLocationData?.current?.feelslike}%`}
                            label="Sensação térmica"
                        />
                        <WeatherBadge 
                            icon={<WiHot size={22} />}
                            value={favoriteLocationData?.current?.uv_index}
                            label="Índice UV"
                        />
                        <WeatherBadge 
                            icon={<ClockIcon width={22} />}
                            value={favoriteLocationData?.location?.localtime.split(' ')[1]}
                            label="Horário"
                        />
                        <WeatherBadge 
                            icon={<WiBarometer size={24} />}
                            value={`${favoriteLocationData?.current?.pressure} MB`}
                            label="Pressão"
                        />
                        <WeatherBadge 
                            icon={<WiRaindrops size={22} />}
                            value={`${favoriteLocationData?.current?.precip} MM`}
                            label="Precipitação"
                        />
                        <WeatherBadge 
                            value={favoriteLocationData?.current?.wind_dir}
                            label="Direção do vento"
                        />
                        <WeatherBadge                             
                            value={`${favoriteLocationData?.current?.wind_speed} Km/h`}
                            label="Velocidade do vento"
                        />
                    </div>
                )
            ) : null}
        </div>
        
    );
    
}

export default FavoriteInfo
