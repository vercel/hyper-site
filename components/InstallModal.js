export default class extends React.Component {
  componentDidUpdate() {
    const body = window.document.body

    if (this.props.isOpen === true) {
      body.classList.add('has-modal-open')
    } else {
      body.classList.remove('has-modal-open')
    }
  }

  render() {
    if (this.props.isOpen === false) {
      return null
    }

    return (
      <div className="modal-container">
        <div className="modal">
          <h3>Install {this.props.name}</h3>
          <p>
            Use hyper-cli to install {this.props.name} by entering the following
            into Hyper.app:
          </p>
          <pre>hyper install {this.props.name}</pre>
        </div>
        <div
          className="modal-backdrop"
          onClick={() => this.props.closeModal()}
        />

        <style jsx>{`
          :global(body.has-modal-open) {
            overflow: hidden;
          }

          .modal-container {
            width: 100%;
            min-height: 100%;
            overflow-y: auto;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .modal-backdrop {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.25);
          }

          .modal {
            background: white;
            color: black;
            padding: 40px;
            position: relative;
            z-index: 1200;
            max-width: 100%;
            width: 400px;
            display: flex;
            flex-direction: column;
            text-align: center;
          }

          .modal h3 {
            margin-top: 0;
            font-weight: 400;
          }

          .modal pre {
            border: 1px solid #eaeaea;
            color: #bd10e0;
            padding: 12px 0;
          }

          .modal pre::before {
            content: '$';
            margin-right: 12px;
          }
        `}</style>
      </div>
    )
  }
}
