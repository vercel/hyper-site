import { FONT_FAMILY_MONO } from '../css-config'

const literal = '`'

const Caption = ({ children }) => (
  <p className="caption">
    {children}
    <style jsx>
      {`
        .caption {
          color: #999;
          font-size: 14px;
          margin: -20px 0 40px 0;
          text-align: center;
          line-height: 1.5;
        }
      `}
    </style>
  </p>
)

const Code = ({ children }) => (
  <code>
    {children}
    <style jsx>
      {`
        code {
          color: #666;
          font-family: ${FONT_FAMILY_MONO};
        }

        code::before {
          content: '${literal}';
        }

        code::after {
          content: '${literal}';
        }
      `}
    </style>
  </code>
)

Caption.Code = Code

export default Caption
