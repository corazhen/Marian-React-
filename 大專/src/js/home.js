import $ from 'jquery'

// caroual
// $(function(){
//     var inwrap=$('.w-carousel'),
//     $slide=$('.slide');

//     // 設定如何滑動到一下個           
//     function slideNext() {

//         inwrap.animate(
//             {left: '0'}, 200,function() {

//                 inwrap.css('left', '-100%');

//                 $('.slide').last().after($('.slide').first());

//             });
//         $('.prev').click(function() {

//         inwrap.animate({left: '0%'}, 1000,"ease",function() {

//         inwrap.css('left', '-100%');

//         $('.slide').first().before($('.slide').last());

//         });
//         });


//         $('.next').click( function() {

//         clearInterval(sliderInterval);

//         slideNext();

//         });
//     }
//     //Enabling auto scroll
//     function sliderInterval(){
//         setInterval(slideNext, 5000);
//     } 

// });
// $( ".navbarMenu" ).find( ".hover" ).css( "transition", "transform .5s ease-in-out 0s" )
 



// GIRL
// $(document).ready(function() {
//     var movementStrength = 25;
//     var height = movementStrength / $(window).height();
//     var width = movementStrength / $(window).width();
//     $(".conceptF").mousemove(function(e){
//               var pageX = e.pageX - ($(window).width() / 2);
//               var pageY = e.pageY - ($(window).height() / 2);
//               var newvalueX = width * pageX * -1 - 25;
//               var newvalueY = height * pageY * -1 - 50;
//               $('.conceptImg').css("background-position", newvalueX+"px "+newvalueY+"px");
//     });
//     });

    

$(document).ready(function(){
        var movementStrength = 25;
        var height = movementStrength / $(window).height();
        var width = movementStrength / $(window).width();
        $(".conceptF").on('mousemove',function(e){
                  var pageX = e.pageX - ($(window).width() / 2);
                  var pageY = e.pageY - ($(window).height() / 2);
                  var newvalueX = width * pageX * -1 - 25;
                  var newvalueY = height * pageY * -1 - 50;
                  $('.conceptImg').css("background-position", newvalueX+"px "+newvalueY+"px");

                //   $('.conceptBg').css("transform", translate(newvalueX+"px "+newvalueY+"px"));

        });
        });   
        
        // $(document).ready(function(){
        //     var movementStrength = 25;
        //     var height = movementStrength / $(window).height();
        //     var width = movementStrength / $(window).width();
        //     $(".conceptBg").on('mousemove',function(e){
        //               var pageX = e.pageX - ($(window).width() / 2);
        //               var pageY = e.pageY - ($(window).height() / 2);
        //               var newvalueX = width * pageX * -1 - 25;
        //               var newvalueY = height * pageY * -1 - 50;
        //               $('.conceptBg').css("transform", this.translate(newvalueX+"px ",newvalueY+"px"));
    
        //             //   $('.conceptBg').css("transform", translate(newvalueX+"px "+newvalueY+"px"));
    
        //     });
        //     });  
    
    
    // function myFunction(){

    // // let moveNum=(e.pageX/innerWidth)*10;
    // // let moveNum2=(e.pageY/innerHeight)*10;
    // // let newNum=((e.pageX - innerWidth/2)/(innerWidth/2));

    
    // let newNum=((e.pageX - { windowWidth: window.innerWidth }/2)/({ windowWidth: window.innerWidth }/2));
    // let newNum2=((e.pageY - { windowWidth:  window.innerWidth }/2)/({ windowWidth: window.innerWidth }/2));
    // // document.querySelector('.conceptBg').style.transform=`translate(${-50 - (newNum*10)}%,${-50 - (newNum2*10)}%)`
    
    // const changeDOM = document.getElementById('conceptBg');
    // changeDOM.style.transform=`translateX(${50 - (newNum*10)}%)`;
    // changeDOM.style.transform=`translateY(${50 - (newNum2*10)}%)`;

    // // changeDOM.style.transform=`translate(${-50 - (newNum*10)}%,${-50 - (newNum2*10)}%)`;
    // // document.querySelector('conceptBg').style.transform='translate(2%,2%)';

    // // document.querySelector('conceptBg').style.transform='translate(2%,2%)';

    // }
           