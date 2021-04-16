import React  from 'react'
import { useFormikContext } from 'formik'
import {
  makeStyles
} from '@material-ui/core'

const useStyles = makeStyles(() => ({

  container: {
    padding: '10px'
  },
  label: {
    padding: '5px'
  },
  value: {
    padding: '5px'
  }

}))

const ReadOnlyInputField = (props) => {
  const context = useFormikContext()
  const classes = useStyles()
  let main = context.values[props.name.split(".")[0]]
  return (
    <div class={classes.container}>
      <span class={classes.label}>{props.label}</span>
      <p class={classes.value}>{ main != null ? context.values[props.name.split(".")[0]][[props.name.split(".")[1]]] : ""}</p>
    </div>
  )
}
export default ReadOnlyInputField
