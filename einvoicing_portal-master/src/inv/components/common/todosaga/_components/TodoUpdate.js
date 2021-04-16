
import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Formik } from 'formik'
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
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from "react-redux"
import { useTodoSlice } from '../slice'
import {selectError, selectLoading, selectAllTodo, selectFormSubmitted } from '../slice/selectors'
import { Close, Star, StarBorder } from '@material-ui/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import $ from 'jquery';

const TodoUpdate = (props) => {
   
    const StarredCheckbox = withStyles({
        root: {
            color: "Black",
            '&$checked': {
                color: "#FFD740",
            },
        },
        checked: {},
    })((props) => <Checkbox color="default" {...props} />);


    const dispatch = useDispatch()
    const { actions } = useTodoSlice()
    const isLoading = useSelector(selectLoading)
    const isupdated = useSelector(selectFormSubmitted)
    const { t } = useTranslation()
    const navigation = useNavigate()
    const error = useSelector(selectError)
    const todoList = useSelector(selectAllTodo)
    const submitForm = (values) => {
        // values.taskRefId = props.id.taskRefId
        console.log(values)
        dispatch(actions.todoview(values))
        navigation("/app/partner_manager/todo", { replace: true }  )   
        }
    console.log("=========================================", props.id);
    console.log(todoList)
    const params = {
        taskRefId: todoList[props.id].taskRefId,
        title: todoList[props.id].title,
        description: todoList[props.id].description,
        assignedTo: todoList[props.id].assignedTo,
        priority: todoList[props.id].priority,
        flag: todoList[props.id].flag,
        dueDate: todoList[props.id].dueDate,
        status: todoList[props.id].status,
        action: todoList[props.id].action,
        comments: todoList[props.id].comments
    }

    const handleCreateClose = () => {
        $('.EditUpdateTaskToDo').toggleClass("open")
    }

    const useEffectOnMount = (effect) => {
        useEffect(effect, []);
    };

    useEffectOnMount(() => {
        console.log("useeffect mount called")
        dispatch(actions.loadFormDetails());
    });

    return (
        <>
            
            <Grid container  >
                <div className="EditUpdateTaskToDo">
                    <Button id="close" variant="contained" color="primary" style={{ textTransform: "none", justifyItems: "flex-end", margin: "-27px 46px 35px 295px" }} onClick={handleCreateClose}>
                        <Close fontSize="large" style={{ fontSize: "20px" }} /> 
                    </Button>
                    <label>Update Task</label>

                    <Formik
                        initialValues={params}
                        // validationSchema={_validationSchema}
                        onSubmit={(values) => { submitForm(values) }}
                    >
                        {({ values, defaultValue, handleChange, handleBlur, handleSubmit, handleReset, touched, errors, }) => (
                            <form onSubmit={handleSubmit}>
                                {/* <div className=""> */}
                                {/* <Grid item xs={12}>
                                <FormControl  >
                                    <StarredCheckbox
                                        color="primary"
                                        label="flag"
                                        name="flag"
                                        onChange={handleChange}
                                        checked={values.flag}
                                        inputProps={{ 'aria-label': 'secondary checkbox', 'spacing': '6' }}
                                        checkedIcon={<Star />}
                                        icon={<StarBorder />}
                                    />
                                </FormControl>
                                </Grid> */}
                                {/* </div> */}
                                
                                
                                {/* <Grid item xs={12}> */}
                                    <FormControl style={{ width: '100%' }} >
                                        <TextField
                                            type="text"
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            name="title"
                                            fullWidth
                                            //  defaultValue={props.id.title || ""}
                                            // value={props.id.title || ''}
                                            value={values.title|| ""}
                                            margin="normal"
                                            helperText={touched.title && errors.title}
                                            error={Boolean(touched.title && errors.title)}
                                            label={t('title')}
                                            color="primary"
                                        />
                                    </FormControl>
                                {/* </Grid> */}
         <Grid container spacing={3}>
                <Grid item xs={6}>
                                
                                    <FormControl style={{ width: '100%' }}>
                                        <InputLabel >Assign To:</InputLabel>
                                        <Select
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="assignedTo"
                                            displayEmpty
                                            label={t("assign_to")}
                                            color="primary"
                                            // value={props.id.assignedTo || ''}
                                            value={values.assignedTo}
                                        >
                                            <MenuItem aria-label="None" disabled key={1} >{t("assign_to")}</MenuItem>
                                            <MenuItem value="Swathi" key={2}>Swathi</MenuItem>
                                            <MenuItem value="Farooq" key={3}>Farooq</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>


                                <Grid item xs={6}>
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
                                        // value={props.id.priority || ''}

                                        >
                                            <MenuItem aria-label="None" disabled key={1} >{t("priority")}</MenuItem>
                                            <MenuItem value="high" key={2}>High</MenuItem>
                                            <MenuItem value="medium" key={3}>Medium</MenuItem>
                                            <MenuItem value="low" key={4}>Low</MenuItem>
                                        </Select>
                                        <FormHelperText error={Boolean(touched.priority && errors.priority)}>{touched.priority && errors.priority}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                <Grid item xs={6}>
                               
                                    <FormControl style={{ width: '100%' }} >
                                        <TextField
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="dueDate"
                                            label={t('due_date')}
                                            color="primary"
                                            value={values.dueDate}
                                            // value={props.id.dueDate || ''}
                                            type="date"
                                            error={Boolean(touched.dueDate && errors.dueDate)}
                                            helperText={touched.dueDate && errors.dueDate}
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={6}>
                               
                                    <FormControl style={{ width: '100%' }}>
                                        <InputLabel >{t("status")}:</InputLabel>
                                        <Select
                                            name="status"
                                            displayEmpty
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            label={t("status")}
                                            color="status"
                                            value={values.status}
                                        // value={props.id.status || ''}
                                        >
                                            <MenuItem aria-label="None" disabled key={1} >{t("status")}</MenuItem>
                                            <MenuItem value="Inprogress" key={2}>InProgress</MenuItem>
                                            <MenuItem value="Completed" key={3}>Completed</MenuItem>
                                            <MenuItem value="Deleted" key={3}>Delete</MenuItem>
                                        </Select>
                                        <FormHelperText error={Boolean(touched.status && errors.status)}>{touched.status && errors.status}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                </Grid>
                                <Grid item xs={12}>

                                    <FormControl style={{ width: '100%' }}>
                                        <TextField
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="description"
                                            label={t('description')}
                                            color="primary"
                                            value={values.description}
                                            // value={props.id.description || ''}
                                            multiline
                                            rows={3}
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
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            color="primary"
                                            value={values.action}
                                        // value={props.id.action|| ''}
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
                                            // value={props.id.comments || ''}
                                            error={Boolean(touched.comments && errors.comments)}
                                            helperText={touched.comments && errors.comments}
                                        />

                                    </FormControl>
                                </Grid>
                                 {/* <Grid item xs={12}> */}
                                <FormControl  >
                                    <StarredCheckbox
                                        color="primary"
                                        label="flag"
                                        name="flag"
                                        onChange={handleChange}
                                        checked={values.flag}
                                        inputProps={{ 'aria-label': 'secondary checkbox', 'spacing': '6' }}
                                        checkedIcon={<Star />}
                                        icon={<StarBorder />}
                                    />
                                </FormControl>
                                {/* </Grid> */}
                                {/* <Grid item xs={12}> */}
                                    <MenuItem className="addTaskHolder">

                                        <Button
                                            style={{ marginLeft: "600px" }}
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            disabled={isLoading}
                                            // className="btn-blue btn-login"
                                        >
                                            {t('Update')}
                                        </Button>

                                    </MenuItem>
                                {/* </Grid> */}


                            </form>

                        )}
                    </Formik>
                </div>
            </Grid>

        </>

    )
}
export default TodoUpdate