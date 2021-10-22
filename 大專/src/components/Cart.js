import React, { useEffect, useState, useCallback } from "react";
import $, { data } from "jquery";
import Axios from "axios";
import "../css/cart.css";

export default function Cart(props) {
  const [cartItem, setCartItem] = useState(props.location.productProps == undefined ? []: props.location.productProps.cart);
  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState([]);
  let flag = 0;
  const [member, setMember] = useState([]);

  function carReact() {
    $(document).ready(function () {
      $(".infoCartDetails").slideToggle();
      $(".infoCartOrder").slideToggle();

      //cart
      $(".cartInfoCheckout").on("click", function () {
        $(".cart").css("display", "none");
        $(".info").css("display", "flex");
        //change color for process 'Infos'
        $(".cartProcessItemInfo")
          .addClass("changeColorInfo")
          .css("background-color", "#f5dcaf");
      });

      //info
      $(".infoCartTitle").on("click", function () {
        $(".infoCartDetails").slideToggle();
        $(".infoCartOrder").slideToggle();
        $(".cartTitleArrow").toggleClass("cartTitleArrowRotate");
      });
      $(".cartExpends").on("click", function () {
        $(".infoCartDetails").slideToggle();
        $(".infoCartOrder").slideToggle();
        $(".cartTitleArrow").toggleClass("cartTitleArrowRotate");
      });
      $(".backToCart").on("click", function () {
        $(".cart").css("display", "flex");
        $(".info").css("display", "none");
      });
      $(".infoSend").on("click", function () {
        $(".info").css("display", "none");
        $(".order").css("display", "flex");
        $(".cartProcessItemConfirm")
          .addClass("changeColorConfirm")
          .css("background-color", "#f5dcaf");
      });

      //order
      $(".backToInfo").on("click", function () {
        $(".info").css("display", "flex");
        $(".order").css("display", "none");
      });
    });
  }

  useEffect(() => {
    carReact();
    const storedMemberId = localStorage.getItem("memberId") == "undefined" ? '' : localStorage.getItem("memberId") == null ? '' : JSON.parse(localStorage.getItem("memberId"))
    console.log(`ID:${storedMemberId}`)
    console.log(cartItem.length);

    if(storedMemberId == ''){

    }else{
      Axios.get(`http://localhost:8000/api//members/${storedMemberId}`).then((data) => {
        console.log(data.data[0]);
        setMember(data.data[0])
        console.log($('.orderInfoItemNames'))
      });
    }
    
  }, []);

  useEffect(()=>{
    Axios.get("http://localhost:8000/api/cart/order").then((data) => {
      // console.log(data.data);
      setOrderList(data.data)
    });
  },[flag]);

  const deleteCart = (val) => {
    setCartItem(cartItem.filter((x) => x != val));
  };

  let cost = 0;
  const total = () => {
    for (let i = 0; i < cartItem.length; i++) {
      console.log(cartItem[i].title);
      cost += cartItem[i].price * cartItem[i].qty;
    }
    return cost;
  };

  async function orderSend(){
    flag += 1;
    // console.log(orderList.length)
    for(let i=0; i< orderList.length; i++){
      if(orderList[i].customerName == $('.orderInfoItemNames')[0].value){
        // console.log(orderList[i])
        setOrder(orderList[i]);
      }
    }
    console.log(`cartitem${cartItem.length}`)
    console.log(cartItem[0])
    console.log(order)
    const memberId = localStorage.getItem("memberId") == "undefined" ? '' :JSON.parse(localStorage.getItem("memberId"));
    await Axios.post("http://localhost:8000/api/orders",{
      "customerId": memberId,
      "productId1": cartItem.length == 0 ? 'NULL' : cartItem[0].id, 
      "productPrice1": cartItem.length == 0 ? 'NULL' : cartItem[0].price, 
      "quantity1": cartItem.length == 0 ? 'NULL' : cartItem[0].qty,
      // "productId2": "9", 
      // "productPrice2": "3800", 
      // "quantity2": "7",
      "productId2": cartItem.length <= 1 ? 'NULL' : cartItem[1].id, 
      "productPrice2": cartItem.length <= 1 ? 'NULL' : cartItem[1].price, 
      "quantity2": cartItem.length <= 1 ? 'NULL' : cartItem[1].qty,
      "productId3": "9", 
      "productPrice3": "3800", 
      "quantity3": "7" ,
      "productId4": "9", 
      "productPrice4": "3800", 
      "quantity4": "7" ,
      "productId5": "9", 
      "productPrice5": "3800", 
      "quantity5": "7" ,
      // "productId1": cartItem.length = 0 ? '5' : cartItem[0].id,
      // "productPrice1": cartItem.length = 0 ? 'NULL' : cartItem[0].price,
      // "quantity1": cartItem.length = 0 ? 'NULL' : cartItem[0].qty,
    })
    console.log(memberId)
  }
  function shit(){
    console.log(cartItem.length == 1)
    console.log(cartItem)
  }
  
  return (
    <main className="cartMain">
      <section className="cart cartSection">
        <div className="cartProcess">
          <div className="cartProcessItem">
            <p>1</p>
            <p>Cart</p>
          </div>
          <div className="cartProcessItem cartProcessItemMiddle">
            <p>2</p>
            <p>Infos</p>
          </div>
          <div className="cartProcessItem">
            <p>3</p>
            <p>Confirm</p>
          </div>
        </div>
        <div className="cartItemCart">
          <h3 className="cartTitle">Cart (1 piece)</h3>
          <div className="cartItemInfo">
            <div className="cartItemInfoTitle">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>
            <div className="cartItemInfoItems">
              {cartItem.map((val) => {
                return (
                  <div className="cartItemMap">
                    <div>
                      <img
                        // src={`https://picsum.photos/50/50/?random=${val.price}`}
                        src={`/img/${val.pic}`}
                      />
                    </div>
                    <div>
                      <p>{val.title}</p>
                      <p>S</p>
                    </div>
                    <div>NT${val.price}</div>
                    <div>
                      <span>-</span>
                      <p>{val.qty}</p>
                      <span>+</span>
                    </div>
                    <div>NT${val.price * val.qty}</div>
                    <div
                        className="deleteBtn" 
                        onClick={() => deleteCart(val)}
                    >x</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="cartPay">
          <h3 className="cartTitle">Payment & Delivery</h3>
          <div className="cartPayInfo">
            <p>Delivery location</p>
            <select>
              <option value="">Taiwan</option>
              <option value="">North America</option>
              <option value="">South America</option>
              <option value="">Africa</option>
              <option value="">Europe</option>
              <option value="">Asia</option>
              <option value="">Oceania</option>
            </select>
            <p>Delivery Methods</p>
            <select>
              <option value="">711</option>
              <option value="">Family Mart</option>
              <option value="">OK</option>
            </select>
            <p>Payments</p>
            <select>
              <option value="">Credit Card</option>
              <option value="">ATM</option>
              <option value="">Paypal</option>
            </select>
          </div>
        </div>
        <div className="cartInfo">
          <h3 className="cartTitle">Order Information</h3>
          <div className="cartInfoItem">
            <p>Price &nbsp;&nbsp;&nbsp;&nbsp; :</p>
            <p>NT${total()}</p>
          </div>
          <div className="cartInfoItem">
            <p>Shipping :</p>
            <p>NT${cartItem.length == 0 ? 0 : 60}</p>
          </div>
          <div className="cartInfoItem">
            <p>Total &nbsp;&nbsp;&nbsp;&nbsp;:</p>
            <p>NT${cost + (cartItem.length == 0 ? 0 : 60)}</p>
          </div>
          <button className="cartInfoCheckout">Checkout</button>
        </div>
      </section>
      <section className="info cartSection">
        <div className="cartProcess">
          <div className="cartProcessItem">
            <p>1</p>
            <p>Cart</p>
          </div>
          <div className="cartProcessItem cartProcessItemMiddle">
            <p className="cartProcessItemInfo">2</p>
            <p>Infos</p>
          </div>
          <div className="cartProcessItem">
            <p>3</p>
            <p>Confirm</p>
          </div>
        </div>
        <div className="infoCart">
          <div className="infoCartTitle">
            <p>Total : NT${cost + (cartItem.length == 0 ? 0 : 60)}</p>
            <div>
              Cart ({cartItem.length} piece) &nbsp; <p className="cartTitleArrow">v</p>
            </div>
          </div>
          <div className="infoCartDetails cartItemInfo">
            <div className="cartItemInfoTitle">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>
            <div className="cartItemInfoItems">
            {cartItem.map((val) => {
                return (
                  <div className="cartItemMap">
                    <div>
                      <img
                        src={`/img/${val.pic}`}
                      />
                    </div>
                    <div>
                      <p>{val.title}</p>
                      <p>S</p>
                    </div>
                    <div>NT${val.price}</div>
                    <div>
                      <span>-</span>
                      <p>{val.qty}</p>
                      <span>+</span>
                    </div>
                    <div>NT${val.price * val.qty}</div>
                    <div
                        className="deleteBtn" 
                        onClick={() => deleteCart(val)}
                    >x</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="infoCartOrder">
            <div className="cartInfo">
              <div className="cartInfoItem">
                <p>Price &nbsp;&nbsp;&nbsp;&nbsp; :</p>
                <p>NT${cost}</p>
              </div>
              <div className="cartInfoItem">
                <p>Shipping :</p>
                <p>NT${cartItem.length == 0 ? 0 : 60}</p>
              </div>
              <div className="cartInfoItem">
                <p>Total &nbsp;&nbsp;&nbsp;&nbsp;:</p>
                <p>NT${cost + (cartItem.length == 0 ? 0 : 60)}</p>
              </div>
            </div>
            <div className="cartExpends">
              <p>V</p>
            </div>
          </div>
        </div>
        <div className="infoShipping">
          <h3 className="cartTitle">Shipping Details</h3>
          <div className="infoShippingItem">
            <p>Shipping Methods : </p>
            <p>Name</p> <input type="text" className="orderInfoItemNames" value={member.customerName}/>
            <p>Phone</p> <input type="text" value={member.customerPhone}/>
            <p>Address</p> <input type="text" value={member.customerAddress}/>
          </div>
        </div>
        <div className="infoPay">
          <h3 className="cartTitle" onClick={shit}>Payment Details</h3>
          <div className="infoPayContainer">
            <p>Payment Methods : </p>
            <div className="infoPayItem">
              <p>Credit Card</p>
              <input type="text" placeholder="  Card Number" />
            </div>
            <div className="infoPayItem">
              <p>Card Holder Name</p>
              <input type="text" placeholder="  Holder Name" />
            </div>
            <div className="infoPayItem">
              <p>Card Valid Date</p>
              <input type="text" placeholder="  MM/YY" />
            </div>
            <div className="infoPayItem">
              <p>CVC</p>
              <input type="text" placeholder="  CVC" />
            </div>
          </div>
        </div>
        <div className="infoFooter">
          <div href="#" className="backToCart">
            {" "}
            Back to Cart
          </div>
          <button 
            className="infoSend"
            onClick={orderSend}
          >Order send</button>
          <a href="#" > Back to Cart</a>
        </div>
      </section>
      <section className="order cartSection">
        <div className="cartProcess">
          <div className="cartProcessItem">
            <p>1</p>
            <p>Cart</p>
          </div>
          <div className="cartProcessItem cartProcessItemMiddle">
            <p className="cartProcessItemInfo">2</p>
            <p>Infos</p>
          </div>
          <div className="cartProcessItem">
            <p className="cartProcessItemConfirm">3</p>
            <p>Confirm</p>
          </div>
        </div>
        <div className="infoCart">
        <div className="infoCartTitle">
            <p>Total : NT${cost + (cartItem.length == 0 ? 0 : 60)}</p>
            <div>
              Cart ({cartItem.length} piece) &nbsp; <p className="cartTitleArrow">v</p>
            </div>
          </div>
          <div className="infoCartDetails cartItemInfo">
            <div className="cartItemInfoTitle">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>
            <div className="cartItemInfoItems">
            {cartItem.map((val) => {
                return (
                  <div className="cartItemMap">
                    <div>
                      <img
                        src={`/img/${val.pic}`}
                      />
                    </div>
                    <div>
                      <p>{val.title}</p>
                      <p>S</p>
                    </div>
                    <div>NT${val.price}</div>
                    <div>
                      <span>-</span>
                      <p>{val.qty}</p>
                      <span>+</span>
                    </div>
                    <div>NT${val.price * val.qty}</div>
                    <div
                        className="deleteBtn" 
                        style={{display:'none'}}
                    >x</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="infoCartOrder">
          <div className="cartInfo">
              <div className="cartInfoItem">
                <p>Price &nbsp;&nbsp;&nbsp;&nbsp; :</p>
                <p>NT${cost}</p>
              </div>
              <div className="cartInfoItem">
                <p>Shipping :</p>
                <p>NT${cartItem.length == 0 ? 0 : 60}</p>
              </div>
              <div className="cartInfoItem">
                <p>Total &nbsp;&nbsp;&nbsp;&nbsp;:</p>
                <p>NT${cost + (cartItem.length == 0 ? 0 : 60)}</p>
              </div>
            </div>
            <div className="cartExpends">
              <p>V</p>
            </div>
          </div>
        </div>
        <div className="orderInfo">
          <div className="orderInfoItem">
            <h4>Order Details</h4>
            <p>Order Number :</p>
            <p>#{order.orderId}</p>
            <p>Order Email :</p>
            <p>{order.customerEmail}</p>
            <p>Order date :</p>
            <p>{order.orderDate}</p>
            <p>Order status :</p>
            <p>Confirm</p>
          </div>
          <div className="orderInfoItem">
            <h4>Customer Details</h4>
            <p>Name :</p>
            <p className="orderInfoItemName">{order.customerName}</p>
            <p>Phone :</p>
            <p>{order.customerPhone}</p>
          </div>
          <div className="orderInfoItem">
            <h4>Shipping Details</h4>
            <p>Shipping Methods :</p>
            <p>7-11</p>
            <p>Name :</p>
            <p>xxx</p>
            <p>Phone :</p>
            <p>{order.customerPhone}</p>
          </div>
          <div className="orderInfoItem">
            <h4>Payment Details</h4>
            <p>Payment Methods :</p>
            <p>Credit Card</p>
            <p>Status :</p>
            <p>paid</p>
            <p>Order Number :</p>
            <p>#{order.orderId}</p>
          </div>
          <div className="orderInfoItem">
            <h4>Contact Us</h4>
            <textarea
              name=""
              id=""
              cols="10"
              rows="5"
              placeholder="Leave a message !"
            ></textarea>
          </div>
          <div className="orderFooter">
            <div href="#" className="backToInfo">
              {" "}
              Back to Info
            </div>
            {/* <button className="orderConfirm">Confirm</button> */}
            {/* <a href="#"> Back to Info</a> */}
          </div>
        </div>
      </section>
    </main>
  );
}