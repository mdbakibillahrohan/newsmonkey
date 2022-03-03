import React, { Component } from 'react'

export class NewsItem extends Component {
    
    render() {
        let { title, desc, imageUrl, newsUrl } = this.props;
        return (
            <div className='col-4 my-3'>
                <div className="card" style={{height:"450px"}}>
                    <img src={imageUrl} className="card-img-top" style={{height: "240px"}} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{desc}</p>
                        <a href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem