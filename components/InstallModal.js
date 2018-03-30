export default class extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.isOpen === this.props.isOpen) {
      return
    }

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
            Use the <code>hyper</code> command, bundled with your Hyper app, to
            install {this.props.name} by entering the following into Hyper:
          </p>
          <pre>hyper i {this.props.name}</pre>
          <a
            href="https://github.com/zeit/hyper-plugins/wiki/Security-and-Hyper-plugins"
            target="_blank"
            rel="noopener"
            className="security dark"
          >
            Security Notice
          </a>
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
            position: fixed;
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
            background: rgba(0, 0, 0, 0.45);
          }

          .modal {
            background: white;
            color: black;
            padding: 40px;
            position: relative;
            z-index: 1200;
            max-width: 100%;
            width: 480px;
          }

          .modal h3 {
            margin-top: 0;
            font-weight: 400;
          }

          .modal p {
            font-size: 1.4rem;
            line-height: 2.8rem;
          }

          .modal pre {
            border: 1px solid #eaeaea;
            color: #bd10e0;
            padding: 12px 0;
            font-size: 1.2rem;
            white-space: pre-wrap;
          }

          .modal pre::before {
            content: '$';
            margin-right: 12px;
          }

          .security {
            margin-top: 24px;
            font-size: 1.4rem;
            display: inline-block;
          }
        `}</style>
      </div>
    )
  }
}
