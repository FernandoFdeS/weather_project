import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { TrashIcon } from '@heroicons/react/20/solid';
import React from 'react'
import axiosClient from '../../axios';
import { Bounce, toast } from 'react-toastify';

interface FavoriteItemProps {
    id: number;
    location: string;
    removeFavoriteFromArray: (id:number)=> void;
}

const FavoriteItem = ({id,location,removeFavoriteFromArray}:FavoriteItemProps) => {
    
    function handleDelete(e:React.MouseEvent){
        e.preventDefault();
        if(confirm('delete-message')){
            removeLocationFromFavorites();
        };
    }

    function removeLocationFromFavorites(){
        axiosClient.delete(`/locations/${id}`)
        .then(({data})=>{
            removeFavoriteFromArray(id);
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
        <div className='favorite_list__item col-12 mt-2'>
            <span> #{id} | {location}</span>
            <div className='favorite_list__item_buttons'>
                <button className='button'><MagnifyingGlassIcon width={18}/></button>
                <button onClick={(e)=>handleDelete(e)} className='del_button button'><TrashIcon width={18}/></button>
            </div>
        </div>
    )
}

export default FavoriteItem;