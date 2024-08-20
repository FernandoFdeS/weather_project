

const WeatherInfoSkeleton = () => {

   

    return (
        <div className='wf_content'>
            <div className='wf_content__location d-flex flex-column'>
                <div className="wf_card_title_skeleton pulse">
                </div>
                <div className="wf_card_description_skeleton mt-1 pulse"></div>
            </div>
            <div className='wf_content__weather_info'>
                <div className="wf_content__weather_card_skeleton pulse"></div>
                <div className="wf_content__weather_card_skeleton pulse"></div>
                <div className="wf_content__weather_card_skeleton pulse"></div>
                <div className="wf_content__weather_card_skeleton pulse"></div>
                <div className="wf_content__weather_card_skeleton pulse"></div>
                <div className="wf_content__weather_card_skeleton pulse"></div>
            </div>
            <div>
                <button className='button add_fav_button pulse' style={{height:'57px'}}>
                </button>
            </div>
        </div>
  )
}

export default WeatherInfoSkeleton