import React from 'react'

export default function NewsItem(props) {
    let { title, description, imageURL, url, author, date, source } = props;
    return (
      <div className="card">
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          right: "0"
        }}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
        </div>
        <img src={imageURL} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}  </h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {author ? author : "Anonymous"} on {new Date(date).toGMTString()}</small></p>
          <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-danger">Read More</a>
        </div>
      </div>
    )
}
