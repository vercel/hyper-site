import IconSearch from '../static/search.svg'

const Search = ({ handleSubmit, handleInput, inputValue }) => (
  <div>
    <style jsx>{`
      .input {
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

      .input:focus {
        color: #fff;
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
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Search..."
        maxLength="45"
        onChange={handleInput}
        value={inputValue}
      />
    </form>

    <button className="icon">
      <IconSearch />
    </button>
  </div>
)

export default Search
