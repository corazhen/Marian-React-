import React, { useRef, useState } from "react";
import { useEffect } from "react";


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
 import new06 from "../img/we06.jpg";
// Import Swiper styles
import "../css/Swiper.css";
import'../css/Home.css';
import '../css/swiper/swiper-bundle.css';

import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";




// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper";

SwiperCore.use([Pagination, Navigation]);

function Fuck() {

    const [newsList,setNewsList]=useState([]);
    let history = useHistory();

    useEffect(() => {
        Axios.get("http://localhost:8000/api/news").then((data)=>{
            console.clear();    
            console.log(543);
            console.log(data.data[0]);
            setNewsList(data.data);
        })
     
    }, [])
    // const [postList, setPostList] = useState([]);
    // let history = useHistory();
  
    // useEffect(() => {
    //   Axios.get("http://localhost:8000/api/news").then((data) => {
    //     // console.log(data.data[2]);
    //     // console.log(data.data[2].newsTitle);
    //     setPostList(data.data);
    //   });
    // }, []);

  return (
    <>
  
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
  
        {newsList.map((val,key)=>{
            return(
        <SwiperSlide>

                <div class="swiper-slide ">
                {/* <a class="nThumbnail" href="">
                    <img src={new06} alt=""/>
                </a> */}
                 <div className="nThumbnail"
                    onClick={()=> history.push(`/marian/news/${val.newsId}`)}
                    >
                    <img src={`/Img/${val.newsCoverImg}`} alt={val.newsCoverImg}/>
                </div>
                {/* <a class="ntxtName">
                    <span>Vol.02 【Toorak River.】</span>
                </a> */}
                <div class="ntxtName">
                    <span>{val.newsTitle}</span>
                </div>
                {/* <a class="ntxt">
                    <span>Xitun DistrictTaichung CityXitun DistrictTaichung City</span>
                </a> */}
                <div className="ntxt">
                    <span>{moment(val.newsDate).format('MMMM Do YYYY')}</span>
                </div>
                <div class="nHr"></div>
                {/* <div class="nBot">
                    <a  class="N-bot-a" href="">Read More
                    </a>
                    <div class="nSmall">
                        <a>Information</a>
                        <span>|</span>
                        <span>2021.7 up</span>
                    </div>
                </div> */}
            </div>
        </SwiperSlide>
             )

        })}
            
           
      </Swiper>
    </>
  );
}

export default Fuck;
