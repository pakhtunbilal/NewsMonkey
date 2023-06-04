import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const UpdateData=async()=>{
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=a34c39c4ea49401aaadec76be7befbf0&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url)
    props.setProgress(30)
    let parsedData =await data.json()
    props.setProgress(70)
    console.log(parsedData)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
    }

    useEffect(() => {
      document.title = `NewsMonkey-${props.category}`
      UpdateData();
      //eslint-disable-next-line
    }, [])
    


  const fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=a34c39c4ea49401aaadec76be7befbf0&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url)
  
    let parsedData =await data.json()
    console.log(parsedData)
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };



    return (
          <>
            <h1 className="text-center heading">Newsmonkey-top {props.category} headlines</h1>
            { loading && <Spinner />}

            <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

          
          <div className="row">
              {articles.map((item)=>{ 
                return <div className="col-md-3" key={item.url}> 
                <NewsItem  title={item.title?item.title.slice(0,45):""} discription={item.description?item.description.slice(0,88):""}
                  imageUrl={item.urlToImage} newsUrl={item.url} author={item.author} date={item.publishedAt} source={item.source.name}/>
                </div>
              })}
            
          </div>
          </div>
          </InfiniteScroll>
          
          </>
    )
  }

News.defaultProps ={
    country : "in",
    pageSize : 8,
    category : "general"
  }
  News.propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category : PropTypes.string
  }

export default News