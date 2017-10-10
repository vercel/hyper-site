import IconSearch from '../static/search.svg'
import PropTypes from 'prop-types'

const Search = () => (
  <div>
    <style jsx>{`
      .search {
        background: transparent;
        border: none;
        color: white;
        font-size: 14px;
        font-size: 1.4rem;
        font-weight: 400;
        transform: translateX(40%);
        line-height: 2.3rem;
        left: 40%;
        width: 70px;
        padding-left: 5px;
      }

      .icon {
        display: inline;
        background: transparent;
        border: none;
        margin-left: 22px;
        width: 0px;
      }

      .form {
        display: inline;
      }
    `}</style>
    <form className="form">
      <input
        className="search"
        type="text" 
        placeholder="Search..." 
        maxLength="30"
      />
    </form>
    
    <button className="icon">
     <IconSearch/>
    </button>
  </div>
)

export default Search
