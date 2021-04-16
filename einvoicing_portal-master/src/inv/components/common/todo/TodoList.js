import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { Form, Formik } from 'formik'
import MenuList from '@material-ui/core/MenuList';
import React, { useState, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import Star from '@material-ui/icons/Star';
import Error from '@material-ui/icons/Error';
import Delete from '@material-ui/icons/Delete';
import Done from '@material-ui/icons/Done';
import CheckBox from '@material-ui/icons/CheckBox';
import Typography from "@material-ui/core/Typography";
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Input } from '@material-ui/core';
import { invokeAPIGetRequest, invokeAPIRequest } from '../../../../Request';
import { TODO, TODO_PRIORITY } from '../../../constants/Constants';
import { TODO_STATUS } from '../../../constants/Constants';
import { TODO_FLAG } from '../../../constants/Constants';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Todo from './Todo';
// import UpdateTodo from './UpdateTodo';
import "./todo.css";
import * as moment from 'moment';
import * as Yup from 'yup';
import StatusChip from "./StatusChip";
import { Close, ListAlt, LowPriorityRounded, NotInterested, PriorityHighRounded, StarBorder } from '@material-ui/icons';
import $ from 'jquery';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
// import CreateTodo from './CreateTodo';
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    strikeThroughtextStyle: {
        textDecorationLine: 'line-through',
    },
}));
const StarredCheckbox = withStyles({
    root: {
        color: "Black",
        '&$checked': {
            color: "#FFD740",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
function TodoList(props) {
  
    const [page, setPage] = React.useState(0);
    const rowclickval = useState([]);
    const [tid, setTid] = useState(0);
    const [priorityval, setPriorityval] = useState({ priority: 'high' });
    const starred = useState({
        flag: false,
    });
    const [conform, setConform] = useState(false);
    const classes = useStyles();
    const [value, setValue] = useState("All");
    const [rowData, setRowData] = useState([]);
    const [responseData, setResponseData] = useState()
    const [rows, setRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState({})

    var stateVariables = useState({
        title: "",
        description: "",
    })
    const data = [];
    const { t } = useTranslation();
    let temptemp;
    let tempArray;
    let tempId;
    const navigate = useNavigate();
    let tempSelectedData;
    var today = new Date();
    var datedate = moment(today).format('YYYY-MM-DD');
    const handleChangestar = (event) => {

        console.log("STARRRRRRRRRRed", event.target.checked)
        console.log("STA", starred)

    };
    const columns = [
        {
            field: 'flag',
            headerName: 'Flag',
            width: 50,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    params.row.flag === "true" ?
                        <StarredCheckbox
                            color="primary"
                            onChange={
                                async (event) => {
                                    try {

                                        console.log(params)
                                        const url = TODO + "/";
                                        let _starred = await invokeAPIRequest(url + params.row.taskRefId, {
                                            title: params.row.title,
                                            description: params.row.description,
                                            assignedTo: params.row.assignedTo,
                                            priority: params.row.priority,
                                            dueDate: params.row.dueDate,
                                            flag: event.target.checked,
                                            status: params.row.status
                                        },
                                            true, "post");
                                        navigate('/app/partner_manager/todo', { replace: true })
                                        console.log(_starred)


                                    } catch (error) {
                                        console.log(error)
                                    }
                                }
                            }
                            label="flag"
                            name="flag"
                            checked={params.row.flag}
                            inputProps={{ 'aria-label': 'secondary checkbox', 'spacing': '6' }}
                            checkedIcon={<Star />}
                            icon={<StarBorder />}

                        /> :
                        params.row.flag === "false" ?
                            <StarredCheckbox
                                color="primary"
                                onChange={async (event) => {
                                    try {
                                        console.log(params.row.flag)
                                        const url = TODO + "/";
                                        let _starred = await invokeAPIRequest(url + params.row.taskRefId, {
                                            title: params.row.title,
                                            description: params.row.description,
                                            assignedTo: params.row.assignedTo,
                                            priority: params.row.priority,
                                            dueDate: params.row.dueDate,
                                            flag: event.target.checked,
                                            status: params.row.status
                                        },
                                            true, "post");
                                        navigate('/app/partner_manager/todo', { replace: true })
                                        console.log(_starred)


                                    } catch (error) {
                                        console.log(error)
                                    }
                                }}
                                label="flag"
                                name="flag"
                                checked={starred.flag}
                                inputProps={{ 'aria-label': 'secondary checkbox', 'spacing': '6' }}
                                checkedIcon={<Star />}
                                icon={<StarBorder />}
                            /> :
                            <StarredCheckbox
                                color="primary"
                                onChange={async (event) => {
                                    try {
                                        const url = TODO + "/";
                                        let _starred = await invokeAPIRequest(url + params.row.taskRefId, {
                                            title: params.row.title,
                                            description: params.row.description,
                                            assignedTo: params.row.assignedTo,
                                            priority: params.row.priority,
                                            dueDate: params.row.dueDate,
                                            flag: event.target.checked,
                                            status: params.row.status
                                        },
                                            true, "post");
                                        navigate('/app/partner_manager/todo', { replace: true })
                                        console.log(_starred)

                                    } catch (error) {
                                        console.log(error)
                                    }
                                }}
                                label="flag"
                                name="flag"
                                checked={params.row.flag}
                                inputProps={{ 'aria-label': 'secondary checkbox', 'spacing': '6' }}
                                checkedIcon={<Star />}
                                icon={<StarBorder />}
                            />
                )
            }
        },
        {
            field: 'title',
            headerName: 'Task Title',
            width: 1200,
            renderCell: (params) => {
                return (
                    params.row.status === "Completed" ?
                        <Typography style={{ textDecoration: "line-through", color: "green" }}>{params.row.title}<p>{params.row.description}</p></Typography> :
                        params.row.status === "Deleted" ?
                            <Typography style={{ textDecoration: "line-through", color: "red" }}>{params.row.title}<p >{params.row.description}</p></Typography> :
                            <Typography >{params.row.title}<p >{params.row.description}</p></Typography>
                )
            }
        },
        {
            field: 'priority', headerName: 'Priority', width: 50,
            renderCell: (params) => {
                return (
                    params.row.priority === "high" ?
                        <Typography style={{ backgroundColor: "#ef9a9a", color: "#263238" }}>{<PriorityHighRounded />}</Typography> :
                        params.row.priority === "medium" ?
                            <Typography style={{ backgroundColor: "#FFF59D", color: "#263238" }}>{<PriorityHighRounded />}</Typography> :
                            <Typography style={{ backgroundColor: "#C5E1A5", color: "#263238", }}>{<PriorityHighRounded />}</Typography>
                )
            }

        },
    ];
    const handleRowSelection = (e) => {
        const selectedRows = e.rowIds[0];
        tempArray = rows;
        tempId = selectedRows;
        console.log("SEEEEEE.....EEEEEEl", tempId)
        const arr = tempArray.map((srow) => {
            if (srow.id == tempId) {
                temptemp = srow
            }
        });
    }
    const handleUpdateClose = () => {
        $('.EditUpdateTask').toggleClass("open")
    }
    const handleAddTask = (e) => {
        $('.CreateNewTask').toggleClass("open")
    }
    const handleCreateClose = () => {
        $('.CreateNewTask').toggleClass("open")
    }
    const _validationSchema = Yup.object().shape({
        title: Yup.string().max(75).required(('Title Require')),
        description: Yup.string().max(250).required(('Description Require')),
        assignedTo: Yup.string().max(50).required(('Assign To Require')),
        priority: Yup.string().required(('Priority Require')),
        dueDate: Yup.string().required(('Due Date Require')),
    })
    useEffect(async () => {
        try {
            $('.btn-div').hide()
            console.log("USEEEEEEEffect")
            const _response = await invokeAPIGetRequest(TODO,true);
            setResponseData(_response.results);
            console.log(_response);
            for (let i = 1; i <= _response.results.length; i++) {
                data.push({
                    id: i, taskRefId: _response.results[i - 1].taskRefId,
                    title: _response.results[i - 1].title,
                    assignedTo: _response.results[i - 1].assignedTo,
                    status: _response.results[i - 1].status,
                    flag: _response.results[i - 1].flag,
                    description: _response.results[i - 1].description,
                    priority: _response.results[i - 1].priority,
                    dueDate: _response.results[i - 1].dueDate
                })
            }
            setRows(data);
            console.log(data)
        } catch (error) {
       //     console.log(error)
        }
    }, [conform])
    const todo = {
        title: '',
        description: '',
        assignedTo: '',
        priority: '',
        flag: '',
        dueDate: datedate, // YYYY-MM-DD
        status: "Inprogress"
    }
    const displayPriority = value => async () => {

        console.log(value)
        try {
            const _priority = await invokeAPIGetRequest(TODO_PRIORITY + value,
                true);
            console.log(_priority)
            for (let i = 1; i <= _priority.results.length; i++) {
                data.push({
                    id: i, taskRefId: _priority.results[i - 1].taskRefId,
                    title: _priority.results[i - 1].title,
                    assignedTo: _priority.results[i - 1].assignedTo,
                    status: _priority.results[i - 1].status,
                    flag: _priority.results[i - 1].flag,
                    description: _priority.results[i - 1].description,
                    priority: _priority.results[i - 1].priority,
                    dueDate: _priority.results[i - 1].dueDate
                })
            }
            setRows(data);
            // view="true";
        }
        catch (error) {
        }
    }
    const getSelectedDataRow = (value) => {

        //   stateVariables.title=value.title;
        //   console.log(stateVariables.title);
        $('.EditUpdateTask').toggleClass("open")

    }
    return (
        <>
            <Grid container  >
                {/* EditTask */}
                {/* //called  update todo component here */}
                <div className="EditUpdateTask">

                </div>
                {/* EditTask end */}
                {/* AddTask */}
                <div className="CreateNewTask">
                    <Todo/>
                    {/* <CreateTodo/> */}
                    

                </div>
                {/* AddTask end */}

                <Grid item xs={12} className="todoRight">
                    <div className="search_wrapper">
                        <input type="text" id="Search_cntrl" placeholder="Search..." />
                        <Button color="primary" variant="contained"
                            onClick={handleAddTask}
                        >Add Task</Button>
                        <Select displayEmpty label="action" color="action" style={{ minWidth: "200px" }}>
                            <MenuItem aria-label="None" disabled key={1} >Select </MenuItem>

                            <MenuItem value="All" key={2}
                                onClick={async () => {
                                    try {
                                        $('.btn-div').hide()
                                        const _flag = await invokeAPIGetRequest(TODO,
                                            true);
                                        console.log(_flag.results)
                                        for (let i = 1; i <= _flag.results.length; i++) {
                                            data.push({
                                                id: i, taskRefId: _flag.results[i - 1].taskRefId,
                                                title: _flag.results[i - 1].title,
                                                assignedTo: _flag.results[i - 1].assignedTo,
                                                status: _flag.results[i - 1].status,
                                                flag: _flag.results[i - 1].flag,
                                                description: _flag.results[i - 1].description,
                                                priority: _flag.results[i - 1].priority,
                                                dueDate: _flag.results[i - 1].dueDate
                                            })
                                        }
                                        setRows(data);
                                    }
                                    catch (error) {
                                    }
                                }}
                            ><ListAlt />&nbsp;&nbsp;All</MenuItem>
                            <MenuItem value="flag" key={3}
                                onClick={async () => {
                                    try {
                                        $('.btn-div').hide()
                                        const _flag = await invokeAPIGetRequest(TODO_FLAG + "true",
                                            true);
                                        console.log(_flag)
                                        for (let i = 1; i <= _flag.results.length; i++) {
                                            data.push({
                                                id: i, taskRefId: _flag.results[i - 1].taskRefId,
                                                title: _flag.results[i - 1].title,
                                                assignedTo: _flag.results[i - 1].assignedTo,
                                                status: _flag.results[i - 1].status,
                                                flag: _flag.results[i - 1].flag,
                                                description: _flag.results[i - 1].description,
                                                priority: _flag.results[i - 1].priority,
                                                dueDate: _flag.results[i - 1].dueDate
                                            })
                                        }
                                        setRows(data);
                                    }
                                    catch (error) {
                                    }
                                }}
                            ><Star />&nbsp;&nbsp;Starred
                                            </MenuItem>
                            <MenuItem value="priority" key={4}
                                onClick={async () => {
                                    try {
                                        $('.btn-div').show()
                                        const _priority = await invokeAPIGetRequest(TODO_PRIORITY + "medium",
                                            true);
                                        console.log(_priority)
                                        for (let i = 1; i <= _priority.results.length; i++) {
                                            data.push({
                                                id: i, taskRefId: _priority.results[i - 1].taskRefId,
                                                title: _priority.results[i - 1].title,
                                                assignedTo: _priority.results[i - 1].assignedTo,
                                                status: _priority.results[i - 1].status,
                                                flag: _priority.results[i - 1].flag,
                                                description: _priority.results[i - 1].description,
                                                priority: _priority.results[i - 1].priority,
                                                dueDate: _priority.results[i - 1].dueDate
                                            })
                                        }
                                        setRows(data);
                                    }
                                    catch (error) {
                                    }
                                }}
                            ><Error />&nbsp;&nbsp;Priority
                                            </MenuItem>
                            <MenuItem value="completed" key={5}
                                onClick={async () => {
                                    try {
                                        $('.btn-div').hide()
                                        const _completed = await invokeAPIGetRequest(TODO_STATUS + "Completed",
                                            true);
                                        console.log(_completed)
                                        for (let i = 1; i <= _completed.results.length; i++) {

                                            data.push({
                                                id: i, taskRefId: _completed.results[i - 1].taskRefId,
                                                title: _completed.results[i - 1].title,
                                                assignedTo: _completed.results[i - 1].assignedTo,
                                                status: _completed.results[i - 1].status,
                                                flag: _completed.results[i - 1].flag,
                                                description: _completed.results[i - 1].description,
                                                priority: _completed.results[i - 1].priority,
                                                dueDate: _completed.results[i - 1].dueDate
                                            })
                                        }
                                        setRows(data);
                                    }
                                    catch (error) {
                                        console.log(error)
                                    }
                                }}
                            ><Done />&nbsp;&nbsp;Done</MenuItem>
                            <MenuItem value="deleted"
                                onClick={
                                    async () => {
                                        try {
                                            $('.btn-div').hide()
                                            const _deleted = await invokeAPIGetRequest(TODO_STATUS + "Deleted",
                                                true);
                                            console.log(_deleted)
                                            for (let i = 1; i <= _deleted.results.length; i++) {
                                                data.push({
                                                    id: i, taskRefId: _deleted.results[i - 1].taskRefId,
                                                    title: _deleted.results[i - 1].title,
                                                    assignedTo: _deleted.results[i - 1].assignedTo,
                                                    status: _deleted.results[i - 1].status,
                                                    flag: _deleted.results[i - 1].flag,
                                                    description: _deleted.results[i - 1].description,
                                                    priority: _deleted.results[i - 1].priority,
                                                    dueDate: _deleted.results[i - 1].dueDate
                                                })
                                            }
                                            setRows(data);
                                        }
                                        catch (error) {
                                        }
                                    }
                                } key={5}><Delete />&nbsp;&nbsp;Deleted</MenuItem>
                        </Select>
                    </div>
                    <div style={{ height: "88%" }}>
                        <div className="btn-div">
                            <Button
                                style={{ backgroundColor: "#ef9a9a", color: "#263238", textTransform: "none", marginLeft: "0px" }}
                                startIcon={<PriorityHighRounded />}
                                onClick={displayPriority('high')}>
                                Priority High</Button>
                            <Button
                                style={{ backgroundColor: "#FFF59D", color: "#263238", textTransform: "none", marginLeft: "10px" }}
                                onClick={displayPriority('medium')}>
                                Priority Medium</Button>
                            <Button style={{ backgroundColor: "#C5E1A5", color: "#263238", textTransform: "none", marginLeft: "10px" }}
                                startIcon={<LowPriorityRounded />}
                                onClick={displayPriority('low')}>
                                Priority Low</Button>
                        </div>
                        <DataGrid rows={rows} columns={columns} pageSize={10} rowHeight={100}
                            onSelectionChange={handleRowSelection}
                            onRowClick={(row) => {
                                setRowData(row.row);
                                console.log(rowData)
                                { getSelectedDataRow(row.row) }
                                var id = row.row.taskRefId;
                                setTid(id)
                                tempSelectedData = row.row;
                                setSelectedRow(tempSelectedData);
                                //  $('.EditUpdateTask').toggleClass("open")
                            }}
                            page={page}
                            onPageChange={(params) => {
                                console.log(params)
                                setPage(params.page);
                            }}
                            pagination

                        > </DataGrid>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}
export default TodoList;
