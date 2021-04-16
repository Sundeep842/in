import React from 'react'

const TabPanel = (props) => {

  const {index , value , children , ...rest} = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
          <div>{children}</div>
      )}
    </div>
  )
}
export default TabPanel
