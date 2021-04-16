import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText';
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from "react-redux"
import { useTodoSlice } from '../slice'
import { selectError, selectLoading ,selectFormSubmitted} from '../slice/selectors'
import { Close } from '@material-ui/icons';
import { useNavigate} from 'react-router-dom';
import $ from 'jquery';

 const  CreateTodo=()=> {
   
    const todo ={
        title: '',
        description: '',
        assignedTo: '',
        priority: '',
        flag: true,
        dueDate: '', // YYYY-MM-DD
        status: '',
        action: '',
        comments: ''
    }
    
    const dispatch = useDispatch()
    const { actions } = useTodoSlice()
    const isLoading = useSelector(selectLoading)
    const { t } = useTranslation()
    const navigation = useNavigate()
    const error = useSelector(selectError)
    const isSubmitted = useSelector(selectFormSubmitted)
 
    const _validationSchema = Yup.object().shape({
        title: Yup.string().max(75).required(('Title Require')),
        description: Yup.string().max(250).required(('Description Require')),
        assignedTo: Yup.string().max(50).required(('Assign To Require')),
        priority: Yup.string().required(('Priority Require')),
        dueDate: Yup.string().required(('Due Date Require')),
    })

    const submitForm = (values) => {
        console.log(values)
        dispatch(actions.todo(values))
    
      }
      const handleCreateClose = () => {
        $('.CreateNewTask').toggleClass("open")
    }
    return (
        <div>
          <h1>This is create todo form</h1>   
          <Grid container  >
            <div className="CreateNewTask">
                <Button id="close" variant="contained" color="primary" style={{ textTransform: "none", justifyItems: "flex-end", margin: "0px 0px 0px 195px" }} onClick={handleCreateClose}>
                    <Close fontSize="large" style={{ fontSize: "20px" }} />
                </Button>
                <label>Create Task</label>
                {/* {isSubmitted && <Navigate to="/app/partner_manager/todo" />} */}
                <Formik
                    initialValues={todo}
                    validationSchema={_validationSchema}
                    onSubmit={(values) => { submitForm(values) }}
                    >
 {({ values, handleChange, handleBlur, handleSubmit, handleReset, touched, errors, }) => (
                  <form onSubmit={handleSubmit}>
                      
                       {/* <Grid item xs={12}>                                 */}
                                <FormControl style={{ width: '100%' }} >
                                    <TextField
                                        type="text"
                                        variant="standard"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name="title"
                                        fullWidth
                                        value={values.title}
                                        margin="normal"
                                        helperText={touched.title && errors.title}
                                        error={Boolean(touched.title && errors.title)}
                                        label={t('title')}
                                        color="primary" 
                                    />
                                </FormControl>
                            {/* </Grid> */}
                            {/* <Grid container spacing={3}> */}
                {/* <Grid item xs={6}> */}
                            {/* <Grid item xs={12}> */}
                                <FormControl style={{ width: '100%' }}>
                                <InputLabel >Assign To:</InputLabel>
                                    <Select
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="assignedTo"
                                        displayEmpty                                                                    
                                        label={t("assign_to")}
                                        color="primary"
                                        value={values.assignedTo}                                  >
                                        <MenuItem aria-label="None" disabled key={1} >{t("assign_to")}</MenuItem>
                                        <MenuItem value="Swathi" key={2}>Swathi</MenuItem>
                                        <MenuItem value="Farooq" key={3}>Farooq</MenuItem>
                                    </Select>
                                </FormControl>
                            {/* </Grid> */}

                           
                {/* <Grid item xs={6}> */}
                            {/* <Grid item xs={12}> */}
                               
                                <FormControl style={{ width: '100%' }}>
                                <InputLabel >Priority:</InputLabel>
                                    <Select
                                        name="priority"
                                        displayEmpty                                       
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label={t("priority")}
                                        color="primary"
                                        value={values.priority}

                                    >
                                        <MenuItem aria-label="None" disabled key={1} >{t("priority")}</MenuItem>
                                        <MenuItem value="high" key={2}>High</MenuItem>
                                        <MenuItem value="medium" key={3}>Medium</MenuItem>
                                        <MenuItem value="low" key={4}>Low</MenuItem>
                                    </Select>
                                    <FormHelperText error={Boolean(touched.priority && errors.priority)}>{touched.priority && errors.priority}</FormHelperText>
                                </FormControl>
                            {/* </Grid> */}
                            {/* </Grid> */}
                            {/* <Grid container spacing={3}> */}
                            {/* <Grid item xs={6}> */}
                                <InputLabel >{t("due_date")}:</InputLabel>
                                <FormControl style={{ width: '100%' }} >
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="dueDate"
                                        color="primary"
                                        value={values.dueDate}
                                        type="date"
                                        error={Boolean(touched.dueDate && errors.dueDate)}
                                        helperText={touched.dueDate && errors.dueDate}
                                    />
                                </FormControl>
                            {/* </Grid> */}

                            {/* <Grid item xs={6}> */}
                            {/* <Grid item xs={12}> */}
                                {/* <FormControl style={{ width: '100%' }}>
                                    <InputLabel >{t("status")}:</InputLabel>
                                    <Select
                                        name="status"
                                        displayEmpty
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label={t("status")}
                                        color="status"
                                        value={values.status}
                                    >
                                        <MenuItem aria-label="None" disabled key={1} >{t("status")}</MenuItem>
                                        <MenuItem value="Inprogress" key={2}>InProgress</MenuItem>
                                        <MenuItem value="Completed" key={3}>Completed</MenuItem>
                                    </Select>
                                    <FormHelperText error={Boolean(touched.status && errors.status)}>{touched.status && errors.status}</FormHelperText>
                                </FormControl> */}
                            {/* </Grid> */}
                            {/* </Grid> */}
                            {/* <Grid item xs={12}> */}

                                <FormControl style={{ width: '100%' }}>
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="description"
                                        label={t('description')}
                                        color="primary"
                                        value={values.description}
                                        multiline
                                        rows={4}
                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description}
                                    />
                                </FormControl>
                            {/* </Grid> */}
                            {/* <Grid item xs={12}>
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel >Action:</InputLabel>
                                    <Select
                                        name="action"
                                        displayEmpty
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        color="primary"
                                        value={values.action}
                                    >
                                        <MenuItem aria-label="None" disabled key={1} >Action</MenuItem>
                                        <MenuItem value="submit" key={2}>Submit</MenuItem>
                                        <MenuItem value="updated" key={3}>Updated</MenuItem>
                                        <MenuItem value="commented" key={4}>Commented</MenuItem>
                                    </Select>
                                    <FormHelperText error={Boolean(touched.action && errors.action)}>{touched.action && errors.action}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%' }}>
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="comments"
                                        color="primary"
                                        label="Comments"
                                        type="comments"
                                        multiline
                                        rows={4}
                                        value={values.comments}
                                        error={Boolean(touched.comments && errors.comments)}
                                        helperText={touched.comments && errors.comments}
                                    />

                                </FormControl>
                            </Grid> */}
                            <Grid item xs={12}>
                                <MenuItem className="addTaskHolder">
                                 <Button
                                  style={{ marginLeft: "600px" }}
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={isLoading}
                    //   className="btn-blue btn-login"
                    >
                      {t('Add')}
                    </Button>

                                </MenuItem>
                            </Grid>
                           

                  </form>
                
                    )}
                </Formik>
            </div>
        </Grid>
        </div>
    )
}
export default CreateTodo
