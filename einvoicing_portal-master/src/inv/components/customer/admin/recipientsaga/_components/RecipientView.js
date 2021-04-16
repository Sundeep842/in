import React, { useState, useEffect } from 'react'
import {
  TextField, Button, Grid, Typography, InputLabel, Select, FormControl, Table,
  TableRow,
  TableBody,
  TableCell, MenuItem
} from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRecipientSlice } from '../slice'
import { useDispatch, useSelector } from "react-redux"
import { selectAllRecipients } from '../slice/selectors'
import MetaformData from '../MetaformData'
import '../../../../common/enquiry/enquiry.css';


const RecipientView = (props) => {
  let rows = []
  let { uid } = useParams();
  const { t } = useTranslation();
  const { recipientDetails } = MetaformData
  const { recipientTag, description, deliveryMode } = recipientDetails



  const dispatch = useDispatch()
  const { actions } = useRecipientSlice()
  const recpList = useSelector(selectAllRecipients)

  const useEffectOnMount = (effect) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    console.log("useeffect mount called")
    dispatch(actions.loadFormDetails());
  });
  const _loadRows = () => {
    //   alert('_loadRows called')
    const x = recpList.map((item, i) => ({
      ...item,
      id: i
    }))
    console.log(x)
    rows = x
    rows.deliveryMode = x
    console.log(rows.deliveryMode[0])
  }


  return (
    <div>
      {/* <h1>view form</h1> */}
      <Grid container>
        {recpList.length > 0 && _loadRows()}
        <Grid xs={6}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="rowLabel">{recipientTag.label}</TableCell>
                <TableCell>{rows[uid].recipientTag}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="rowLabel">{description.label}</TableCell>
                <TableCell>{rows[uid].description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="rowLabel">{deliveryMode.label}</TableCell>
                <TableCell>{rows[uid].deliveryMode}</TableCell>
              </TableRow>

            </TableBody>
          </Table>

        </Grid>
      </Grid>
    </div>

  )
}

export default RecipientView