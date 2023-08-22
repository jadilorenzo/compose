import React, { useState } from 'react'

export const FocusContext = React.createContext<any>({})

const FocusProvider = (props: { children: React.ReactNode }) => {
  const [focus, setFocus] = useState(true)
  const value = { focus, setFocus }

  return (
    <FocusContext.Provider value={value}>
      {props.children}
    </FocusContext.Provider>
  )
}

export default FocusProvider