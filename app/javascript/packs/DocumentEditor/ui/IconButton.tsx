import React from "react"

const IconButton = (props: { children: any, active?: boolean, toggleActive?: () => VoidFunction, onClick?: () => void }) => {
  return (
    <span 
      className={`material-symbols-rounded btn-icon ${props.active ? 'btn-icon__selected' : ''}`} 
      onClick={() => props.toggleActive?.() || props.onClick?.()}
    >
      {props.children}
    </span>
  )
}

export default IconButton