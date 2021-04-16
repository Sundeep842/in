// import React from 'react';
// import { Form, Formik } from 'formik'
// import { makeStyles } from '@material-ui/core/styles';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import {
//     Grid,
//     TextField,
//     Button,
//     FormControl,
//     InputLabel,
//     Select,
//     Checkbox,
//     Input,
//     MenuItem
// } from '@material-ui/core';
// import * as Yup from 'yup';
// import $ from 'jquery';

// import { useTranslation } from 'react-i18next';
// import {  invokeAPIRequest } from '../../../../Request';
// import { TODO } from '../../../constants/Constants';
// import { Close, Delete} from '@material-ui/icons';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// // import { useFormSlice } from './slice';
// // import {
// //     selectError,
// //     selectLoading,

// //     selectIsFormSubmitted
// // } from './slice/selectors';

// // import {
// //     select_title,
// //     select_assignedTo,
// //     select_priority,
// //     select_dueDate,
// //     select_description,
// //     select_status,
// //     select_action,
// //     select_comments,
// //   } from './selectors';

// function UpdateTodo(props) {  
//     const navigate = useNavigate()     
//     const { t } = useTranslation()
//     const dispatch = useDispatch()
//  const { actions } = useFormSlice()
//     const loading = useSelector(selectLoading)
//     // const error = useSelector(selectError)
//     // const isSubmitted = useSelector(selectIsFormSubmitted)
//     const [] = React.useState(true);

// //   const _title = select(select_title)
// //   const _assignedTo =select(select_assignedTo)
// //   const _priority = select(select_priority)
// //   const _dueDate = select(select_dueDate)
// //   const _description = select(select_description)
// //   const _status =select(select_status)
// //   const _action = select(select_action)
// //   const _comments = select(select_comments)
	
//     // const params={
//     //     title: _title,
//     //     assignedTo: _assignedTo,
//     //     priority: _priority,
//     //     dueDate: _dueDate,
//     //     description: _description,
//     //     status: _status,
//     //     taskActivities: [{
//     //       action: _action,
//     //       comments: _comments
//     //     }
//     //     ]
//     //    }
//     //    console.log(params)
// 	const submitForm = (values) => {
// 		dispatch(actions.todoUpdateform(values))
// 	}

// 	// const useEffectOnMount = (effect) => {
//     // 	useEffect(effect, []);
//   	// };

// 	// useEffectOnMount(() => {
// 	// 	dispatch(actions.loadFormDetails());
//   	// });

//     const initialValuesG=props.data 
//     console.log(initialValuesG);
   
//     const _validationSchema = Yup.object().shape({
//         title: Yup.string().max(75).required(('Title Require')),
//         description: Yup.string().max(250).required(('Description Require')),
//         assignedTo: Yup.string().max(50).required(('Assign To Require')),
//         priority: Yup.string().required(('Priority Require')),
//         dueDate: Yup.string().required(('Due Date Require')),
//     })
//     const params={
//         title: props.data.title,
//         assignedTo: props.data._assignedTo,
//         priority: props.data._priority,
//         dueDate: props.data._dueDate,
//         description: props.data._description,
//         status: props.data._status,
//         taskActivities: [{
//           action: props.data._action,
//           comments: props.data._comments
//         }]}
    
//     const handleUpdateClose = () => {
//         $('.EditUpdateTask').toggleClass("open")
//     }
//     // const useEffectOnMount = (effect) => {
//     // 	useEffect(effect, []);
//   	// };

// 	// useEffectOnMount(() => {
// 	// 	dispatch(actions.loadFormDetails());
//   	// });
//     return (

//         <Grid container  >
//             <div className="EditUpdateTask">
//                 <Button variant="contained" color="primary" style={{ textTransform: "none", justifyItems: "flex-end", margin: "-50px 0px 0px 200px" }} onClick={handleUpdateClose}>
//                     <Close fontSize="large" style={{ fontSize: "20px" }} />
//                 </Button>
//                 <label>Edit Task</label>

//                 <Formik
//                     initialValues={params}
//                     validationSchema={_validationSchema}
//                     onSubmit={(values) => {
//                         console.log(values);
//                         submitForm(values)
//                     }}
//                     enableReinitialize={true}
//                     >
                  
//                     {({ values, errors,
//                         touched,
//                         isSubmitting,
//                         initialValues,
//                         handleBlur,
//                         handleChange,
//                         handleSubmit
//                     }) => (

//                         <Form onSubmit={handleSubmit}>
//                             <Grid item xs={12}>
//                                 <InputLabel >{t("title")}:</InputLabel>
//                                 <FormControl style={{ width: '100%' }} >

//                                     <TextField
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                         name="title"
//                                         defaultValue={initialValuesG.title}
//                                         color="primary"
//                                         // label={t("title")}
//                                         fullWidth
//                                         error={Boolean(touched.title && errors.title)}
//                                         helperText={touched.title && errors.title}
//                                     />
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <InputLabel >{t("assign_to")}:</InputLabel>
//                                 <FormControl style={{ width: '100%' }}>
//                                     <Select
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                         name="assignedTo"
//                                         displayEmpty
//                                         defaultValue={initialValuesG.assignedTo}                                     
                                        
//                                         //  label={t("assign_to")}
//                                         color="primary"
//                                     >
//                                         <MenuItem aria-label="None" disabled key={1} >{t("assign_to")}</MenuItem>
//                                         <MenuItem value="Swathi" key={2}>Swathi</MenuItem>
//                                         <MenuItem value="Farooq" key={3}>Farooq</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </Grid>


//                             <Grid item xs={12}>
//                                 <InputLabel >{t("priority")}:</InputLabel>
//                                 <FormControl style={{ width: '100%' }}>
//                                     <Select
//                                         name="priority"
//                                         displayEmpty
//                                         //     defaultValue={initialValues.priority}
//                                         value={initialValuesG.priority}
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                         //  label={t("priority")}
//                                         color="primary"
                                   
//                                     >
//                                         <MenuItem aria-label="None" disabled key={1} >{t("priority")}</MenuItem>
//                                         <MenuItem value="high" key={2}>High</MenuItem>
//                                         <MenuItem value="medium" key={3}>Medium</MenuItem>
//                                         <MenuItem value="low" key={4}>Low</MenuItem>
//                                     </Select>
//                                     <FormHelperText error={Boolean(touched.priority && errors.priority)}>{touched.priority && errors.priority}</FormHelperText>
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12} >
//                                 <InputLabel >{t("due_date")}:</InputLabel>
//                                 <FormControl style={{ width: '100%' }} >
//                                     <TextField
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                         name="dueDate"
//                                         //   label={t('due_date')}
//                                         //    defaultValue={initialValues.dueDate}
//                                         defaultValue={initialValuesG.dueDate}
//                                         color="primary"

//                                         type="date"
//                                         //  defaultValue="2021-10-17"

//                                         error={Boolean(touched.dueDate && errors.dueDate)}
//                                         helperText={touched.dueDate && errors.dueDate}
//                                     />
//                                 </FormControl>
//                             </Grid>


//                             <Grid item xs={12}>
//                                 <FormControl style={{ width: '100%' }}>
//                                     <InputLabel >{t("status")}:</InputLabel>
//                                     <Select
//                                         name="status"
//                                         displayEmpty
//                                         //    defaultValue={initialValuesG.status}
//                                         value={initialValuesG.status}
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                           label={t("status")}
//                                         color="status"
//                                     >
//                                         <MenuItem aria-label="None" disabled key={1} >{t("status")}</MenuItem>
//                                         <MenuItem value="Inprogress" key={2}>InProgress</MenuItem>
//                                         <MenuItem value="Completed" key={3}>Completed</MenuItem>
//                                     </Select>
//                                     <FormHelperText error={Boolean(touched.status && errors.status)}>{touched.status && errors.status}</FormHelperText>
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <InputLabel >{t("description")}:</InputLabel>
//                                 <FormControl style={{ width: '100%' }}>
//                                     <TextField
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                         name="description"
//                                         //   label={t('description')}
//                                         //  defaultValue={initialValues.description}
//                                         value={initialValuesG.description}
//                                         color="primary"

//                                         multiline
//                                         rows={5}

//                                         error={Boolean(touched.description && errors.description)}
//                                         helperText={touched.description && errors.description}
//                                     />
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <FormControl style={{ width: '100%' }}>
//                                     <InputLabel >Action:</InputLabel>
//                                     <Select
//                                         name="action"
//                                         displayEmpty
//                                         defaultValue={initialValuesG.action}
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                         //  label="action"
//                                         color="action"
//                                     >
//                                         <MenuItem aria-label="None" disabled key={1} >Action</MenuItem>
//                                         <MenuItem value="submit" key={2}>Submit</MenuItem>
//                                         <MenuItem value="updated" key={3}>Updated</MenuItem>
//                                         <MenuItem value="commented" key={4}>Commented</MenuItem>
//                                     </Select>
//                                     <FormHelperText error={Boolean(touched.action && errors.action)}>{touched.action && errors.action}</FormHelperText>
//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <FormControl style={{ width: '100%' }}>
//                                     <InputLabel >Comments:</InputLabel>
//                                     <TextField
//                                         onChange={handleChange}
//                                         onBlur={handleBlur}
//                                         name="comments"
//                                         value={initialValuesG.comments}

//                                         color="primary"
//                                         //   label="Comments"
//                                         type="comments"
//                                         multiline
//                                         rows={5}

//                                         error={Boolean(touched.comments && errors.comments)}
//                                         helperText={touched.comments && errors.comments}
//                                     />

//                                 </FormControl>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <MenuItem className="addTaskHolder">
//                                     <Button color="primary" variant="contained" style={{
//                                         width: "100%",
//                                         borderRadius: "20px",
//                                         marginTop: "20px"
//                                     }}
//                                         type="submit"
//                                         disabled={isSubmitting}                                    
//                                     >Save</Button>
//                                     <Button
//                                         variant="contained"
//                                         color="primary"
//                                         style={{
//                                             width: "100%",
//                                             borderRadius: "20px",
//                                             marginTop: "20px",
//                                             backgroundColor: "#ff7961"
//                                         }}
//                                         startIcon={<Delete />}
//                                         id={initialValuesG.taskRefId}
//                                         onClick={async () => {
//                                             try {
//                                                 // if (window.confirm('Are you sure you want to delete?')) {
//                                                     const url = TODO + "/";
//                                                     let _deleted = await invokeAPIRequest(url +
//                                                          selectedRow.taskRefId, {
//                                                         // title: selectedRow.title,
//                                                         // description: selectedRow.description,
//                                                         // assignedTo: selectedRow.assignedTo,
//                                                         // priority: selectedRow.priority,
//                                                         // dueDate: selectedRow.dueDate,
//                                                         // flag: selectedRow.flag,
//                                                         status: "Deleted"
//                                                     },
//                                                         true, "post");
//                                                     console.log(_deleted)
//                                                     // if (conform === true) {
//                                                     //     setConform(false)
//                                                     // }
//                                                     // else {
//                                                     //     setConform(true)
//                                                     // }
//                                                 // } else {
//                                                 //     setConform(false);
//                                                 // }
//                                             } catch (error) {
//                                                 console.log(error)
//                                             }
//                                         }}
//                                     >
//                                         Delete</Button>
//                                 </MenuItem>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Button
//                                     style={{ marginLeft: "600px" }}
//                                     color="primary"
//                                     variant="contained"
//                                     type="submit"
//                                     disabled={isSubmitting}
//                                 >{t('update_task')}</Button>
//                             </Grid>

//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//         </Grid>


//     )
// }
// export default UpdateTodo;
