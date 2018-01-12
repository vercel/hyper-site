import Gravatar from 'react-gravatar'
import InstallModal from './InstallModal'

export default class extends React.Component {
  constructor() {
    super()

    this.state = {
      isModalOpen: false
    }

    this.openInstallModal = this.openInstallModal.bind(this)
    this.closeInstallModal = this.closeInstallModal.bind(this)
  }

  openInstallModal() {
    this.setState({
      isModalOpen: true
    })

    console.log(this.props)
  }

  closeInstallModal() {
    this.setState({
      isModalOpen: false
    })
  }

  render() {
    const { plugin } = this.props

    return (
      <div>
        <InstallModal
          name={plugin.metadata.name}
          isOpen={this.state.isModalOpen}
          closeModal={this.closeInstallModal}
        />

        <div className="plugin-info">
          <div className="plugin-info__author border-followed">
            <Gravatar
              className="plugin-info__avatar"
              email={plugin.metadata.publisher.email}
            />
            <span>{plugin.metadata.publisher.username}</span>
          </div>

          <span className="border-followed">
            {plugin.npm.downloads[2].count.toLocaleString()} downloads in the
            last month
          </span>

          <a
            className="plugin-info__link"
            href={plugin.metadata.links.repository}
            target="_blank"
          >
            View source code
          </a>

          <div className="plugin-info__version border-followed">
            Version {plugin.metadata.version}
          </div>

          <a className="plugin-info__install" onClick={this.openInstallModal}>
            Install
          </a>

          <style jsx>{`
            .plugin-info {
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
              background: black;
              height: 6.4rem;
              display: flex;
              align-items: center;
              font-size: 1.2rem;
              padding: 0 40px;
            }

            .plugin-info__author {
              display: flex;
              align-items: center;
            }

            :global(.plugin-info__avatar) {
              border-radius: 50%;
              width: 28px;
              height: 28px;
              margin-right: 8px;
            }

            .plugin-info__version {
              margin-left: auto;
            }

            .plugin-info__link {
              text-transform: uppercase;
              font-size: 1rem;
            }

            .plugin-info__install {
              cursor: pointer;
              border-radius: 2px;
              background: #50e3c2;
              color: black;
              padding: 0 16px;
            }

            .border-followed {
              margin-right: 8px;
              padding-right: 8px;
              border-right: 1px solid #333333;
            }
          `}</style>
        </div>
      </div>
    )
  }
}
