const literal = '`'

const FONT_FAMILY_MONO =
  'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif'

const COLOR_CODE_LIGHT = '#FF0080'

const InlineCode = ({ children, noWrap }, { disabled, darkBg } = {}) => (
  <code
    className={
      (noWrap ? 'no-wrap' : '') +
      (darkBg ? ' dark' : '') +
      (disabled ? ' disabled' : '')
    }
  >
    {children}
    <style jsx>
      {`
        code {
          color: ${COLOR_CODE_LIGHT};
          font-family: ${FONT_FAMILY_MONO};
          font-size: 0.9em;
          white-space: pre-wrap;
        }

        code.no-wrap {
          white-space: nowrap;
        }

        code::before {
          content: '${literal}';
        }

        code::after {
          content: '${literal}';
        }

        code.dark {
          color: #50e3c2;
        }

        code.disabled {
          color: #777;
        }
      `}
    </style>
  </code>
)

export default InlineCode
