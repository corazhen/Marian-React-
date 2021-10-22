import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import groupBy from 'lodash/groupBy';

import Axios from "axios";
import $ from "jquery";

import '../css/MemberInside.css'
import '../js/memberinside'

import moment from 'moment';

// import jwt from'jsonwebtoken';
// import { Redirect } from "react-router-dom"






export default function MemberInside() {
    const [ memberIden, setMemberIden] = useState([]);
    const [ memberName, setMemberName] = useState([]);
    const [ memberGender, setMemberGender] = useState([]);
    const [ memberPhone, setMemberPhone] = useState([]);
    const [ memberAddress, setMemberAddress] = useState([]);
    const [ memberEmail, setMemberEmail] = useState([]);
    const [ memberPassword, setMemberPassword] = useState([]);

    const [ memberOrdersId, setmemberOrdersId] = useState([]);

    const [ memberOrdersDetail, setmemberOrdersDetail] = useState([]);

    let { memberId } = useParams();
    console.log("apple");

    console.log(memberId);
    // console.log(memberId);
// 1 是男生
        function saveChange(){

            let memberN = $('.memberName')[0].value==""?memberName:$('.memberName')[0].value;
            let memberG = $('.memberGender')[0].value=="boy"?1:$('.memberGender')[0].value=="girl"?0:"";
            let memberE = $('.memberEmail')[0].value==""?memberEmail:$('.memberEmail')[0].value;
            let memberP = $('.memberPhone')[0].value;
            let memberA = $('.memberAddress')[0].value;
            

            Axios.put('http://localhost:8000/api/members', 
            { 
                "customerName": memberN,
                "customerGender":memberG,
                "customerEmail":memberE,
                "customerPhone":memberP,
                // "customerAddress":$('.memberAddress')[0].value,
                "customerAddress":memberA,
                "customerId":memberId,
            }).then(response => {console.log(response)})
            // changeName();
            // setMemberGender(data.data[0].customerGender==1?"boy":"girl");

        }  
        // function changeName(){
        //     if (memberGender==1) {
        //         memberGender="boy";
        //        console.log("apple");
        //     } else {
        //         memberGender="girl";
        //     }
        // }
    useEffect(() => {
        localStorage.setItem("memberId",JSON.stringify(memberId));
        }, [memberId]);

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/members/${memberId}`).then((data) => {
            
            setMemberIden(data.data[0].customerId);
        });
        reload();
       
        coraorderDetail();
       
        }, []);
    
    useEffect(() => {
        Axios.get(`http://localhost:8000/api/members/${memberId}`).then((data) => {
            setMemberName(data.data[0].customerName);
        });
        }, []);

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/members/${memberId}`).then((data) => {
            setMemberGender(data.data[0].customerGender==1?"boy":data.data[0].customerGender==0?"girl":"");
        });
        }, []);
    useEffect(() => {
        Axios.get(`http://localhost:8000/api/members/${memberId}`).then((data) => {
            setMemberPhone(data.data[0].customerPhone);
        });
        }, []);

        useEffect(() => {
            Axios.get(`http://localhost:8000/api/members/${memberId}`).then((data) => {
                setMemberAddress(data.data[0].customerAddress);
            });
            }, []);

        useEffect(() => {
            Axios.get(`http://localhost:8000/api/members/${memberId}`).then((data) => {
                setMemberEmail(data.data[0].customerEmail);
            });
            }, []);
            
        useEffect(() => {
            Axios.get(`http://localhost:8000/api/members/${memberId}`).then((data) => {
                setMemberPassword(data.data[0].customerPassword);
            });
            }, []);
            // 

    function reload(){
       $('.memberConditionInfo').on('click',function(){
        $('.membersCondition').css("background-color","rgb(149, 169, 201)");
        $('.memberConditionInfo').css("color","rgb(105, 122, 149)").css("background-color","rgb(255, 230, 183)");
        $('.memberConditionOrders').css("color","white").css("background-color","rgb(149, 169, 201)");
        $('.memberInfo').css("display","block");
        $('.memberOrders').css("display","none");

    })

    // member login display
    $('.memberConditionOrders').on('click',function(){
        $('.membersCondition').css("background-color","rgb(255, 230, 183)");
        $('.memberConditionInfo').css("color","white").css("background-color","rgb(149, 169, 201)");
        $('.memberConditionOrders').css("color","rgb(105, 122, 149)").css("background-color","rgb(255, 230, 183)");
        $('.memberInfo').css("display","none");
        $('.memberOrders').css("display","block");

    })
    
    $(".status").css("display","block");
    }
            
    async function coraorderDetail(){
       await Axios.get(`http://localhost:8000/api/member-order-history/${memberId}`).then((datas) => {
            setmemberOrdersId((datas.data).reverse());
        });
        Axios.get(`http://localhost:8000/api/cora/${memberId}`).then((datasa) => {
            setmemberOrdersDetail(datasa.data);
        });
        
        
    }
    // let cora=groupBy(memberOrdersDetail.details,'orderId')
    // console.log(memberOrdersId);
    // console.log(memberOrdersId[0]);
    // console.log(memberOrdersDetail);
    
      function moreDetail(){
        $('.memberOrdersDetails').slideToggle();
        // console.log('0912172817');
        // console.log(memberOrdersId.reverse()[0].orderId)
        // console.log(memberOrdersId[0].orderId)
        // console.log(memberOrdersDetail[1].orderId)
        // console.log("cora");
  }
        function Logout(){
            localStorage.removeItem("memberId");  
            setTimeout(function () {
                window.location.replace("/marian/member");
              }, 1000);
            
            
        }
        
        




    return (
        <main className="memberInsideMain">
        <section className="memberInsideSection">
            <div className="membersCondition">
                <div className="memberConditionInfo">
                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                    <p>Member Info</p>
                </div> 
                <div className="memberConditionOrders"  onClick={()=>coraorderDetail()} >
                    <i className="fa fa-history" aria-hidden="true"></i>
                    <p  >Member Orders</p>
                </div>
            </div>
            <div className="memberInfo">
                <div className="memberLogout" onClick={Logout}><i class="fa fa-sign-out" aria-hidden="true"></i>LOGOUT</div>
    
                <div className="memberInfoItem">
                    <div className="memberInfoRows">
                        <p className="memberInfoText">哈囉～老闆，以下是你的會員資料，<br/><br/> <span>如欲更改請直接輸入，並按下方確認按鈕即可！</span></p>
                    </div>
                    <div className="memberInfoRows">
                        <p className="memberInfoTitle">Member Id</p>
                        <p className="memberInfoDetails memberIn">{memberIden}</p>
                    </div>
                    <div className="memberInfoRows">
                        <p className="memberInfoTitle">Name</p>
                        <input type="text" className="memberInfoDetails memberName" placeholder={memberName} />
                    </div>
                    <div className="memberInfoRows">
                        <p className="memberInfoTitle">Gender</p>
                        <input type="text" className="memberInfoDetails memberGender" placeholder={memberGender}/>
                    </div>
                    <div className="memberInfoRows">
                        <p className="memberInfoTitle">Phone</p>
                        <input type="text" className="memberInfoDetails memberPhone" placeholder={memberPhone}/>
                    </div>
                    <div className="memberInfoRows">
                        <p className="memberInfoTitle">Address</p>
                        <input type="text" className="memberInfoDetails memberAddress" placeholder={memberAddress}/>
                    </div>
                    <div className="memberInfoRows">
                        <p className="memberInfoTitle">Email</p>
                        <input type="text" className="memberInfoDetails memberEmail" placeholder={memberEmail}/>
                    </div>
                    <div className="memberInfoRows">
                        <p className="memberInfoTitle">Password</p>
                        <input type="password" className="memberInfoDetails memberPassword" value={memberPassword}/>
                    </div>
                </div> 
                <div className="memberButton">
                    {/* <button className="memberInfoButton deleteButton "><i className="discard fa fa-minus-circle" aria-hidden="true"></i><p>Discard</p></button> */}
                    <button className="memberInfoButton saveButton" onClick={()=>saveChange()}><i className="fa fa-check-circle-o" aria-hidden="true"></i>Save Changes</button>
                </div>
            </div>

            <div className="memberOrders">
            <div className="memberLogout" onClick={Logout}><i class="fa fa-sign-out" aria-hidden="true"></i>LOGOUT</div>

                <div className="memberOrdersTitle">
                    <div className="memberOrdersSee"></div>
                    <div className="memberOrdersId">Orders ID</div>
                    <div className="memberOrdersTime">Orders Time</div>
                    <div className="memberOrdersTotal">Orders Total</div>
                </div>
            
                {memberOrdersId.map((va,key)=>{
                    return(
                        <>
                        <div className="memberOrdersItem"  >
                            <div id='cora' onClick={()=>moreDetail()} className="memberOrdersSee"><i className="fa fa-list" aria-hidden="true"></i>Details</div>
                            <div className="memberOrdersId">{va.orderId}</div>
                            <div className="memberOrdersTime">{moment(va.orderDate).format('YYYY-MM-DD')}</div>
                            <div className="memberOrdersTotal">{va.totalPrice}</div>
                         </div>
                         <div  className="memberOrdersDetails " style={{display:"none"}} >
                            
                          {/* {memberOrdersDetail.map((val,key)=>{
                              if (val.orderId==va.orderId) {
                                return(
                                    <ul>
                                        <li key={orderId}>{val.details}</li>
                                    </ul>
                                )
                              } 
                        })} */}
                        {memberOrdersDetail.map((val,key)=>{
                              if (val.orderId==va.orderId) {
                                return(
                                    <ul>
                                        <li key={val.orderId}>{val.details}</li>
                                    </ul>
                                )
                              } 
                            //   console.log(key)
                        })}

                         </div>
                        </>
                    )
                })}
                {/* <div className="memberOrdersItem">
                    <div className="memberOrdersSee" id="2"><i className="fa fa-list" aria-hidden="true"></i>Details</div>
                    <div className="memberOrdersId">246802</div>
                    <div className="memberOrdersTime">2020-09-30</div>
                    <div className="memberOrdersTotal">NT$2570</div>
                </div>
                <div className="memberOrdersDetails">
                    <ul>
                        <li> #27, 灰色印花棉踢, M, 3件, NT$4500 </li>
                        <li> #453, 兒童100%環保登山刷毛衣, 1件, NT$1280 </li>
                        <li> #1987, 高機能防風防水登山外套, 1件, NT$3780 </li>
                        <li> #3329, 15L超輕量側背包, 1件, NT$3780 </li>
                    </ul>
                </div> */}
                <div className="memberOrdersTitle">
                    <div className="memberOrdersSee"></div>
                    <div className="memberOrdersId"></div>
                    <div className="memberOrdersTime"></div>
                    <div className="memberOrdersTotal"></div>
                </div>
            </div>
        </section>
    </main>
    )
}
