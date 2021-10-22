import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";
import $ from "jquery";
import ProductBuy from './ProductBuy'
import ProductPic from './ProductPic'
import '../../css/Product.css'
import '../../css/Product/ProductInside.css'
import '../../css/reset.css'
import '../../js/productinside'

let flag = 0;
function shipping(){
    $(document).ready(function(){
        let plus = $('.shippingPlus');
        let minus = $('.shippingMinus');
            $('.shippingDetails').slideToggle();
            flag === 0 ? plus.css("display", "none") : plus.css("display", "block");
            flag === 0 ? minus.css("display", "block") : minus.css("display", "none");
            flag === 0 ? flag = 1 : flag = 0; 
    });
}

function shippingPlus(){
    $(document).ready(function(){
        let plus = $('.shippingPlus');
        let minus = $('.shippingMinus');
            $('.shippingDetails').slideToggle();
            flag === 0 ? plus.css("display", "none") : plus.css("display", "block");
            flag === 0 ? minus.css("display", "block") : minus.css("display", "none");
            flag === 0 ? flag = 1 : flag = 0; 
    });
}

function shippingMinus(){
    $(document).ready(function(){
        let plus = $('.shippingPlus');
        let minus = $('.shippingMinus');
            $('.shippingDetails').slideToggle();
            flag === 0 ? plus.css("display", "none") : plus.css("display", "block");
            flag === 0 ? minus.css("display", "block") : minus.css("display", "none");
            flag === 0 ? flag = 1 : flag = 0; 
    });
}



export default function ProductInside(props) {
    let { productId } = useParams();
    const [products, setProducts] = useState([]);
    // const [product, setProduct] = useState(cart)
    const [cart, setCart] = useState(props.location.productProps.cart)
    console.log(props.location.productProps)

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/products/id/${productId}`).then((data) => {
          console.log(data.data[0])
          setProducts({
              productName: data.data[0].productName,
              productPrice: data.data[0].productPrice,
              productDescription: data.data[0].productDescription,
              productId: data.data[0].productId,
              productPic: data.data[0].productImg1,
          });
          sizeDisable();
          ass();
        });
    }, [productId]);

    function sizeDisable(){
      console.log('disafuck')
      let Name = $('.productsInsideTitleh1')[0].innerText;
      console.log(Name)
      if(Name.substring(Name.length - 1) == '裝'){
        $('.productsBuyNumSize option')[0].selected = true;
        $('.productsBuyNumSize option')[0].disabled = false;
        $('.productsBuyNumSize option')[1].disabled = false;
        $('.productsBuyNumSize option')[2].disabled = false;
        $('.productsBuyNumSize option')[3].disabled = false;
        $('.productsBuyNumSize option')[4].disabled = true;
      }else if(Name.substring(Name.length - 1) == '衣'){
        $('.productsBuyNumSize option')[0].selected = true;
        $('.productsBuyNumSize option')[0].disabled = false;
        $('.productsBuyNumSize option')[1].disabled = false;
        $('.productsBuyNumSize option')[2].disabled = false;
        $('.productsBuyNumSize option')[3].disabled = false;
        $('.productsBuyNumSize option')[4].disabled = true;
      }else if(Name.substring(Name.length - 1) == 'P'){
        $('.productsBuyNumSize option')[0].disabled = true;
        $('.productsBuyNumSize option')[1].disabled = true;
        $('.productsBuyNumSize option')[2].disabled = true;
        $('.productsBuyNumSize option')[3].disabled = true;
        $('.productsBuyNumSize option')[4].selected = true;
        $('.productsBuyNumSize option')[4].disabled = false;
      }else if(Name.substring(Name.length - 1) == '板'){
        $('.productsBuyNumSize option')[0].disabled = true;
        $('.productsBuyNumSize option')[1].disabled = true;
        $('.productsBuyNumSize option')[2].disabled = true;
        $('.productsBuyNumSize option')[3].disabled = true;
        $('.productsBuyNumSize option')[4].selected = true;
        $('.productsBuyNumSize option')[4].disabled = false;
      }else if(Name.substring(Name.length - 1) == '乳'){
        $('.productsBuyNumSize option')[0].disabled = true;
        $('.productsBuyNumSize option')[1].disabled = true;
        $('.productsBuyNumSize option')[2].disabled = true;
        $('.productsBuyNumSize option')[3].disabled = true;
        $('.productsBuyNumSize option')[4].selected = true;
        $('.productsBuyNumSize option')[4].disabled = false;
      }else if(Name.substring(Name.length - 1) == '吋'){
        $('.productsBuyNumSize option')[0].disabled = true;
        $('.productsBuyNumSize option')[1].disabled = true;
        $('.productsBuyNumSize option')[2].disabled = true;
        $('.productsBuyNumSize option')[3].disabled = true;
        $('.productsBuyNumSize option')[4].selected = true;
        $('.productsBuyNumSize option')[4].disabled = false;
      }
    }

    const deleteCart = (val) => {
        setCart(cart.filter((x) => x != val).reverse())
    }
    
    flag = 0;
    function fuck(){
      console.log(products.productPic)
        if(flag == 0){
            flag += 1;
        }else{
            cart.reverse();
            setCart([...cart, 
            { title: $(".productsInsideTitleh1")[0].innerText, 
              price: $(".productsInsideTitlePrice")[0].innerText,
              size: $('.productsBuyNumSize')[0].value,
              qty: $('.productsBuyNumQuantity')[0].value,
              id: $('.productsBuyId')[0].innerHTML,
              pic: `${products.productPic}`,
            }]);
            $(".cartItemProductsText").html($(".productsInsideTitleh1").innerText);
            flag += 1;
        }
    
        $(document).ready(function(){
            $('.addToCart').on('click',function(){
                console.log('shit')
                $('.productsBuyCart').css("display","block");
                $('.productsCart').css("display","block");
                $('.cartItem').css("display","flex");
            })
            $('.cartExit').on('click',function(){
                $('.productsBuyCart').css("display","none");
            })
            $(window).scroll(function(){
                  let cartStickTop = 50 - $(window).scrollTop();
                  if($(window).scrollTop() <= 50){
                      $('.productsCart').css("top",cartStickTop);
                  }else{
                      $('.productsCart').css("top",0);
                  }
            })
        })
    }

    function ass(){
        console.log('ass')
        console.log($('.productsBuyId'))
    }

    return (
        <main className="productInsideMain">
            <div className="productsInside">
            <div className="productsInfo">
            <ProductPic  productId={productId}/>
            </div>
            <div className="productsInsideBuy">
                <div className="productsBuyContainer">
                  <div className="productsInsideBuyTitle">
                    {/* <p>Tag</p> */}
                    <h1 className="productsInsideTitleh1">{products.productName}</h1>
                    <span className="productsBuyId">{products.productId}</span>
                    <h3>NT$&nbsp;<span className="productsInsideTitlePrice">{products.productPrice}</span></h3>
                  </div>
                  <div className="productsInsideBuyNum">
                    <div>
                      <p>Size</p>
                      <select className="productsBuyNumSize">
                        <option value="L" disabled>L</option>
                        <option value="M" disabled>M</option>
                        <option value="S" disabled>S</option>
                        <option value="XS" disabled>XS</option>
                        <option value="F" disabled>F</option>
                      </select>
                    </div>
                    <div>
                      <p>Quantity</p>
                      <select className="productsBuyNumQuantity">
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
                      <p className="productsBuyNumSold">SOLD OUT</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                        fuck();
                      }}
                    className="addToCart"
                    >Add to cart
                  </button>
                  <div 
                    onClick={shipping}
                    className="productsShipping">
                    <div className="shipping">Shipping</div>
                    <div className="shippingPlus">+</div>
                    <div className="shippingMinus">-</div>
                  </div>
                  <ul className="shippingDetails">
                    <li>Japan、Korea、Singapore</li>
                    <li>
                      Malaysia、Thailand、Vietnam、Philippines、Indonesia、Myanmar、Brunei、Cambodia
                    </li>
                    <li>United States、Canada</li>
                    <li>Australia、New Zealand、India</li>
                    <li>
                      Germany、France、United Kingdom、Spain、Czech
                      Republic、Sweden、Italy、Portugal、Greece、Netherlands、Switzerland、Romania
                      、Denmark、Norway
                      、Finland、Austria、Belgium、Hungary、Ireland、Monaco、Poland、Cyprus
                    </li>
                    <li>順豐快遞（運費到付）中國、香港、澳門</li>
                    <li>7-11 取貨不付款 (C2C)</li>
                  </ul>
                </div>
            </div>
            <div className="productsDetails">
                <div className="productsDesc">
                    <h2>Description</h2>
                    <p>
                        {products.productDescription}
                    </p>
                </div>
                {/* <div className="productsSpec">
                    <h2>Specification</h2>
                    <ul>
                      <li>L : Lorem ipsum dolor sit amet.</li>
                      <li>M : Lorem ipsum dolor sit amet.</li>
                      <li>S : Lorem ipsum dolor sit amet.</li>
                      <li>XS : Lorem ipsum dolor sit amet.</li>
                    </ul>
                </div> */}
            </div>
        </div>

        <div className="productsBuyCart">
            <div className="productsCart">
                <div className="productsInsideCartTitle">
                    <p>Shopping Cart</p> 
                    <span className="cartExit" onClick={ass}>x</span>
                </div>
                {cart.reverse().map((val) => {
                return (
                  <div className="cartItem">
                    <div className="cartItemPic">
                      <img src={`/img/${val.pic}`} />
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

        <div className="productsInsidePage">
            <Link to={{
                        pathname:"/marian/product",
                        productProps: {cart},
                      }} >Back to list</Link>
        </div>
        
        </main>
    )
}
