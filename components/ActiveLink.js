import { withRouter } from 'next/router'

const ActiveLink = ({ children, router, href }) => {
  const style = {
    color: router.pathname === href ? 'white' : '#999999'
  }

  const handleClick = (event) => {
    event.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}

      <style jsx>{`
        a {
          font-size: 14px;
          font-size: 1.8rem;
        }
        a:not(:last-of-type) { margin-right: 24px; }
      `}</style>
    </a>
  )
}

export default withRouter(ActiveLink)
