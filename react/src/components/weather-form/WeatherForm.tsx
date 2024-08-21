import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import React, { useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import axiosClient from '../../axios';


interface WeatherFormProps {
    cep: string;
    location: string;
    weatherData: any;
    setCep: React.Dispatch<React.SetStateAction<string>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    setWeatherData: React.Dispatch<React.SetStateAction<any>>;
    setIsLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
    setShouldShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeatherForm = ({cep,location,setCep,setLocation,setWeatherData,setIsLoadingData,setShouldShowInfo}:WeatherFormProps) => {
    const [isCepInvalid, setIsCepInvalid] = useState<boolean>(false);
    const [isLocationInvalid, setIsLocationInvalid] = useState<boolean>(false);

    const isValidCep = (cep: string): boolean => {
        const regex = /^([0-9]{5}-[0-9]{3}|[0-9]{8})$/;
        return regex.test(cep);
    };

    function fetchWeatherFromLocation(){
        const apiKey = import.meta.env.VITE_REACT_APP_WEATHERSTACK_API_KEY ;
        const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;
        setWeatherData(null);
        setIsLoadingData(true);
        setShouldShowInfo(false);

        axiosClient.get(url)
        .then(({data})=>{
            console.log(data);
            if(data.success!=false){
                setIsLocationInvalid(false);
                setWeatherData(data);
                setShouldShowInfo(true);
            }else{
                setShouldShowInfo(false);
                setIsLocationInvalid(true);
                toast.error('Cidade não encontrada.', {
                    position: "bottom-right",
                    autoClose: 3000,
                    pauseOnHover: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });   
            }
        }).catch((error)=>{
            setShouldShowInfo(false);
            console.log(error);
        }).finally(()=>{
            setIsLoadingData(false);
        });
    }

    function fetchLocationFromCep(){
        axiosClient.get(`https://viacep.com.br/ws/${cep}/json`)
            .then(({data})=>{
                console.log(data);
                if(data.localidade){
                    setLocation(data.localidade);
                    setIsLocationInvalid(false);                
                }else{
                    setIsCepInvalid(true); 
                    toast.error('CEP não encontrado.', {
                        position: "bottom-right",
                        autoClose: 3000,
                        pauseOnHover: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });               
                }
            }).catch((error)=>{
                console.log(error);
            });
    }     

    function handleFindWeather(e:React.MouseEvent) {
        e.preventDefault();
        fetchWeatherFromLocation();
    }

    function handleCepChange(e:React.ChangeEvent<HTMLInputElement>){
        setCep(e.target.value);
        setIsCepInvalid(false);
    }
    
    function handleBlur(){
        setCep('');
    }

    function handleCep(){
        if(isValidCep(cep)){ 
            fetchLocationFromCep();
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
                            onBlur={handleBlur}
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