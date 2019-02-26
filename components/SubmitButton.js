export default ({ children, href }) => (
  <a className="submit" href={href} target="_blank" rel="noopener noreferrer">
    {children}
    <style jsx>{`
      .submit {
        cursor: pointer;
        border-radius: 2px;
        background: black;
        color: white;
        font-size: 1.2rem;
        height: 2.4rem;
        border: 1px solid #333;
        padding: 0 16px;
        margin-left: auto;
        opacity: 1;
        transition: opacity 0.2 ease;
        position: absolute;
        right: 0;
        top: 0;
        transition: border-color 0.2s ease, background 0.2s ease,
          color 0.2s ease;
      }

      .submit:hover {
        border-color: #50e3c2;
        background: #50e3c2;
        color: black;
      }

      @media (max-width: 900px) {
        .submit {
          right: 40px;
        }
      }

      @media (max-width: 568px) {
        .submit {
          display: none;
        }
      }
    `}</style>
  </a>
)
