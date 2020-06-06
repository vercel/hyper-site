import { Keyframes, Frame } from 'react-keyframes'
import styles from './terminal.module.css'

const Line = ({ text, noPrompt = false, noCaret = false }) => (
  <p>
    {!noPrompt && <span>▲ ~ </span>}
    {text}
    {!noCaret && <span className={styles.caret} />}
  </p>
)

const Terminal = () => (
  <div className={styles.root}>
    <div className={styles.inner}>
      <div className={styles.header}>
        <span className={styles.icon} />
        <span className={styles.icon} />
        <span className={styles.icon} />
      </div>
      <Keyframes component="div" className={styles.body}>
        <Frame duration={2000}>
          <Line />
        </Frame>
        <Frame duration={100}>
          <Line text="l" />
        </Frame>
        <Frame duration={500}>
          <Line text="ls" />
        </Frame>
        <Frame duration={600}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line />
        </Frame>
        <Frame duration={100}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="c" />
        </Frame>
        <Frame duration={70}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="ca" />
        </Frame>
        <Frame duration={70}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="cat" />
        </Frame>
        <Frame duration={60}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="cat " />
        </Frame>
        <Frame duration={80}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="cat i" />
        </Frame>
        <Frame duration={80}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="cat in" />
        </Frame>
        <Frame duration={80}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="cat inf" />
        </Frame>
        <Frame duration={80}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="cat info" />
        </Frame>
        <Frame duration={80}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="cat info." />
        </Frame>
        <Frame duration={80}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="cat info.t" />
        </Frame>
        <Frame duration={80}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="cat info.tx" />
        </Frame>
        <Frame duration={80}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="cat info.txt" />
        </Frame>
        <Frame duration={800}>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="cat info.txt" />
        </Frame>
        <Frame>
          <Line text="ls" noCaret />
          <Line text="info.txt" noCaret noPrompt />
          <Line text="cat info.txt " noCaret />
          <Line
            text={
              '- Hyper is an Electron-based terminal\n- Built on HTML/CSS/JS\n- Fully extensible'
            }
            noCaret
            noPrompt
          />
          <Line />
        </Frame>
      </Keyframes>
    </div>
  </div>
)

export default Terminal
