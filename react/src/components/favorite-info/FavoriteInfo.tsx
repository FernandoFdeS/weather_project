import React, { useEffect, useState } from 'react'
import { WiHumidity, WiRaindrops, WiThermometer, WiThermometerExterior } from 'react-icons/wi'
import { Bounce, toast } from 'react-toastify';
import WindIcon from '../card/Icons/WindIcon';
import FavoriteInfoSkeleton from './FavoriteInfoSkeleton';

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


    console.log(favoriteLocationData);
    
    return (
        <div className='compare_container__card_wrap col-6'>
            <div className='compare_container__select'>
                <select className='form-group form-select' onChange={(e) => handleSelect(e)}>
                    <option value='' disabled selected>choose-location</option>
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
                        <span className='card_badge'>
                            <WiThermometer size={22} />{favoriteLocationData?.current?.temperature}°C
                            <p>temperature</p>
                        </span>
                        <span className='card_badge'>
                            <WiHumidity size={22} />{favoriteLocationData?.current?.humidity}%
                            <p>humidity</p>
                        </span>
                        <span className='card_badge'>
                            <WiThermometerExterior size={22} />{favoriteLocationData?.current?.feelslike}%
                            <p>feelslike</p>
                        </span>
                        <span className='card_badge'>
                            <WiRaindrops size={22} />{favoriteLocationData?.current?.precip}%
                            <p>precipitation</p>
                        </span>
                        <span className='card_badge'>
                            {favoriteLocationData?.current?.wind_dir}
                            <p>wind-direction</p>
                        </span>
                        <span className='card_badge'>
                            {favoriteLocationData?.current?.wind_speed} Km/h
                            <p>wind-speed</p>
                        </span>
                    </div>
                )
            ) : null}
        </div>
        
    );
    
}

export default FavoriteInfo
