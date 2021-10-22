import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps={
        country:'in',
        pageSize:12,
    }
    static propTypes={
        country:PropTypes.string,
        pageSize: PropTypes.number
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalResults : 0
        }
        document.title = `NewsApp - ${this.capitalizeFirstLetter(this.props.category)}`
    }

    async updateNews(){
        this.props.setProgress(20);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({articles: parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
        this.props.setProgress(100)
    }

    async componentDidMount(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=32abcf505166410289f9b1238d445fc3&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
    }

    // async componentDidMount() {
    //     this.updateNews();
    // }


    // handlePrev = async ()=>{
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d74c1181127749408e5c72451ffedc69&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({loading:true})
        // let data = await fetch(url)
        // let parsedData = await data.json()

        // this.setState({
        //     page:this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading:false
        // })
    //     this.updateNews();
    //     this.setState({page:this.state.page - 1})
    // }

    // handleNext  = async ()=>{
    //     if(!( this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize ))){
            
    //     this.updateNews();
    //     this.setState({page:this.state.page + 1})
    //          }}
            
    fetchMoreData = async () => {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=32abcf505166410289f9b1238d445fc3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            let data = await fetch(url)
            let parsedData = await data.json()
            this.setState({
                page:this.state.page + 1,
                articles: this.state.articles.concat(parsedData.articles),
                loading:false
            })
    };

    render() {
        return (
            <>
                <h2 className='text-center ' style={{ margin: '20px 0px', marginTop: '70px' }}>Top Headlines <small>({this.capitalizeFirstLetter(this.props.category)}) </small></h2>
                <hr />
                {this.state.loading && <Spinner/>}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                <div className="container">
                <div className="row">
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4 my-3" key={element.url}>
                                <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                           </div>
                })}
                </div>
                </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
