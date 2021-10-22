import React from 'react'
// import { useEffect} from "react"
import{ useState, useEffect, useCallback } from "react";
import Axios from "axios";


import Aos from 'aos'
import "aos/dist/aos.css"
import Material from './Material'
import NewsSwiper from './NewsSwiper'

import "../css/Home.css"
import {Link} from "react-router-dom"
import slide01 from '../img/B04.jpg' 
import slide02 from '../img/b10.jpeg' 
import slide03 from '../img/b05.jpeg' 

import Animation from './Animation'


// import mat01 from '../img/m04.jpg'
// import mat02 from '../img/m102.jpg'
// import mat03 from '../img/m201.jpg'

// import new01 from '../img/we06.jpg'
// import new02 from '../img/we07.jpg'
// import new03 from '../img/出荷業務休止インフォメーション.jpeg'
// import new04 from '../img/we07.jpg'
// import new05 from '../img/we06.jpg'
// import new06 from '../img/we06.jpg'

// import { Swiper, SwiperSlide } from 'swiper/react';


// import p01 from '../img/p12.jpg'
// import p02 from '../img/p07.jpg'
// import p03 from '../img/p10.jpg'
// import p04 from '../img/p05.jpg'
// import p05 from '../img/p11.jpg'
// import p06 from '../img/p08.jpg'

import sns01 from '../img/sns01.jpg'
import sns02 from '../img/sns02.jpg'
import sns03 from '../img/sns03.jpg'
import "../js/home";



export default function Home() {
    const [productLatest, setProductLatest] = useState([]);
    const[p01,setP01]=useState();
    const[p02,setP02]=useState();
    const[p03,setP03]=useState();
    const[p04,setP04]=useState();
    const[p05,setP05]=useState();
    const[p06,setP06]=useState();



    useEffect(() => {
        Axios.get("http://localhost:8000/api/products").then((data) => {
            console.log("apple");
            console.log(data.data);
            setProductLatest(data.data);
            setP01(data.data[2].productImg1);
            setP02(data.data[15].productImg1);
            setP03(data.data[0].productImg1);
            setP04(data.data[1].productImg1);
            setP05(data.data[11].productImg1);
            setP06(data.data[11].productImg4);

            // productLa=(data.data[0].productImg1);
        //   console.log(productLatest[0].productImg1)
        });
      }, []);
    
    


      console.log(productLatest)

    useEffect(() => {
        Aos.init({duration:2000});
    },[]);
    // function myFunction(){
    //     let newNum=((e.pageX - { windowWidth: window.innerWidth }/2)/({ windowWidth: window.innerWidth }/2));
    //     let newNum2=((e.pageY - { windowWidth:  window.innerWidth }/2)/({ windowWidth: window.innerWidth }/2));
    //     // document.querySelector('.conceptBg').style.transform=`translate(${-50 - (newNum*10)}%,${-50 - (newNum2*10)}%)`
        
    //     const changeDOM = document.getElementById('conceptBg');
    //     changeDOM.style.transform=`translateX(${50 - (newNum*10)}%)`;
    //     changeDOM.style.transform=`translateY(${50 - (newNum2*10)}%)`;
    
    //     // changeDOM.style.transform=`translate(${-50 - (newNum*10)}%,${-50 - (newNum2*10)}%)`;
    //     // document.querySelector('conceptBg').style.transform='translate(2%,2%)';
    
    //     // document.querySelector('conceptBg').style.transform='translate(2%,2%)';
    
    //     }
    return (

    
        <React.Fragment>
             <Animation />
    <article>
        <section id="cover" class="main">
            <div class="main_img-container">
                <div>
                    <img class="main_img" src={slide01} alt=""/>
                </div>
                <div>
                    <img class="main_img " src={slide02} alt=""/>
                </div>
                <div>
                    <img class="main_img " src={slide03} alt=""/>
                </div> 
                <div>
                    <img class="main_img "src={slide01}  alt=""/>
                </div>
                <div>
                    <img class="main_img " src={slide02} alt=""/>
                </div>  
            </div>
        </section>
         <section id="concept" data-aos="fade-up">
            <div id="conceptInner">
                 <div class="conceptTxt"> 
                     <span>CONCEPT</span>
                 </div>
                 <div class="conceptF">
                    <div id="conceptImg" class="conceptImg"></div>
                    <div  id="conceptBg" className="conceptBg"></div>
                    <div class="conceptLine">
                        <span>Less</span><br/>
                        <span>is</span><br/>
                        <span>More</span><br/>
                    </div>
                 </div>
            </div>
            <div class="conceptContent">
               <div  data-aos="fade-up" >
                   <h1>Brand Concept</h1>
                   <p >Marian, Mar,represent the ocean,Marian
                        also means the preciousness of origin, Whales are associated with compassion and solitude, 
                       and knowledge of both life and death. remind us the sustainable environmental protection.
                   </p>
               </div>
           </div>
            <div class="btnContainer"> 
                <div class="btnMore btnCenter">
                     <span>Read&nbsp;More</span>
                     <div  class="btn">
                         <Link to="/marian/product"></Link>
                     </div>
                 </div>
             </div> 
         </section>
         <Material/>
        <section id="news">
            <div id="newsInner" class="newsInner">
                <div data-aos="fade-right" data-aos-duration="1500" class="newsTxt"> 
                    <span>NEWS</span>
                </div>
            </div>
            <NewsSwiper/>
            <div class="btnContainer"> 
                <div class="btnMore btnCenter">
                     <span>Read&nbsp;More</span>
                     <div  class="btn">
                         <Link to="/marian/product"></Link>
                     </div>
                 </div>
             </div> 
        </section>
        <section id="product" >
            <div class="productInner">
                <div data-aos="fade-up" data-aos-duration="1500"  class="productTxt"> 
                    <span>PRODUCT</span>
                    <span></span> 
                </div>
                <div class="productImgC">
                    <div class="item">
                        <p>Marian. </p>
                    </div>
                    <div class="item">
                        <a href="">
                            <div>
                                <img src={`/Img/${p01}`} alt=""/>
                            </div>
                        </a>
                    </div>
                    <div class="item">
                        <a href="">
                            <div>
                                <img src={`/Img/${p02}`} alt=""/>
                            </div>
                        </a>
                    </div>
                    <div class="item">
                       
                        <a href="">
                            <div>
                                <img src={`/Img/${p03}`} alt=""/>
                            </div>
                        </a>
                    </div>
                    <div class="item">
                        <a href="">
                            <div>
                                <img src={`/Img/${p04}`} alt=""/>
                            </div>
                        </a>
                    </div>
                    <div class="item">
                        <p>Nature all around you.</p>
                     
                    </div>
                    <div class="item">
                        <a href="">
                            <div>
                                <img src={`/Img/${p05}`} alt=""/>
                            </div>
                        </a>
                    </div>
                    <div class="item">
                      
                        <a href="">
                            <div>
                                <img src={`/Img/${p06}`} alt=""/>
                            </div>
                        </a>
                    </div>
                    <div  class="item btnMore" >
                        <div  class="btnMore">
                            <span>Read&nbsp;More</span>
                            <div  class="btn">
                                <a href="../html/project.html"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
       <section id="sns" >
            <div    class="snsInner">
                <div  data-aos="fade-up" data-aos-duration="1500"   class="snsTxt"> 
                    <span>REVIEWS</span>
                </div> 
                <div class="snsContianer"  data-aos="fade"  >
                   <div  class="snsCard">
                       <div>
                           <img src={sns01} alt=""/>
                       </div>
                       <h2>Sunscreen Oil</h2>
                       <p>
                            An ultra-hydrating sunscreen oil that leaves skin glowing without ever feeling greasy. 
                            This lightweight body oil is water-resistant and made with an antioxidant-rich formula for superior sun protection.
                            Give your skin a brilliant glow, and diminish signs of UV damage, all in one.I'm really love it!
                       </p>
                       <h3>Cora Zhan</h3>
                   </div>
                   <div  class="snsCard">
                        <div>
                            <img src={sns02} alt=""/>
                        </div>
                        <h2>wooden surfboard</h2>
                        <p>
                            I was almost discouraged from buying from all the people saying it was small.
                            Like this lady that was like "I can't cut a pineapple in it!" Well lady you should've gotten the big one.
                            This is for a dorm apparment and it's totally useful to cut the usual like tomatoes and onions.
                        </p>
                        <h3>Sally Wang</h3>
                    </div>
                    <div  class="snsCard">
                        <div>
                            <img src={sns03} alt=""/>
                        </div>
                        <h2>beach pants</h2>
                        <p>
                        Giving 4 stars because super cute and colors are so vibrant. 
                        However does run a size to small. Should of read the reviews. Returning for 1 size up. My son is 16 months 23 pounds and almost always wears 2t but these where a tiny bit to small. 3t should work. 
                        Also getting different print because SURF is spelled serf.
                        </p>
                        <h3>Mike Lin</h3>
                    </div>
                </div>
                {/* <div class="btnMore">
                    <span>Read&nbsp;More</span>
                    <div  class="btn">
                        <a href="../html/project.html"></a>
                    </div>
                </div> */}
            </div>
        </section>
    </article>    
    
     </React.Fragment>
    )
}

