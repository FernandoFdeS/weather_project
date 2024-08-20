import React, { useEffect, useState } from 'react'
import WeatherIcon from '../icons/WeatherIcon';
import { WiThermometer, WiHumidity, WiThermometerExterior, WiRaindrops,  WiHot, WiBarometer } from 'react-icons/wi';
import WeatherCard from '../card/Card';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FavIcon } from '@heroicons/react/24/solid';
import axiosClient from '../../axios';
import { Bounce, toast } from 'react-toastify';
import { ClockIcon} from '@heroicons/react/24/outline';

interface WeatherInfoProps{
    weatherData: any;
}

const WeatherInfo = ({weatherData}:WeatherInfoProps) => {
    const [favorite,setFavorite] = useState(false);
    const [favId,setFavId] = useState(null);

    useEffect(()=>{
        if(weatherData){
            setFavorite(false);
            axiosClient.get(`/locations/${weatherData?.location?.name}`)
                .then((data)=>{
                    if(data.status==201){
                        setFavorite(true);
                        setFavId(data.data.id);
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
    },[weatherData])

    function handleAddFavorite(e:React.MouseEvent){
        e.preventDefault();
        axiosClient.post('/locations',{
            location: weatherData?.location?.name
        })
            .then((data)=>{
                if(data.status==201){
                    setFavId(data.data.id);
                    setFavorite(true)
                    toast.success('Favoritado!', {
                        position: "bottom-right",
                        autoClose: 3000,
                        pauseOnHover: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            })
            .catch((error)=>{
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

    function handleDelete(e:React.MouseEvent){
        e.preventDefault();
        if(confirm(`Tem certeza que deseja remover ${weatherData?.location?.name} dos favoritos?`)){
            removeLocationFromFavorites();
        };
    }

    function removeLocationFromFavorites(){
        axiosClient.delete(`/locations/${favId}`)
        .then(({data})=>{
            setFavorite(false);
            toast.success(data.message, {
                position: "bottom-right",
                autoClose: 3000,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        })
        .catch((error)=>{
            console.log(error.response.data.error);
        });
    }

    return (
        <div className='wf_content'>
            <div className='wf_content__location'>
                <div>
                    <h3 className='wf_content__location_title'>{weatherData?.location?.name}</h3>
                    <p className='wf_content__location_weather_description'>{weatherData?.current?.weather_descriptions}
                    <WeatherIcon 
                        description={weatherData?.current?.weather_descriptions[0]} 
                        isDay={weatherData?.current?.is_day} size={25}/> </p>
                </div>
                                  
            </div>
            <div className='wf_content__weather_info'>
                <WeatherCard icon={<WiThermometer size={72} />} label='Temperatura' value={weatherData?.current?.temperature} unity='°C' />
                <WeatherCard icon={<WiHumidity size={72} />} label='Umidade' value={weatherData?.current?.humidity} unity='%' />
                <WeatherCard icon={<WiThermometerExterior size={72} />} label='Sensação térmica' value={weatherData?.current?.feelslike} unity='°C' />
                <WeatherCard icon={<WiHot size={72} />} label='Indíce UV' value={weatherData?.current?.uv_index}  />
                <WeatherCard icon={<ClockIcon width={58}/>} label='Horário' value={weatherData?.location?.localtime.split(' ')[1]} />
                <WeatherCard icon={<WiBarometer size={58} />} label='Pressão' value={weatherData?.current?.pressure} unity='°MB' />
                <WeatherCard icon={<WiRaindrops size={72} />} label='Precipitação' value={weatherData?.current?.precip} unity='MM' />
                <WeatherCard label='Direção do vento' value={weatherData?.current?.wind_dir}/>
                <WeatherCard label='Velocidade do vento' value={weatherData?.current?.wind_speed} unity='km/h' />
            </div>
            <div>
                { !favorite ? (
                <button className='button add_fav_button' onClick={(e)=>{handleAddFavorite(e)}}>                            
                    <p className='m-2'>Adicionar aos favoritos</p> <HeartIcon width={20}/>
                </button>
                ):(
                <button className='button add_fav_button' onClick={(e)=>{handleDelete(e)}} >                            
                    <p className='m-2' >Cidade favoritada!</p> <FavIcon width={20}/>
                </button>
                )}
            </div>
        </div>
  )
}

export default WeatherInfo