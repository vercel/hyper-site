import { withRouter } from 'next/router'
import Link from 'next/link'

const ActiveLink = ({ children, router, href }) => (
  <Link href={href} prefetch>
    <a>
      {children}

      <style jsx>{`
        a {
          font-size: 14px;
          font-size: 1.4rem;
          transition: color 0.2s ease;
          color: ${router.pathname === href ? 'white' : '#999999'};
        }

        a:hover {
          color: white;
        }
      `}</style>
    </a>
  </Link>
)

export default withRouter(ActiveLink)
