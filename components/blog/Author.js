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
        grid-template-columns: 1fr 2fr;
        align-items: center;
      }

      img {
        border-radius: 50%;
        width: 28px;
        height: 28px;
        grid-area: thumbnail;
        align-self: center;
        margin: auto;
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

      @media (max-width: 768px) {
        .wrapper {
          margin-bottom: 20px;
        }
      }
    `}</style>
  </div>
)

export default Author
