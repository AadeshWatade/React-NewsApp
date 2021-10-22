import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <>
                <div className="card">
                    <div style={{ position: 'absolute', display: 'flex', right: '0', justifyContent: 'flex-end' }}>
                        <span className="badge rounded-pill bg-dark">
                            {source}
                        </span>
                    </div>
                    <img src={!imageUrl ? "https://cdn.siasat.com/wp-content/uploads/2021/10/iphme.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} : {new Date(date).toUTCString()}</small></p>
                        <a href={newsUrl} rel='noreferrer' target='_blank' className="btn btn-primary btn-sm">Read More &#10095;</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem
