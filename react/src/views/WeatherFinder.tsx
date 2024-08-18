import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/solid'
import {  StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { WiDirectionDown, WiHumidity, WiStrongWind, WiSunrise, WiThermometer, WiThermometerExterior } from 'react-icons/wi';

const WeatherFinder = () => {

    const [cep,setCep] = useState ('');
    const [location,setLocation] = useState ('');

    async function fetchWeatherFromLocation(){
        const apiKey = import.meta.env.VITE_REACT_APP_WEATHERSTACK_API_KEY ;
        const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;
        console.log(url);
    }

    function handleFindWeather(e:React.MouseEvent){
        e.preventDefault()
        fetchWeatherFromLocation();
    }

    async function fetchLoactionFromCep(){
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        const data = await res.json();
        if(data['localidade']){
            setLocation(data['localidade']);
        }else{
            console.log("Toast avisando que não deu boa.")
        }
    }

    function handleCep(){
        if(cep!=''){ // Melhorar isso com uma validação do cep
            fetchLoactionFromCep();
        }
    }

    function handleAddFavorite(e:React.MouseEvent){
        e.preventDefault()
        console.log(`Adicionando ${location} aos favoritos`);
    }
    
    return (
        <div className='wf_container'>
            <div className='wf_header'>
                <h3 className='wf_header__title'>
                    Weather<span className='wf_header__title--bold'>APP</span>
                </h3>
                <button className='wf_header__button button'><StarIcon/></button>            
            </div>
            <div className='wf_form'>
                <form className='row g-2 p-2 pb-0 align-content-center'>
                    <div className='col-md-5 col-5'>
                        <div className='form-floating mb-3'>
                            <input type='text' placeholder='00000-000' className='form-control' 
                            id="cep" name="cep" value={cep} onChange={(e)=>setCep(e.target.value)}
                            onBlur={handleCep}/>
                            <label htmlFor="cep">CEP</label>
                        </div>
                    </div>
                    <div className='col-md-5 col-5'>
                        <div className='form-floating mb-3'>
                            <input type='text' placeholder='Chapecó' className='form-control' 
                            id="location" name="location" value={location} onChange={(e)=>setLocation(e.target.value)}/>
                            <label htmlFor="location">Cidade</label>
                        </div>
                    </div>
                    <div className='col-md-2 d-flex justify-content-end col-2 pt-1'>
                        <button className='wf_form__button button' onClick={(e)=>handleFindWeather(e)} disabled={location == '' ? true : false}>
                            <MagnifyingGlassIcon/>
                        </button>
                    </div>                    
                </form>
            </div>
            {location && 
                <div className='wf_content'>
                    <div className='wf_content__location'>
                        <div>
                            <h3 className='wf_content__location_title'>{location}</h3>
                            <p className='wf_content__location_weather_description'>Descrição do tempo</p>
                        </div>                        
                        <WiSunrise size={36} />                        
                    </div>
                    <div className='wf_content__weather_info'>
                        <div className='wf_content__weather_card'>
                            <WiThermometer size={72}/>
                            <p className='info_text'>Temperatura</p>
                        </div>
                        <div className='wf_content__weather_card'>
                            <WiHumidity size={72}/>
                            <p className='info_text'>Umidade</p>
                        </div>
                        <div className='wf_content__weather_card'>
                            <WiThermometerExterior size={72}/>
                            <p className='info_text'>Sensação térmica</p>
                        </div>
                        <div className='wf_content__weather_card'>
                            <WiStrongWind size={72}/>
                            <p className='info_text'>Vento</p>
                        </div>
                        <div className='wf_content__weather_card'>
                            <WiDirectionDown size={72}/>
                            <p className='info_text'>Direção do vento</p>
                        </div>
                        <div className='wf_content__weather_card'>
                            <p className='wind_speed'>XX km/h</p>
                            <p className='info_text'>Velocidade do vento</p>
                        </div>
                    </div>
                    <div>
                        <button className='button add_fav_button' onClick={(e)=>{handleAddFavorite(e)}}>
                            
                            <p className='m-2'>Adicionar aos favoritos</p>
                           
                            <OutlineStarIcon width={20}/>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default WeatherFinder
