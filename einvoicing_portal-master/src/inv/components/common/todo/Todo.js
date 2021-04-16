import React, { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import { TODO } from '../../../constants/Constants';
import * as moment from 'moment';
import {
    Grid,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox
} from '@material-ui/core';
import * as Yup from 'yup';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next'

import { invokeAPIRequest } from '../../../../Request';
import { Close, Star, StarBorder } from '@material-ui/icons';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import getMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        // backgroundColor:'grey',
        flexWrap: 'wrap',
        // '& > *': {
        //     margin: theme.spacing(1),
        //     width: theme.spacing(16),
        //     height: theme.spacing(16),
        // }
    },
    style: { fill: "green" }
}));
const handleCreateClose = () => {
    $('.CreateNewTask').toggleClass("open")
}

const Todo = () => {
    const navigate = useNavigate()
    const [] = React.useState(true);
    const starred = useState(
        {
            flag: false,
        });

    const StarredCheckbox = withStyles({
        root: {
            color: "Black",
            '&$checked': {
                color: "#FFD740",
            },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);
    var today = new Date();
    var datedate = moment(today).format('YYYY-MM-DD');
    const formcontrolstyle = { padding: '0px 0px', width: 400, margin: '2px auto' }
    const stylepaper = { padding: '50px 50px', width: 500, height: 700, margin: '0px auto' }
    const todo = {
        title: '',
        description: '',
        assignedTo: '',
        priority: '',
        flag: '',
        dueDate: datedate, // YYYY-MM-DD
        status: '',
        taskActivities: [{
            action: '',
            comments: ''
        }
        ]
    }
    const { t } = useTranslation()

    // set up form validaion schema wih YUP API
    const _validationSchema = Yup.object().shape({
        title: Yup.string().max(75).required(('Title Require')),
        description: Yup.string().max(250).required(('Description Require')),
        assignedTo: Yup.string().max(50).required(('Assign To Require')),
        priority: Yup.string().required(('Priority Require')),
        dueDate: Yup.string().required(('Due Date Require')),
    })
    const classes = useStyles();
    const myTheme = getMuiTheme({
        checkbox: {
            checkedColor: '#FFD740'
        }
    });
    return (
        <Grid container  >
            <div className="CreateNewTask">
                <Button variant="contained" color="primary" style={{ textTransform: "none", justifyItems: "flex-end", margin: "-50px 0px 0px 200px" }} onClick={handleCreateClose}>
                    <Close fontSize="large" style={{ fontSize: "20px" }} />
                </Button>
                <label>Create Task</label>

                <Formik
                    initialValues={todo}
                    validationSchema={_validationSchema}
                    onSubmit={async (
                        values
                    ) => {

                        // setSubmitting(true)
                        console.log("@@@@@@", values)
                        try {
                            let _login = await invokeAPIRequest(TODO, {
                                title: values.title,
                                description: values.description,
                                assignedTo: values.assignedTo,
                                priority: values.priority,
                                dueDate: values.dueDate,
                                flag: values.flag,
                                status: values.status,
                                taskActivities: [{
                                    action: values.action,
                                    comments: values.comments
                                }]
                            },
                                true, "post");
                            console.log(_login)

                            navigate('/app/partner_manager/todo', { replace: true })
                        } catch (error) {
                            //   let message = t(error.errorCode)
                            //   setLoginError(message)
                        }
                    }}
                >
                    {({ values,
                        errors,
                        touched,
                        isSubmitting,
                        handleBlur,
                        handleChange,
                        handleSubmit
                    }) => (
                        <Form onSubmit={handleSubmit}>

                            <Grid item xs={12}>                                
                                <FormControl style={{ width: '100%' }} >
                                {/* {/ <InputLabel >Title:</InputLabel> /} */}
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="title"                                       
                                        color="primary"
                                        label={t("title")}
                                        fullWidth
                                        error={Boolean(touched.title && errors.title)}
                                        helperText={touched.title && errors.title}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%' }}>
                                <InputLabel >Assign To:</InputLabel>
                                    <Select
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="assignedTo"
                                        displayEmpty                                                                    
                                        label={t("assign_to")}
                                        color="primary"                                    >
                                        <MenuItem aria-label="None" disabled key={1} >{t("assign_to")}</MenuItem>
                                        <MenuItem value="Swathi" key={2}>Swathi</MenuItem>
                                        <MenuItem value="Farooq" key={3}>Farooq</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={12}>
                               
                                <FormControl style={{ width: '100%' }}>
                                <InputLabel >Priority:</InputLabel>
                                    <Select
                                        name="priority"
                                        displayEmpty                                       
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label={t("priority")}
                                        color="primary"

                                    >
                                        <MenuItem aria-label="None" disabled key={1} >{t("priority")}</MenuItem>
                                        <MenuItem value="high" key={2}>High</MenuItem>
                                        <MenuItem value="medium" key={3}>Medium</MenuItem>
                                        <MenuItem value="low" key={4}>Low</MenuItem>
                                    </Select>
                                    <FormHelperText error={Boolean(touched.priority && errors.priority)}>{touched.priority && errors.priority}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} >
                                <InputLabel >{t("due_date")}:</InputLabel>
                                <FormControl style={{ width: '100%' }} >
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="dueDate"
                                           label={t('due_date')}
                                        //    defaultValue={initialValues.dueDate}
                                        // defaultValue={initialValuesG.dueDate}
                                        color="primary"

                                        type="date"
                                        //  defaultValue="2021-10-17"

                                        error={Boolean(touched.dueDate && errors.dueDate)}
                                        helperText={touched.dueDate && errors.dueDate}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel >{t("status")}:</InputLabel>
                                    <Select
                                        name="status"
                                        displayEmpty
                                        //    defaultValue={initialValuesG.status}
                                        //    value={initialValuesG.status}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        label={t("status")}
                                        color="status"
                                    >
                                        <MenuItem aria-label="None" disabled key={1} >{t("status")}</MenuItem>
                                        <MenuItem value="Inprogress" key={2}>InProgress</MenuItem>
                                        <MenuItem value="Completed" key={3}>Completed</MenuItem>
                                    </Select>
                                    <FormHelperText error={Boolean(touched.status && errors.status)}>{touched.status && errors.status}</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>

                                <FormControl style={{ width: '100%' }}>
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="description"
                                        label={t('description')}
                                        //  defaultValue={initialValues.description}
                                        //  value={initialValuesG.description}
                                        color="primary"

                                        multiline
                                        rows={5}

                                        error={Boolean(touched.description && errors.description)}
                                        helperText={touched.description && errors.description}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl style={{ width: '100%' }}>
                                    <InputLabel >Action:</InputLabel>
                                    <Select
                                        name="action"
                                        displayEmpty
                                        // defaultValue={initialValuesG.action}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        //  label="action"
                                        color="primary"
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
                                    {/* {/ <InputLabel >Comments:</InputLabel> /} */}
                                    <TextField
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="comments"
                                        color="primary"
                                        label="Comments"
                                        type="comments"
                                        multiline
                                        rows={5}

                                        error={Boolean(touched.comments && errors.comments)}
                                        helperText={touched.comments && errors.comments}
                                    />

                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <MenuItem className="addTaskHolder">
                                    <Button color="primary" variant="contained" style={{
                                        width: "100%",
                                        borderRadius: "20px",
                                        marginTop: "20px"
                                    }}
                                        type="submit"
                                        disabled={isSubmitting}
                                    >Submit</Button>
                                    <Button
                                    style={{ marginLeft: "600px" }}
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disabled={isSubmitting}
                                >{t('update_task')}</Button>

                                </MenuItem>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    style={{ marginLeft: "600px" }}
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disabled={isSubmitting}
                                >{t('update_task')}</Button>
                            </Grid>

                        </Form>
                    )}
                </Formik>
            </div>
        </Grid>

    )
}

export default Todo;