import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'

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

    //console.log(import.meta.env.VITE_REACT_APP_WEATHERSTACK_API_KEY);

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
        </div>
    )
}

export default WeatherFinder
