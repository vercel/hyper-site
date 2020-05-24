import Head from 'next/head'
import DownloadButton from 'components/download-button'
import Page from 'components/page'
import Author from 'components/author'
import styles from 'styles/pages/blog/hyper3.module.css'

const authors = [
  {
    name: 'Juan Campa',
    twitter: 'juancampa',
    thumbnail: 'https://zeit.co/api/www/avatar/?u=juan&s=160',
  },
  {
    name: 'Julien Déléan',
    twitter: 'CHaBou69',
    thumbnail: 'https://zeit.co/api/www/avatar/?u=chabou&s=160',
  },
  {
    name: 'Daniel Imms',
    twitter: 'tyriar',
    thumbnail: 'https://zeit.co/api/www/avatar/?u=tyriar&s=160',
  },
]

export default () => (
  <Page>
    <Head>
      <title>Hyper™ Blog</title>
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@zeithq" />
      <meta property="og:title" content="Hyper™" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://hyper.is" />
      <meta
        property="description"
        content="Hyper 3: A cross-platform HTML/JS/CSS terminal"
      />
      <meta
        property="og:description"
        content="Hyper 3: A cross-platform HTML/JS/CSS terminal"
      />
      <meta
        property="og:image"
        content="https://hyper.is/blog/hyper-3-twitter-card.png"
      />
    </Head>

    <article className={styles.root}>
      <header className={styles.header}>
        <h1>Hyper 3</h1>
        <div className={styles.authors}>
          {authors.map((author, i) => (
            <Author key={i} {...author} />
          ))}
        </div>
      </header>

      <section className={styles.content}>
        <p>
          <strong>Hyper 3 is finally out!</strong> The primary focus for this
          release is <strong>performance</strong>.
        </p>
        <p>
          The latest version includes several enhancements that make Hyper{' '}
          <em>really</em> fast. For those of us who spend a significant amount
          of time on the command line, this release is a total game changer.
        </p>
        <p>
          Download Hyper 3 below to try it out, and read on to learn more about
          what's new.
        </p>
        <div className={styles.button}>
          <DownloadButton />
        </div>
        <video
          src="/blog/comparison.mp4"
          className={styles.oversize}
          autoPlay
          loop=""
          width="1200"
          height="470"
        />
        <h2>Getting There</h2>
        <p>
          Looking back on this release, a pleasant surprise has been how little
          time it took from <em>"let's make this thing faster"</em> to{' '}
          <em>"Holy shell! That's fast!"</em>
        </p>
        <p>
          Below, we visit some of the important changes that were shipped as
          part of this release:
        </p>
        <h3>WebGL Renderer</h3>
        <p>
          The renderer is the piece of code that draws actual pixels on the
          screen based on the state of the terminal. The original Hyper renderer
          was based on the DOM. While that was a flexible approach thanks to
          CSS, it was also very slow.
        </p>
        <p>
          Hyper 2 improved upon this by switching from <code>hterm</code> to{' '}
          <code>xterm.js</code> and using its canvas-based renderer. While that
          made Hyper 2 faster, for Hyper 3 we knew it was possible to deliver
          even faster performance by completely rewriting the renderer with{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API">
            WebGL
          </a>
          . By fortunate coincidence, as we were still figuring things out,{' '}
          <a href="https://github.com/tyriar">Daniel Imms</a> (from{' '}
          <code>xterm.js</code> and <code>VSCode</code> fame),{' '}
          <a href="https://twitter.com/Tyriar/status/1064932797016489984">
            just returned from a "vacation"
          </a>{' '}
          where he happened to be write a shiny new WebGL renderer.
        </p>
        <p>
          Isn't the open source community just amazing? We immediately merged
          Daniel's branch onto a test fork, and well, it ran circles around
          Hyper 2. Thanks <a href="https://twitter.com/Tyriar">Daniel</a>!
        </p>
        <p>
          We are aware of a few minor limitations with using this renderer (e.g
          selection is always black-and-white, and you can't have more than 16
          terminals visible simultaneously) but the performance benefits
          outweigh them. The new renderer is still work-in-progress, so you can
          expect further improvements in the near future.
        </p>
        <h3>IPC Batching</h3>
        <p>
          We also discovered that commands that were very verbose would cause
          Hyper to temporarily choke for a few seconds. For example, running{' '}
          <code>find ~</code> would cause Hyper to:
        </p>
        <ul>
          <li>Run painfully slow for ~5 seconds (at ~1 frame-per-second)</li>
          <li>
            Suddenly get faster (at ~15 frames-per-second) and finish printing
            everything in ~10 seconds.
          </li>
        </ul>
        <p>
          Digging within the CPU profile, we noticed that the "renderer" process
          was spending most of its time handling an overwhelming amount of
          messages coming in from the main process.
        </p>
        <img
          className={styles.oversize}
          src="/blog/hyper2.png"
          load="lazy"
          width="5469"
          height="1297"
        />
        <p className={styles.caption}>Hyper 2</p>
        <img
          className={styles.oversize}
          src="/blog/hyper3.png"
          load="lazy"
          width="5493"
          height="1315"
        />
        <p className={styles.caption}>Hyper 3</p>
        <p className={styles.caption}>
          It is easy to see the difference between Hyper v2 and v3.
          <br />
          The pink segments represent the time spent in processing IPC, instead
          of parsing or rendering.
        </p>
        <p>
          Electron uses a multi-process architecture where each window runs on
          its own separate "renderer" process. Additionally, there's one
          Node.js-based "main" process that communicates directly with the
          underlying OS. In order for terminal data to be rendered by Hyper, it
          must be passed from the main process to the renderer process using IPC
          (Inter-Process Communication).
        </p>
        <p>
          <strong>
            Node's IPC, unfortunately, comes with a non-trivial amount of
            overhead.&nbsp;
          </strong>
          Messages are sent back and forth as <strong>JSON strings</strong>,
          which must be encoded on one side and decoded on the other. Also,
          receiving data through IPC is an async operation, and thus queued in
          V8's event loop. Yielding back to the event loop each time after
          processing small messages makes matters further worse. This repeated
          IPC caused thrashing when processing bursts of text (like running{' '}
          <code>cat</code> on a large file).
        </p>
        <p>
          To mitigate this problem, we came up with a simple solution:{' '}
          <strong>
            batch data into larger chunks before sending them to the renderer
            process
          </strong>
          . IPC batching reduces the number of messages for verbose commands
          significantly and allows the renderer to focus on, well, rendering.
        </p>
        <p>
          One important consideration was to{' '}
          <strong>
            batch as much data as possible to reduce the IPC overhead, but not
            so much that we introduce perceivable latency
          </strong>
          . With this approach, the renderer process now spends most of its time
          doing terminal emulation and rendering instead of processing IPC
          messages. The outcome is a much smoother, and faster terminal.
        </p>
        <p>
          On a similar vein, we are also testing a new approach to{' '}
          <a href="https://github.com/zeit/xterm.js/pull/4/files">
            decide how much data is parsed
          </a>{' '}
          before yielding to the renderer. The idea is to prevent skipped frames
          for a more responsive terminal.
        </p>
        <h3>Electron V3</h3>
        <p>
          Hyper 3 bumps the underlying Electron from V1 to V3. We also tested
          V4, but a{' '}
          <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=683994#c35">
            regression in the Canvas API
          </a>{' '}
          forced us to stay on V3. The upgrade brings in newer versions of V8
          and Node.js, and their corresponding bug fixes.
        </p>
        <h3>Faster Startup Time</h3>
        <p>
          Hyper 3 improves startup time by creating the first{' '}
          <em>pseudoterminal (pty)</em> as soon as possible. A pty is a facility
          provided by operating systems to allow programs such as Hyper to
          emulate terminals.
        </p>
        <p>
          In previous versions, Hyper would wait for the Chromium window to
          open, send an "I'm ready" message, and <em>only then</em> create the
          pty. Those two activities take a substantial amount of time, but could
          be done in parallel.
        </p>
        <p>
          Hyper 3 starts initializing both at the same time. By the time the
          window says "I'm ready", the pty is already warmed-up and ready to be
          consumed. This gives Hyper 3 a decent boost in launch time (about
          150ms on Linux, potentially better on other platforms).
        </p>
        <h3>Emoji Support</h3>
        <p>
          If you're on MacOS, you can now press{' '}
          <code>Command + Control + Space</code> to get an emoji popup and{' '}
          <a href="https://gitmoji.carloscuesta.me/">
            jazz up those commit messages
          </a>
          .
        </p>
        <img
          src="/blog/supports-emoji.png"
          load="lazy"
          width="1062"
          height="950"
        />
        <p className={styles.caption}>
          With the new emoji support, introducing emoji within Git commits (or
          elsewhere) is easier than ever.
        </p>
        <h3>More Themes on Hyper Store</h3>
        <p>
          Since Hyper 2, we have added many new themes into the{' '}
          <a href="https://hyper.is/themes?newest">Hyper Store</a>. This means
          it's now even easier to customise your Hyper experience to your
          personality.
        </p>
        <p>
          We have a detailed contribution page that explains how you can go
          about{' '}
          <a href="https://github.com/zeit/hyper-site/wiki/Submitting-a-new-plugin-or-theme-to-Hyper-Store">
            enlisting your extension
          </a>
          . We encourage all contribution and look forward to adding more themes
          and plugins from the community!
        </p>
        <img src="/blog/themes.png" load="lazy" width="1800" height="1360" />
        <p className={styles.caption}>
          Hyper supports themes, allowing you to customise your development
          experience.
        </p>
        <h2>The Road Ahead</h2>
        <p>
          Terminals have existed since the 60s, and have been a powerful tool in
          our workflows. Their flexibility guarantees that they will remain
          relevant for years to come.{' '}
          <a href="https://twitter.com/rauchg/status/1074381303506587650">
            We're in for the long haul
          </a>
          .
        </p>
        <p>
          Hyper is a new kind of terminal, built on top of web technology, with
          a focus on extensibility. This opens new possibilities that can make
          the CLI experience{' '}
          <a href="https://github.com/chabou/hyper-pane">more productive</a>{' '}
          (and <a href="https://github.com/Aaronius/hyper-cat">fun</a>)!
        </p>
        <p>
          We're excited to keep improving Hyper, both in terms of performance
          and capabilities — there's a lot to do. Hyper is completely open
          source, and we welcome your{' '}
          <a href="https://github.com/zeit/hyper">
            involvement and contribution
          </a>
          .
        </p>
        <h2>Acknowledgments</h2>
        <p>
          We're genuinely thankful to the open source community. We're not
          saying this only because we are building on top of an incredible set
          of open source libraries, but also because we find the helpful ethos
          of the community very touching.
        </p>
        <p>
          As soon as the{' '}
          <a href="https://github.com/xtermjs/xterm.js/">
            <code>xterm.js</code>
          </a>{' '}
          team heard we were working on performance, they jumped right in and
          helped us with feedback and several initiatives they had on their
          side. We would like to extend huge thanks to{' '}
          <a href="https://github.com/tyriar">Daniel Imms</a>,{' '}
          <a href="https://github.com/jerch">@Jerch</a> and{' '}
          <a href="https://github.com/stanzilla">Benjamin Staneck</a> for their
          contribution and feedback.
        </p>
      </section>
    </article>
  </Page>
)
