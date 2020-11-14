import { Keyframes, Frame } from './react-keyframes.ts'
import styles from './terminal.module.css'
import { useState } from 'react'

const sleepDuration = 500
const getTypingDuration = () => 80 + 80 * (Math.random() - 0.5)

const Line = ({ text, noPrompt = false, noCaret = false }) => (
  <>
    {!noPrompt && <span>▲ ~ </span>}
    {text}
    {!noCaret && <span className={styles.caret} />}
  </>
)

const Terminal = () => {
  const [lineCount, setLineCount] = useState(0)

  const renderLine = (text) => {
    const frames = []

    // starting frame
    frames.push(
      <Frame duration={sleepDuration} key={`${text}-first`}>
        <Line />
      </Frame>
    )

    // typing out the line
    for (let i = 0; i < text.length; i++) {
      const isLastLetter = i === text.length - 1
      const duration = isLastLetter ? sleepDuration : getTypingDuration()
      frames.push(
        <Frame duration={duration} key={`${text}-${i}`}>
          <Line text={text.slice(0, i + 1)} />
        </Frame>
      )
    }

    // ending frame
    frames.push(
      <Frame key={`${text}-last`}>
        <Line text={text} noCaret />
      </Frame>
    )

    return (
      <Keyframes component="p" onEnd={() => setLineCount((c) => c + 1)}>
        {frames}
      </Keyframes>
    )
  }

  return (
    <div className={styles.root}>
      <div
        className={`${styles.inner}${lineCount >= 5 ? ' ' + styles.rose : ''}`}
      >
        <div className={styles.header}>
          <span className={styles.icon} />
          <span className={styles.icon} />
          <span className={styles.icon} />
        </div>
        <div className={styles.body}>
          {renderLine('# Hyper is an Electron-based terminal')}
          {lineCount >= 1 && renderLine('# Built on HTML/CSS/JS')}
          {lineCount >= 2 && renderLine('# Fully extensible')}
          {lineCount >= 3 &&
            renderLine('# Install themes and plugins from the command line')}
          {lineCount >= 4 && renderLine('hyper i hyper-rose-pine')}
          {lineCount >= 5 && (
            <>
              <p className={styles.green}>
                <Line
                  text="hyper-rose-pine installed successfully!"
                  noPrompt
                  noCaret
                />
              </p>
              <p>
                <Line />
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Terminal
