import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    const updateNews = async () => {
        props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=32abcf505166410289f9b1238d445fc3&page=${page}&pageSize=${props.pageSize}`
        setLoading(true);
        let data = await fetch(url)
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100)
    }
    useEffect(() => {
        document.title = `NewsApp - ${capitalizeFirstLetter(props.category)}`
        updateNews();
        // eslint-disable-next-line

    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=32abcf505166410289f9b1238d445fc3&page=${page + 1}&pageSize=${props.pageSize}`
            setPage(page + 1)
            let data = await fetch(url)
            let parsedData = await data.json()

            setTotalResults(parsedData.totalResults)
            setArticles(articles.concat(parsedData.articles))
    }
        return (
            <>
            <div>
            <h2 className="text-center" style={{ margin: '15px 0px', marginTop: '75px', color:props.mode==='light'?'black':'white' }}>Top Headlines ({capitalizeFirstLetter(props.category)}) </h2>
                <hr style={{color:props.mode==='light'?'black':'white' }}/>
                </div>
                {loading && <Spinner/>}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                >
                <div className="container">
                <div className="row">
                {articles.map((element)=>{
                    return <div className="col-md-4 my-3" mode={element.mode}
                    key={element.url}>
                                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                           </div>
                })}
                </div>
                </div>
                </InfiniteScroll>
            </>
        )
}

News.defaultProps={
    country:'in',
    pageSize:10,
}
News.propTypes={
    country:PropTypes.string,
    pageSize: PropTypes.number
}

export default News
