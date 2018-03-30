export default class extends React.Component {
  render() {
    return (
      <div className="filters-container">
        <div className="filters">
          <a
            onClick={() => {
              this.props.handleFilterChange('featured')
            }}
            className={this.props.currentFilter === 'featured' ? 'active' : ''}
          >
            Featured
          </a>
          <a
            onClick={() => {
              this.props.handleFilterChange('newest')
            }}
            className={this.props.currentFilter === 'newest' ? 'active' : ''}
          >
            Newest
          </a>
        </div>

        <style jsx>{`
          .filters-container {
            display: flex;
            justify-content: center;
          }
          .filters {
            border: 1px solid #333333;
            border-radius: 4px;
            height: 2.4rem;
            display: flex;
            align-items: center;
          }
          .filters a {
            font-size: 1rem;
            height: 2.4rem;
            line-height: 2.4rem;
            text-transform: uppercase;
            padding: 0 10px;
            color: #999999;
            cursor: pointer;
            transition: color 0.2s ease;
          }
          .filters a:hover,
          .filters a.active {
            color: white;
            text-decoration: none;
          }
          .filters a:not(:last-child) {
            border-right: 1px solid #333333;
          }
        `}</style>
      </div>
    )
  }
}
