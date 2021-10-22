import React, { useEffect, useState, useCallback } from "react";
import $ from "jquery";
import '../../css/font-awesome-4.7.0/css/font-awesome.css'
import '../../css/Product.css'
import '../../js/productcart'
import { Link } from "react-router-dom";

export default function ProductItem(props) {
  const{ productList, setProductList, cart} = props;

  function shit(Id, Name, Price,Img) {
    console.log(Id);
    $(".productsBuyTitleh3").html(Name);
    $(".productsBuyTitlePrice").html(Price);
    $(".productsBuyId").html(Id);
    $('.productsBuyPic').html(`<img src="/img/${Img}" alt=${Img}>`)

    console.log(Name)
    if(Name.substring(Name.length - 1) === '裝'){
      $('.selectSize option')[0].selected = true;
      $('.selectSize option')[0].disabled = false;
      $('.selectSize option')[1].disabled = false;
      $('.selectSize option')[2].disabled = false;
      $('.selectSize option')[3].disabled = false;
      $('.selectSize option')[4].disabled = true;
    }else if(Name.substring(Name.length - 1) === '衣'){
      $('.selectSize option')[0].selected = true;
      $('.selectSize option')[0].disabled = false;
      $('.selectSize option')[1].disabled = false;
      $('.selectSize option')[2].disabled = false;
      $('.selectSize option')[3].disabled = false;
      $('.selectSize option')[4].disabled = true;
    }else if(Name.substring(Name.length - 1) === 'P'){
      $('.selectSize option')[0].disabled = true;
      $('.selectSize option')[1].disabled = true;
      $('.selectSize option')[2].disabled = true;
      $('.selectSize option')[3].disabled = true;
      $('.selectSize option')[4].selected = true;
      $('.selectSize option')[4].disabled = false;
    }else if(Name.substring(Name.length - 1) === '板'){
      $('.selectSize option')[0].disabled = true;
      $('.selectSize option')[1].disabled = true;
      $('.selectSize option')[2].disabled = true;
      $('.selectSize option')[3].disabled = true;
      $('.selectSize option')[4].selected = true;
      $('.selectSize option')[4].disabled = false;
    }else if(Name.substring(Name.length - 1) == '乳'){
      $('.selectSize option')[0].disabled = true;
      $('.selectSize option')[1].disabled = true;
      $('.selectSize option')[2].disabled = true;
      $('.selectSize option')[3].disabled = true;
      $('.selectSize option')[4].selected = true;
      $('.selectSize option')[4].disabled = false;
    }else if(Name.substring(Name.length - 1) == '吋'){
      $('.selectSize option')[0].disabled = true;
      $('.selectSize option')[1].disabled = true;
      $('.selectSize option')[2].disabled = true;
      $('.selectSize option')[3].disabled = true;
      $('.selectSize option')[4].selected = true;
      $('.selectSize option')[4].disabled = false;
    }

    $(document).ready(function () {
      $(".fa-cart-plus").on("click", function () {
        $(".productsBuy").css("display", "flex");
        $(".productsBuyItem").css("display", "block");
      });
      $(".productsItemCart").on("click", function () {
        $(".productsBuy").css("display", "flex");
        $(".productsBuyItem").css("display", "block");
      });
      $(".productsBuyClose").on("click", function () {
        $(".productsBuy").css("display", "none");
        // $('.productsBuyPicture').append($('<img>',{src:``}))
      });
      $(".addToCart").on("click", function () {
        console.log("shit");
        $(".productsBuyItem").css("display", "none");
        $(".productsCart").css("display", "block");
        $(".cartItem").css("display", "flex");
      });
      $(".cartExit").on("click", function () {
        $(".productsCart").css("display", "none");
        $(".productsBuy").css("display", "none");
      });
      $(".cartCheckout").on("click", function () {
        setTimeout(function () {
          window.location.replace("/marian/member");
        }, 1000);
      });
      $(window).scroll(function () {
        let cartStickTop = 50 - $(window).scrollTop();
        if ($(window).scrollTop() <= 50) {
          $(".productsCart").css("top", cartStickTop);
        } else {
          $(".productsCart").css("top", 0);
        }
      });
    });
  }

    return (
       <React.Fragment>
         {productList.map((val) => {
              return (
                <React.Fragment >
                  <div className="productsItem">
                    <div className="productsItemPic">
                      <Link to={{
                        pathname:`/marian/productinside/${val.productId}`,
                        productProps: {cart},
                      }} >
                        <img
                          src={`/img/${val.productImg1}`}
                        />
                      </Link>
                      <i
                        onClick={() => {
                          shit(
                            val.productId,
                            val.productName,
                            val.productPrice,
                            val.productImg1
                          );
                        }}
                        id="productsItemCart"
                        className="fa fa-cart-plus fa-2x"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <h3>
                      <Link to={`/marian/productinside/${val.productId}`}>
                        {val.productName}
                      </Link>
                    </h3>
                    <p>NT{val.productPrice}</p>
                    <div className="productsItemCart">
                      <i
                        id="productsItemCart"
                        className="fa fa-cart-plus fa-2x"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
       </React.Fragment>
    )
}
