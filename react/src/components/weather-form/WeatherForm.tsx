import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import React, { ChangeEvent, useState } from 'react'


interface WeatherFormProps {
    cep: string;
    location: string;
    isCepInvalid:boolean;
    isLocationInvalid:boolean;
    setCep: React.Dispatch<React.SetStateAction<string>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    setIsCepInvalid: React.Dispatch<React.SetStateAction<boolean>>;
    fetchWeather: () => void;
    fetchLocation: () => void;
}

const WeatherForm = ({cep,location,isCepInvalid,isLocationInvalid,setCep,setLocation,fetchWeather,setIsCepInvalid,fetchLocation}:WeatherFormProps) => {

    function handleFindWeather(e:React.MouseEvent) {
        e.preventDefault();
        fetchWeather();
    }

    function handleCepChange(e:React.ChangeEvent<HTMLInputElement>){
        setCep(e.target.value);
        setIsCepInvalid(false);
    }

    const isValidCep = (cep: string): boolean => {
        const regex = /^([0-9]{5}-[0-9]{3}|[0-9]{8})$/;
        return regex.test(cep);
    };
    

    function handleCep(){
        console.log(cep);
        if(isValidCep(cep)){ 
            fetchLocation();
        }else{
            setIsCepInvalid(true);
        }
    }

    return (
        <div className='wf_form'>
            <form className='row g-2 p-2 pb-0 align-content-center'>
                <div className='col-md-5 col-5'>
                    <div className='form-floating mb-3'>
                        <input
                            type='text'
                            placeholder='00000-000'
                            className={`form-control ${isCepInvalid ? 'is-invalid' : ''}`}
                            id='cep'
                            name='cep'
                            value={cep}
                            onChange={(e) => handleCepChange(e)}
                            onBlur={handleCep}
                        />
                        <label htmlFor='cep'>CEP</label>                       
                    </div>
                </div>
                <div className='col-md-5 col-5'>
                    <div className='form-floating mb-3'>
                        <input
                            type='text'
                            placeholder='Chapecó'
                            className={`form-control ${isLocationInvalid ? 'is-invalid' : ''}`}
                            id='location'
                            name='location'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <label htmlFor='location'>Cidade</label>
                    </div>
                </div>
                <div className='col-md-2 d-flex justify-content-end col-2 pt-1'>
                    <button
                        className='wf_form__button button'
                        onClick={handleFindWeather}
                        disabled={location === ''}>
                        <MagnifyingGlassIcon />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default WeatherForm