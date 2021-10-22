import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import $ from "jquery";
import ProductItem from "./Products/ProductItem";
import "../css/Product.css";
import "../css/reset.css";
import "../js/productcart";
import product1 from "../img/c01.jpg";
import product2 from "../img/c02.jpg";
import product3 from "../img/c06.jpeg";

export default function Product(props) {
  const [productList, setProductList] = useState([]);
  let history = useHistory();
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState(props.location.productProps == undefined ? []: props.location.productProps.cart);
  const product = [];
  const newList = [];


  useEffect(() => {
    Axios.get("http://localhost:8000/api/products").then((data) => {
      console.log(data.data);
      // setProductList(data.data);
      for(let i = 0; i < data.data.length; i++){
        // console.log(productList[i].productStyleNumber)
        if(product.indexOf(data.data[i].productStyleNumber) == -1){
          product.push(data.data[i].productStyleNumber)
          newList.push(data.data[i])
        }
      }
      setProductList(newList)
    });
  }, []);

  function selectArray(){
    for(let i = 0; i < productList.length; i++){
      // console.log(productList[i].productStyleNumber)
      if(product.indexOf(productList[i].productStyleNumber) == -1){
        product.push(productList[i].productStyleNumber)
        newList.push(productList[i])
      }
      console.log(product)
    }
  }

   function addcart(){
    cart.reverse();
    setCart([...cart, 
    { title: $(".productsBuyTitleh3")[0].innerText, 
      price: $(".productsBuyTitlePrice")[0].innerText,
      size: $('.selectSize')[0].value,
      qty: $('.selectQty')[0].value,
      id: $('.productsBuyId')[0].outerText,
      pic:$('.productsBuyPic')[0].children[0].alt,
    }]);
    console.log($('.productsBuyPic')[0].children[0].alt)
    console.log($('.productsBuyPic')[0].innerHTML)
    $(".cartItemProductsText").html($(".productsBuyTitleh3").innerText);

    localStorage["cart"] = JSON.stringify(cart);
  };

  const deleteCart = (val) => {
    console.log(cart[0])
    console.log(val)
    setCart(cart.filter((x) => x != val).reverse())

    localStorage["cart"] = JSON.stringify(cart);
  }

  function shit(Id, Name, Price) {
    console.log($('.selectSize option')[0].disabled);
    $(".productsBuyTitleh3").html(Name);
    $(".productsBuyTitlePrice").html(Price);
    $(".productsBuyId").html(Id);

    console.log(Name.substring(Name.length - 1))
    if(Name.substring(Name.length - 1) == '裝'){
      $('.selectSize option')[0].selected = true;
      $('.selectSize option')[0].disabled = false;
      $('.selectSize option')[1].disabled = false;
      $('.selectSize option')[2].disabled = false;
      $('.selectSize option')[3].disabled = false;
      $('.selectSize option')[4].disabled = true;
    }else if(Name.substring(Name.length - 1) == 'P'){
      $('.selectSize option')[0].disabled = true;
      $('.selectSize option')[1].disabled = true;
      $('.selectSize option')[2].disabled = true;
      $('.selectSize option')[3].disabled = true;
      $('.selectSize option')[4].selected = true;
      $('.selectSize option')[4].disabled = false;
    }else if(Name.substring(Name.length - 1) == '板'){
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

  function ass(){
    console.log('ass')
    console.log(localStorage.getItem("memberId"))
  }

  return (
    <React.Fragment>
      <div id="welcomeC">
        <div id="welcomecInner">
          <div className="welcomecCont">
            <h2>All Products</h2>
          </div>
          <div className="wCarousel">
            <div className="slide">
              <img src={product1} alt="" />
            </div>
            <div className="slide">
              <img src={product2} alt="" />
            </div>
            <div className="slide">
              <img src={product3} alt="" />
            </div>
          </div>
        </div>
      </div>

      <main className="productMain">
        <div className="products">
          <div className="productsSection">
            <ProductItem 
             newList ={newList}
              productList={productList} 
              cart={cart} 
              setProductList={setProductList}/>
            {/* {productList.map((val) => {
              return (
                <React.Fragment >
                  <div className="productsItem">
                    <div className="productsItemPic">
                      <Link to={{
                        pathname:`/marian/productinside/${val.productId}`,
                        productProps: {cart},
                        setProductList:{setProductList}
                      }} >
                        <img
                          src={`https://picsum.photos/200/280/?random=${val.productId}`}
                        />
                      </Link>
                      <i
                        onClick={() => {
                          shit(
                            val.productId,
                            val.productName,
                            val.productPrice
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
            })} */}
          </div>

          <div className="productsBuy" id="productsBuy">
            <div className="productsBuyItem" id="productsBuyItem">
              <div className="productsBuyPic">
              {/* `/img/${productList[productList.productId].productImg1}` */}
                {/* <img className="productsBuyPicture" /> */}
              </div>
              <div className="productsBuyTitle">
                <h3 className="productsBuyTitleh3"></h3> <span className="productsBuyId"></span>
                <p>
                  NT$&nbsp;<span className="productsBuyTitlePrice"></span>
                </p>
              </div>
              <div className="productsBuyNum">
                <div>
                  <p>Size</p>
                  <select className="selectSize">
                    <option value="L" disabled>L</option>
                    <option value="M" disabled>M</option>
                    <option value="S" disabled>S</option>
                    <option value="XS" disabled>XS</option>
                    <option value="F" disabled>F</option>
                  </select>
                </div>
                <div>
                  <p>Quantity</p>
                  <select className="selectQty">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    addcart();
                  }}
                  className="addToCart"
                >
                  Add to cart
                </button>
              </div>
              <div className="productsBuyClose">x</div>
            </div>
            <div className="productsCart">
              <div className="productsCartTitle">
                <p>Shopping Cart</p> <span className="cartExit">x</span>
              </div>

              {cart.reverse().map((val) => {
                return (
                  <div className="cartItem">
                    <div className="cartItemPic">
                      <img src={`/img/${val.pic}`} alt={val.pic}/>
                    </div>
                    <div className="cartItemProducts">
                      <p className="cartItemProductsText">{val.title}</p>
                      <div 
                        className="cartItemProductsDelete"
                        onClick={() => deleteCart(val)}
                      >x</div>
                      <p>{val.size}</p>
                      <p>{val.qty} x NT${val.price}</p>
                      <p>NT${val.qty * val.price}</p>
                    </div>
                  </div>
                );
              })}

              <div className="checkoutBtn">
                <Link to={{
                        pathname:'/marian/cart',
                        productProps: {cart},
                      }} 
                      >
                Order Checkout</Link>
              </div>
            </div>
          </div>

          {/* <div className="productsFooter">
            <div className="productsPagePrev">Prev</div>
            <div className="productsPage">
              <a href="#" className="productsPageNum">
                1
              </a>
              <a href="#" className="productsPageNum">
                2
              </a>
              <a href="#" className="productsPageNum">
                3
              </a>
              <a href="#" className="productsPageNum">
                ...
              </a>
              <a href="#" className="productsPageNum">
                7
              </a>
            </div>
            <div className="productsPageNext" onClick={ass}>Next</div>
          </div> */}
        </div>
      </main>
    </React.Fragment>
  );
}
