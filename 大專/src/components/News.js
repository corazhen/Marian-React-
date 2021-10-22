import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../css/News.css";
import "../js/news";
import news1 from "../img/c01.jpg";
import news2 from "../img/c02.jpg";
import news3 from "../img/c06.jpeg";
import { Link, useHistory } from "react-router-dom";
import moment from 'moment';
 
export default function News() {
  const [postList, setPostList] = useState([]);
  let history = useHistory();

  useEffect(() => {
    Axios.get("http://localhost:8000/api/news").then((data) => {
      console.log(data.data[2]);
      console.log(data.data[2].newsTitle);
      setPostList(data.data);
    });
  }, []);

  return (
    <React.Fragment>
      <div id="welcomeC">
        <div id="welcomecInner">
          <div className="welcomecCont">
            <h2>News</h2>
          </div>
          <div className="wCarousel">
            <div className="slide">
              <img src={news1} alt="" />
            </div>
            <div className="slide">
              <img src={news2} alt="" />
            </div>
            <div className="slide">
              <img src={news3} alt="" />
            </div>
          </div>
        </div>
      </div>
      <main className="newsMain">
        <div class="news">
          <div className="newsSectionDiv" >
            {postList.map((val, key) => {
              return (
                <section className="newsSection">
                  <div class="newsPic" >
                    {/* <Link to="/marian/newsinside"> */}
                    <div className="newsClick" 
                      onClick={() => history.push(`/marian/news/${val.newsId}`)}
                    >
                     <img src={`/Img/${val.newsCoverImg}`} alt={val.newsCoverImg}/>
                    </div>
                  </div>
                  <div class="newsContent">
                    <div class="newsTag">
                      <i class="fa fa-tag" aria-hidden="true"></i>
                      <p>{val.newsId}</p>
                    </div>
                    <h2>
                      <div className="newsClick"
                        onClick={() => history.push(`/marian/news/${val.newsId}`)}
                      >
                        {val.newsTitle}
                      </div>
                    </h2>
                    <div class="newsDate">
                      <p>{moment(val.newsDate).format('MMMM Do YYYY')}</p>
                    </div>
                    <div class="newsExtend">
                      <p>
                        <div className="newsClick newsRead"
                          onClick={() => history.push(`/marian/news/${val.newsId}`)}
                        >Read More
                        </div>
                      </p>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
          {/* <div class="loadMore" id="loadMore">
            Load More
            <p class="loadMoreArrow">ｖ</p>
          </div> */}
        </div>
      </main>
    </React.Fragment>
  );
}

