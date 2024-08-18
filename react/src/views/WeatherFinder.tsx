import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/solid'
import {  StarIcon as OutlineStarIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { WiCloud, WiDayCloudy, WiDayHaze, WiDayShowers, WiDaySunny, WiDirectionDown, WiDirectionDownLeft, WiDirectionDownRight, WiDirectionLeft, WiDirectionRight, WiDirectionUp, WiDirectionUpLeft, WiDirectionUpRight, WiFog, WiHumidity, WiRain, WiRaindrops, WiStrongWind, WiSunrise, WiThermometer, WiThermometerExterior } from 'react-icons/wi';

const WeatherFinder = () => {

    const [cep,setCep] = useState ('');
    const [location,setLocation] = useState ('');
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

    function handleFindWeather(e:React.MouseEvent){
        e.preventDefault()
        fetchWeatherFromLocation();
    }

    async function fetchLoactionFromCep(){
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

    function handleCep(){
        if(cep!=''){ // Melhorar isso com uma validação do cep
            fetchLoactionFromCep();
        }
    }

    function handleAddFavorite(e:React.MouseEvent){
        e.preventDefault()
        console.log(`Adicionando ${location} aos favoritos`);
    }

    function windIcon(windDirection:string){
        const direction = windDirection.slice(0, 2).toUpperCase(); //Pegando somente as duas primeiras letras da direção por causa da limitação dos icones.
        console.log(direction);
        switch (direction) {
            case 'NN':
            case 'N':             
                return <WiDirectionUp size={72} />;
            case 'NE':
              return <WiDirectionUpRight size={72}/>;
            case 'E':
              return <WiDirectionRight size={72}/>;
            case 'SE':
              return <WiDirectionDownRight size={72}/>;
            case 'SS':
            case 'S':
              return <WiDirectionDown size={72}/>;
            case 'SW':
              return <WiDirectionDownLeft size={72}/>;
            case 'W':
              return <WiDirectionLeft size={72}/>;
            case 'NW':
              return <WiDirectionUpLeft size={72}/>;
            default:
              return null; // Caso não seja uma direção válida
          }
    }

    function getWeatherIcon(description:string) {
        const desc = description.toLowerCase();
      
        switch (desc) {
          case 'clear':
          case 'sunny':
            return <WiDaySunny size={42}/>;
          case 'partly cloudy':
            return <WiDayCloudy size={42}/>;
          case 'overcast':
            return <WiCloud size={42}/>;
          case 'haze':
            return <WiDayHaze size={42}/>;
          case 'moderate rain':
          case 'light rain':
            return <WiRain size={42}/>;
          case 'patchy rain nearby':
          case 'light rain shower':
            return <WiDayShowers size={42}/>;
          case 'mist':
            return <WiFog size={42}/>;
          default:
            return null; // Para condições não cobertas
        }
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
            {weatherData && 
                <div className='wf_content'>
                    <div className='wf_content__location'>
                        <div>
                            <h3 className='wf_content__location_title'>{weatherData?.request?.query}</h3>
                            <p className='wf_content__location_weather_description'>{weatherData?.current?.weather_descriptions}</p>
                        </div>
                        {getWeatherIcon(weatherData?.current?.weather_descriptions[0])}                    
                    </div>
                    <div className='wf_content__weather_info'>
                        <div className='wf_content__weather_card'>
                            <div className='wf_content__weather_card_wrap'>
                                <WiThermometer size={72}/>
                                <p className='weather_card__text'>
                                    {weatherData?.current?.temperature}°C
                                </p>
                            </div>
                            <p className='info_text'>Temperatura</p>
                        </div>
                        <div className='wf_content__weather_card'>
                            <div className='wf_content__weather_card_wrap'>
                                <WiHumidity size={72}/>
                                <p className='weather_card__text'>
                                    {weatherData?.current?.humidity}
                                </p>
                            </div>
                            <p className='info_text'>Umidade</p>
                        </div>
                        <div className='wf_content__weather_card'>
                            <div className='wf_content__weather_card_wrap'>
                                <WiThermometerExterior size={72}/>
                                <p className='weather_card__text'>
                                    {weatherData?.current?.feelslike}°C
                                </p>
                            </div>                            
                            <p className='info_text'>Sensação térmica</p>
                        </div>
                        <div className='wf_content__weather_card'>
                            <div className='wf_content__weather_card_wrap'>
                                <WiRaindrops size={72}/>
                                <p className='weather_card__text'>
                                    {weatherData?.current?.precip} <small className='text-muted'>mm</small>
                                </p>
                            </div>   
                            <p className='info_text'>Precipitaçao</p>
                        </div>
                        <div className='wf_content__weather_card'>
                            {windIcon(weatherData?.current?.wind_dir)}
                            <p className='info_text'>Direção do vento</p>
                        </div>
                        <div className='wf_content__weather_card'>
                            <p className='weather_card__text'>
                                {weatherData?.current?.wind_speed} <small className='text-muted'>km/h</small></p>
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
