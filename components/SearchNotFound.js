import Layout from './Layout'

export default ({ inputValue }) => (
  <Layout>
    <style jsx>{`
      .hyper-headline-container {
        margin-top: 140px;
        text-align: center;
        width: 100%;
        display: inline-block;
      }

      .hyper-headline-description {
        margin-bottom: 20px;
        display: inline-block;
        margin: 0 auto;
        width: 80%;
      }
    `}</style>
    <div className="hyper-headline-container">
      <p>
        <b>"{inputValue}"</b> didn't match any plugins or themes 😱
      </p>
      <p className="hyper-headline-description ">
        Make sure you spelt it right!
      </p>
    </div>
  </Layout>
)
