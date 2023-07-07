import React, { CSSProperties } from 'react'
import {NavLink} from 'react-router-dom'

interface ILink {
       to:string
       children:React.ReactNode
       style: CSSProperties
}

const Link = ({to , children, style}:ILink) => {
       return (
              
              <NavLink
                     style={style}
                     className={({isActive}) => isActive? 'active' : 'link'}
                     to={to}
              >
                     {children}
              </NavLink>
       )
}

export default Link