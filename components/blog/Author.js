import React from 'react'

const Author = ({ data }) => (
  <div className="wrapper">
    <img src={data.thumbnail} alt={`${data.name} profile picture`} />
    <div className="data">
      <span>{data.name}</span>
      <a href={`https://twitter.com/${data.twitter}`}>@{data.twitter}</a>
    </div>
    <style jsx>{`
      .wrapper {
        display: grid;
        grid-template-areas: 'thumbnail data';
        align-items: center;
      }

      img {
        border-radius: 50%;
        width: 28px;
        height: 28px;
        grid-area: thumbnail;
      }

      .data {
        grid-area: data;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
      }

      .data span {
        display: block;
        font-size: 14px;
        line-height: 1em;
        margin: 0;
      }
    `}</style>
  </div>
)

export default Author
