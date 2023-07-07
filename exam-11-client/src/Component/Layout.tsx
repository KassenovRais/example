import React, { CSSProperties } from 'react'
import Link from './Link'
import { Outlet } from 'react-router-dom'

const navBar:CSSProperties = {
       display: 'flex',
       alignItems: 'center',
       justifyContent :'space-evenly',
       height: '80px',
       textDecoration: 'none'
}
const linkStyle: CSSProperties = {
       textDecoration: 'none',
       fontSize: '1.5rem',
       fontWeight: '800',
       color:'gray'

}

const Layout = () => {
       return (
              <div>
                     <div 
                            style={navBar}
                     >
                            <Link
                                   style={linkStyle}
                                   to='/'
                            >
                                   POST
                            </Link>
                            <Link
                                   style={linkStyle}
                                   to='show'
                            >
                                   SHOW
                            </Link>
                            <Link
                                   style={linkStyle}
                                   to='sort'
                            >
                                   SORT
                            </Link>
                            <Link
                                   style={linkStyle}
                                   to='showSort'
                            >
                                   SORTSHOW
                            </Link>
                     </div>
                     <div>
                            <Outlet/>
                     </div>
              </div>
       )
}

export default Layout