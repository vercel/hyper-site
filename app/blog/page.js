import { MDXProvider } from '@mdx-js/react'
import WithPostClient from 'components/blog/with-post-client'

export const metadata = {
  title: 'Hyper 3',
  description: 'Hyper 3: A cross-platform HTML/JS/CSS terminal',
  openGraph: {
    title: 'Hyper™ Blog',
    description: 'Hyper 3: A cross-platform HTML/JS/CSS terminal',
    images: [
      {
        url: 'https://hyper.is/blog/hyper-3-twitter-card.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

const meta = {
  title: 'Hyper 3',
  metaTitle: 'Hyper™ Blog',
  metaDescription: 'Hyper 3: A cross-platform HTML/JS/CSS terminal',
  metaImage: 'https://hyper.is/blog/hyper-3-twitter-card.png',
  authors: [
    {
      name: 'Juan Campa',
      twitter: 'juancampa',
      thumbnail: 'https://vercel.com/api/www/avatar/?u=juan&s=160',
    },
    {
      name: 'Julien Déléan',
      twitter: 'CHaBou69',
      thumbnail: 'https://vercel.com/api/www/avatar/?u=chabou&s=160',
    },
    {
      name: 'Daniel Imms',
      twitter: 'tyriar',
      thumbnail: 'https://vercel.com/api/www/avatar/?u=tyriar&s=160',
    },
  ],
}

export default function BlogPage() {
  return (
    <div className="blog-post">
      <WithPostClient meta={meta}>
        <>
          <p>
            <strong>Hyper 3 is finally out!</strong> The primary focus for this
            release is <strong>performance</strong>.
          </p>
          <p>
            The latest version includes several enhancements that make Hyper
            <em>really</em> fast. For those of us who spend a significant amount
            of time on the command line, this release is a total game changer.
          </p>
          <p>
            <a href="/#installation">Download Hyper 3</a> to try it out, and read on to learn more about
            what's new.
          </p>
          <video
            src="/blog/comparison.mp4"
            loop
            muted
            autoPlay
            playsInline
            className="oversize"
          />
          <h2>Getting There</h2>
          <p>
            Looking back on this release, a pleasant surprise has been how little
            time it took from <em>"let's make this thing faster"</em> to
            <em>"Holy shell! That's fast!"</em>
          </p>
          <p>
            Below, we visit some of the important changes that were shipped as
            part of this release:
          </p>
          <h2>WebGL Renderer</h2>
          <p>
            The renderer is the piece of code that draws actual pixels on the
            screen based on the state of the terminal. The original Hyper renderer
            was based on the DOM. While that was a flexible approach thanks to
            CSS, it was also very slow.
          </p>
          <p>
            Hyper 2 improved upon this by switching from <code>hterm</code> to
            <code>xterm.js</code> and using its canvas-based renderer. While that
            made Hyper 2 faster, for Hyper 3 we knew it was possible to deliver
            even faster performance by completely rewriting the renderer with <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API">WebGL</a>. By fortunate coincidence, as we were still figuring things out, <a href="https://github.com/tyriar">Daniel Imms</a> (from
            <code>xterm.js</code> and <code>VSCode</code> fame),
            <a href="https://twitter.com/Tyriar/status/1064932797016489984">just returned from a "vacation"</a>
            where he happened to be write a shiny new WebGL renderer.
          </p>
          {/* Rest of the blog content */}
          <p>
            Isn't the open source community just amazing? We immediately merged
            Daniel's branch onto a test fork, and well, it ran circles around
            Hyper 2. Thanks <a href="https://twitter.com/Tyriar">Daniel</a>!
          </p>
          {/* Continue with the rest of the blog content */}
          <h2>The Road Ahead</h2>
          <p>
            Terminals have existed since the 60s, and have been a powerful tool in
            our workflows. Their flexibility guarantees that they will remain
            relevant for years to come. <a href="https://twitter.com/rauchg/status/1074381303506587650">We're in for the long haul</a>.
          </p>
          <p>
            Hyper is a new kind of terminal, built on top of web technology, with
            a focus on extensibility. This opens new possibilities that can make
            the CLI experience <a href="https://github.com/chabou/hyper-pane">more productive</a> (and <a href="https://github.com/Aaronius/hyper-cat">fun</a>)!
          </p>
          <p>
            We're excited to keep improving Hyper, both in terms of performance
            and capabilities — there's a lot to do. Hyper is completely open
            source, and we welcome your <a href="https://github.com/vercel/hyper">involvement and contribution</a>.
          </p>
          <h2>Acknowledgments</h2>
          <p>
            We're genuinely thankful to the open source community. We're not
            saying this only because we are building on top of an incredible set
            of open source libraries, but also because we find the helpful ethos
            of the community very touching.
          </p>
          <p>
            As soon as the <a href="https://github.com/xtermjs/xterm.js/"><code>xterm.js</code></a>
            team heard we were working on performance, they jumped right in and
            helped us with feedback and several initiatives they had on their
            side. We would like to extend huge thanks to <a href="https://github.com/tyriar">Daniel Imms</a>, <a href="https://github.com/jerch">@Jerch</a> and <a href="https://github.com/stanzilla">Benjamin Staneck</a> for their
            contribution and feedback.
          </p>
        </>
      </WithPostClient>
    </div>
  )
}
