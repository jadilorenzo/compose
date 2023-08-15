import React from "react"

const IconButton = (props: { children: any, active?: boolean, toggleActive?: () => void, onClick?: () => void, tooltip?: string }) => {
  return (
    <span className={props.tooltip ? "tooltip" : ""}>
      <span 
        className={`material-symbols-rounded btn-icon ${props.active ? 'btn-icon__selected' : ''}`} 
        onClick={() => props.toggleActive?.() || props.onClick?.()}
      >
        {props.children}
      </span>
      <span className="tooltip-text">{props.tooltip}</span>
    </span>
  )
}

export default IconButton