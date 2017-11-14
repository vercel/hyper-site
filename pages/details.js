import Router from 'next/router'
import LayoutDetail from '../components/LayoutDetails'

const handleClick = event => {
  event.preventDefault()
  Router.push('/index')
}

export default () => (
  <LayoutDetail>
    <style jsx>{`
      .back {
        margin-top: 3%;
        background: none;
        border: solid;
        cursor: pointer;
      }
    `}</style>

    <h1>s</h1>
    <button className="back" onClick={handleClick}>
      <img src="../static/Back.png" />
    </button>
  </LayoutDetail>
)
