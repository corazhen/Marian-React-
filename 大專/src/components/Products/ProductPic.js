import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import { Carousel } from 'react-carousel-minimal';
import '../../css/Product/ProductInside.css'

export default function ProductPic(props) {
  const {
    productId,
  } = props

  const [pic1, setPic1] = useState();
  const [pic2, setPic2] = useState();
  const [pic3, setPic3] = useState();
  const [pic4, setPic4] = useState();
  const [pic5, setPic5] = useState();

  console.log(`propic:${productId} `)

  useEffect(()=>{
    getPic();
  },[])

  async function getPic(){
    await Axios.get(`http://localhost:8000/api/products/id/${productId}`).then((data)=>{
      setPic1(data.data[0].productImg1)
      setPic2(data.data[0].productImg2)
      setPic3(data.data[0].productImg3)
      setPic4(data.data[0].productImg4)
      setPic5(data.data[0].productImg5)
    })
  }

    const data = [
        {
          image: `/img/${pic1}`,
        },
        {
           image: `/img/${pic2}`,
        },
        {
           image: `/img/${pic3}`,
        },
        {
           image: `/img/${pic4}`,
        },
        {
           image: `/img/${pic5}`,
        },
      ];
    
      const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
      }
      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
      }
      return (
        <div className="App" style={{width:'100%', display:'flex', justifyContent:'center'}}>
          <div style={{ textAlign: "center" }}>
            <div style={{
              padding: "0"
            }}>
              <Carousel
                data={data}
                time={2000}
                width="500px"
                height="500px"
                captionStyle={captionStyle}
                radius="10px"
                slideNumber={true}
                slideNumberStyle={slideNumberStyle}
                captionPosition="bottom"
                automatic={false}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"
                slideBackgroundColor="darkgrey"
                slideImageFit="cover"
                thumbnails={true}
                thumbnailWidth="100px"
                style={{
                  textAlign: "center",
                  maxWidth: "850px",
                  maxHeight: "500px",
                  margin: "40px auto",
                }}
              />
            </div>
          </div>
        </div>
      );
}
