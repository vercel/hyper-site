import { withRouter } from 'next/router'
import Link from 'next/link'

const ActiveLink = ({ children, router, href }) => (
  <Link href={href}>
    <a>
      {children}

      <style jsx>{`
        a {
          font-size: 14px;
          font-size: 1.4rem;
          transition: color 0.12s ease-in-out;
          color: ${router.pathname === href ? 'white' : '#999999'};
        }

        a:not(:last-of-type) {
          margin-right: 24px;
        }

        a:hover {
          color: white;
        }
      `}</style>
    </a>
  </Link>
)

export default withRouter(ActiveLink)
