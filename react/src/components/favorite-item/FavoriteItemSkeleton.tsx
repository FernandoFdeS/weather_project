const FavoriteItemSkeleton = () => {
    
    return (
        <div className='favorite_list__item col-12 mt-2 pulse'>
            <span className="pulse span_skeleton"></span>
            <div className='favorite_list__item_buttons gap-2'>
                <button className='pulse button_skeleton'></button>
            </div>
        </div>
    )
}

export default FavoriteItemSkeleton;