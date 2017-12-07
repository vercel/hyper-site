import Head from 'next/head'

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
      /*
        CSS Reset via github/wulkano/eightpoint modified for this usecase
      */
      html,
      body,
      div,
      span,
      object,
      iframe,
      p,
      blockquote,
      pre,
      a,
      abbr,
      address,
      cite,
      code,
      del,
      dfn,
      em,
      img,
      ins,
      kbd,
      q,
      s,
      samp,
      small,
      strong,
      sub,
      sup,
      var,
      b,
      i,
      dl,
      dt,
      dd,
      li,
      fieldset,
      form,
      label,
      legend,
      table,
      caption,
      tbody,
      tfoot,
      thead,
      tr,
      th,
      td,
      header,
      footer,
      section,
      article,
      nav,
      canvas,
      aside,
      figcaption,
      figure,
      hgroup,
      menuitem,
      summary,
      time,
      mark,
      audio,
      video {
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
      }

      html {
        box-sizing: border-box;
        font-size: 62.5%;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Oxygen-Sans, 'Fira Sans', 'Droid Sans', Ubuntu, Cantarell,
          'Helvetica Neue', sans-serif;
        font-size: 16px;
        font-size: 1.6rem;
        line-height: 1.5em;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      a {
        text-decoration: none;
      }
      :focus {
        outline: 0;
      }

      pre,
      code,
      kbd,
      samp,
      tt {
        font-family: 'Courier New', Courier, monospace;
        font-size: 1em;
      }

      /*
        Custom Styles
        ---
      */
      body {
        background: black;
        color: white;
      }

      a {
        color: #50e3c2;
      }

      a:hover {
        text-decoration: underline;
      }

      ::selection {
        background-color: #f81ce5;
        color: #fff;
      }

      ::-moz-selection {
        /* Code for Firefox */
        background: #f81ce5;
        color: #fff;
      }

      /* Lists */
      ul,
      ol {
        font-size: 1.2rem;
        margin: 0;
      }

      /* Paragraphs */
      p {
        margin-bottom: 16px;
        font-size: 1.2rem;
      }

      /* Code blocks */
      pre {
        background: #111111;
        padding: 16px 32px;
        margin: 16px 0;
      }

      code {
        font-size: 1.2rem;
        font-family: Menlo, Monaco, 'Lucida Console', 'Liberation Mono',
          'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New',
          monospace, serif;
        color: #bd10e0;
      }

      .plugin__readme *:not(pre) > code:before,
      .plugin__readme *:not(pre) > code:after {
        content: '\u0060';
        margin: 0 2px;
      }

      /* Tables */
      table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 32px;
      }

      table th,
      table td {
        font-size: 1.2rem;
        text-align: left;
        font-weight: 400;
        border: 1px solid #444444;
        padding: 8px;
      }

      table th {
        color: #999999;
      }

      /* Helper Classes */
      .text-uppercase {
        text-transform: uppercase;
      }
    `}</style>
  </div>
)
