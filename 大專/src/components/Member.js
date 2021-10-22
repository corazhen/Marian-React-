import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import $ from "jquery";
import '../css/Member.css'
import '../js/member'

export default function Member() {
    const [member, setMember] = useState([]);
    let history = useHistory();
    
    useEffect(() => {
        Axios.get("http://localhost:8000/api/members").then((data) => {
          setMember(data.data);
        });
        reload();
      }, []);
    
    async  function  register(){
        const found = member.find(element => element.customerEmail == $('.registerEmail')[0].value);
        if(found == undefined){
            await Axios.post('http://localhost:8000/api/members', 
            { 
                "customerName": $('.registerName')[0].value,
                "customerPassword": $('.registerPassword')[0].value,
                "customerEmail": $('.registerEmail')[0].value
            });

            $('.emailAlert').html('Email already exist!').css('display','none');
            callback();
        }else{
            $('.emailAlert').html('Email already exist!').css('color','red').css('display','block');
        }
    }
    function callback(){
            Axios.get(`http://localhost:8000/api/members`).then((data) => {
            setMember(data.data);
            console.log(data.data);
            const foundEmail = data.data.findIndex(element => element.customerEmail == $('.registerEmail')[0].value);
            let memberId=data.data[foundEmail].customerId;
            history.push(`/marian/member/${memberId}`);

        })
        }
        
        function login() {
            const foundEmail = member.findIndex(element => element.customerEmail == $('.memberLoginEmail')[0].value);
            // const foundPassword = member.find(element => element.customerPassword== $('.memberLoginPassword')[0].value);
            // console.clear();
            // console.log($('.memberLoginEmail'));
            // console.log(foundEmail);
            // console.log(member[foundEmail].customerEmail);
                // alert('帳戶存在!');
                // 判斷帳戶存不存在 :
                // 帳戶在:
                    // 判斷密碼符不符合  (存在了!) 
                    // 1.符合 alert suceessful 跳轉裡面葉面
                    // 2.不符合 alert 密有誤
            if ($('.memberLoginEmail')[0].value == "" || $('.memberLoginPassword')[0].value== "") {
                $('.LoginPassword').html('Required fields can not be blank!').css('color','red').css('display','block');
                // alert("不能有空白欄位!");
            }
            else{
                if( foundEmail !== -1 ){

                // console.log(member[foundEmail]);
                // console.log(foundEmail);

                    if($('.memberLoginPassword')[0].value == member[foundEmail].customerPassword){
                        // console.clear();
                        // console.log(member[foundEmail]);
                        // console.log(member[foundEmail].customerPassword);
                        // console.log(member[foundEmail].customerId);
                        let memberId=member[foundEmail].customerId;
                        // console.clear();
                        // console.log(memberId);
                        history.push(`/marian/member/${memberId}`);
                        $('.LoginPassword').html('Wrong password!').css('display','none');
                        
                        // alert('login in successful!');
                        console.log('login in successful!');

                        // const tokenObject={_id:user._id, email:user.email}; 
                        // const token=jwt.sign(tokenObject,corapro);
                        // return ({sucess:true,token:"JWT"+token,user});
                        // res.send({sucess:true,token:"JWT"+token,user})

                        // history.push(`/marian/news/${val.newsId};
                     // console.log($('.memberLoginPassword')[0].value == member[foundEmail].customerPassword);
                        // $('.LoginEmail').html('login in successful!').css('color','red').css('display','none');
                        

                    }else{
                        // alert('Wrong password!'); 
                        $('.LoginPassword').html('Wrong password!').css('color','red').css('display','block');

                    }
                // 帳戶不在:else (alert 帳戶不存在或帳戶有誤)
                }else{
                    // alert('The account does not exist or the account is wrong!');
                    $('.LoginPassword').html('The account does not exist or the account is wrong!').css('color','red').css('display','block');
                }
            }
    }
       function reload(){
        $('.memberConditionRegister').on('click',function(){
            $('.membersCondition').css("background-color","rgb(149, 169, 201)");
            $('.memberConditionRegister').css("color","rgb(105, 122, 149)").css("background-color","rgb(255, 230, 183)");
            $('.memberConditionLogin').css("color","white").css("background-color","rgb(149, 169, 201)");
            $('.membersRegister').css("display","block");
            $('.membersLogin').css("display","none");
        })
    
        // member login display
        $('.memberConditionLogin').on('click',function(){
            $('.membersCondition').css("background-color","rgb(255, 230, 183)");
            $('.memberConditionRegister').css("color","white").css("background-color","rgb(149, 169, 201)");
            $('.memberConditionLogin').css("color","rgb(105, 122, 149)").css("background-color","rgb(255, 230, 183)");
            $('.membersRegister').css("display","none");
            $('.membersLogin').css("display","block");
        })
    
    }
    return (
        <main className="memberMain">
        <section className="memberSection">
            <div className="membersCondition">
                <div className="memberConditionRegister">
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    <p>Member Register</p>
                </div>
                <div className="memberConditionLogin">
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                    <p>Member Login</p>
                </div>
            </div>
            <div className="membersRegister">
                <div className="membersRegisterTitle">
                    <p >Register by Email</p>
                </div>
                <div className="membersRegisterInfo">
                    <input type="text" className="registerName" placeholder="User Name"/>
                    <p className="usernameAlert"></p>
                    <input type="text" className="registerEmail" placeholder="Email"/>
                    <p className="emailAlert"></p>
                    <input type="password" className="registerPassword" placeholder="Password"/>
                    <p className="passwordAlertCharacters">Enter at least 8 characters</p>
                    <p className="passwordAlertUpper">At least 1 Uppercase</p>
                    <p className="passwordAlertLower">At least 1 Lowercase</p>
                    <p className="passwordAlertNum">At least 1 Number</p>
                </div> 
                <div className="membersRegisterAgreement">
                    <label>
                        <input className="agreeCheckbox" type="checkbox" />
                        <p>I agree....</p>
                    </label>
                </div>
               <div className="membersButton">
                    {/* <Link to="/marian/member/:memberId"> */}
                        <button 
                            className="membersBtn" 
                            // onclick="joinNow()" 
                            onClick={() => register()}
                        >
                            
                            <i className="fa fa-hand-o-right" aria-hidden="true"></i>Join Now !
                        </button>     
                    {/* </Link>  */}
               </div>         
            </div>
            <div className="membersLogin">
                <div className="membersLoginTitle">
                    <p >Login by Email</p>
                </div>
                <div className="memberLoginInfo">
                    <input className="memberLoginEmail" type="text" placeholder="Email"/>
                    <p className="LoginEmail"></p>
                    <input className="memberLoginPassword" type="password" placeholder="Password"/>
                    <p className="LoginPassword"></p>
                </div>
                <div className="membersButton">
                        <button onClick={() => login()} 
                        className="membersBtn" >
                        Shop Now !
                        </button>
                        
                    
                </div>
                {/* <p><a href="#">Forgot Password ?</a></p> */}
            </div>
        </section>
    </main>
    )
}
