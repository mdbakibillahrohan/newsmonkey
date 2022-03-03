import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
    
    constructor() {
        super();
        this.state = {
            articles:[],
            page:1,
            totalResults: 0,
            isNextDisabled: false,
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9657fa65b63d41d5b1a0d2ad336a1d9e&page=${this.state.page}&pageSize=12`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults
        })
    }

    handlePreClick = async()=>{
        if(!(Math.ceil(this.state.totalResults/12)<=this.state.page)){
            this.setState({
                isNextDisabled: false,
            })
        }
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9657fa65b63d41d5b1a0d2ad336a1d9e&page=${this.state.page-1}&pageSize=12`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page-1,
        })
        
    }
    handleNextClick = async()=>{
        if(Math.ceil(this.state.totalResults/12)<=this.state.page){
            console.log("page finished");
            console.log(this.state.totalResults);
            this.setState({
                isNextDisabled: true,
            })
        }else{
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9657fa65b63d41d5b1a0d2ad336a1d9e&page=${this.state.page+1}&pageSize=12`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                page: this.state.page+1,
            })
        }
        
    }

    render() {
        return (
            <div className='my-5 container'>
                <h2 className='text-center mb-3'>NewsMonkey Top HeadLines</h2>
                <div className='row'>
                    {this.state.articles.map((element)=>{
                        return(
                            <NewsItem newsUrl={element.url} imageUrl={element.urlToImage} key={element.url} title={element.title?element.title.slice(0,45):""} desc={element.description?element.description.slice(0,100):""} />
                        )
                    })}
                </div>
                <div className='d-flex justify-content-between' style={{width: "40%",}}>
                    <button disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handlePreClick} >Previous</button>
                    <button disabled={this.state.isNextDisabled} className='btn btn-dark' onClick={this.handleNextClick} >Next</button>
                </div>
            </div>
        )
    }
}

export default News