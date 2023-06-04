import React from 'react'

const NewsItem =(props)=> {
    let {title , discription, imageUrl, newsUrl, author, date, source} = props
    return (
      <div className='my-3 mx-3'>
        <div className="card">
          <div style={{
            display :"flex",
            justifyContent : "flex-end",
            position : "absolute",
            right : "0"
          }}>
            <span className=" badge rounded-pill bg-danger" style={{left:'90%',zIndex:"1"}}>{source}
          <span className="visually-hidden">unread messages</span>
        </span>
          </div>
  <img src={!imageUrl?"https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/357300/357353.6.jpg":imageUrl} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{discription}...</p>
    <p className="card-text"><small className="text-danger">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} target='blank' className="btn btn-sm btn-dark">Read more...</a>
  </div>
</div>

      </div>
    )
  
}

export default NewsItem