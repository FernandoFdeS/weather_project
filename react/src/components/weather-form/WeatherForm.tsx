import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import React from 'react'


interface WeatherFormProps {
    cep: string;
    location: string;
    setCep: React.Dispatch<React.SetStateAction<string>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    fetchWeather: () => void;
    fetchLocation: () => void;
}

const WeatherForm = ({cep,location,setCep,setLocation,fetchWeather,fetchLocation}:WeatherFormProps) => {
    
    function handleFindWeather(e:React.MouseEvent) {
        e.preventDefault();
        fetchWeather();
    }

    function handleCep(){
        if(cep!=''){ // Melhorar isso com uma validação do cep
            fetchLocation();
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
                            className='form-control'
                            id='cep'
                            name='cep'
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
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
                            className='form-control'
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