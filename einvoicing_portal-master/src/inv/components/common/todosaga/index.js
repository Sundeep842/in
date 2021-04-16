import React, { useState, useEffect } from 'react'
import { DataGrid, useFilter } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Grid, Button, Typography, Checkbox, Select, MenuItem } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux"
import { selectAllTodo, selectAllPriorityList, selectCompletedTodoList, selectDeletedTodoList, selectStarredTodoList, selectPriorityTodoList, selectLowPriorityTodoList } from './slice/selectors';
import { useTodoSlice } from './slice';
import TodoUpdate from './_components/TodoUpdate'
import '../todo/todo.css'
import $ from 'jquery';
import CreateTodo from './_components/CreateTodo'
import { Delete, Done, Error, ListAlt, LowPriorityRounded, PriorityHighRounded, Star, StarBorder } from '@material-ui/icons';

const StarredCheckbox = withStyles({
  root: {
    color: "Black",
    '&$checked': {
      color: "#FFD740",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
const TodoGrid = (props) => {
  const [filters, setFilters] = useState("All")
  const { t } = useTranslation();
  const [taskData, setTaskData] = useState([])
  const [tid, setTid] = useState(0);
  const navigation = useNavigate()
  const [starredVal, setStarredVal] = useState(false)
  let starred = useState({
    flag: false,
  });

  const columns = [
    {
      field: 'flag',
      headerName: 'Flag',
      width: 50,
      // disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          params.row.flag === "true" ?
            <StarredCheckbox
              color="primary"
              label="flag"
              name="flag"
              onChange={params.row}
              checked={params.row.flag}
              inputProps={{ 'aria-label': 'secondary checkbox', 'spacing': '6' }}
              checkedIcon={<Star />}
              icon={<StarBorder />}
            /> :
            params.row.flag === "false" ?
              <StarredCheckbox
                color="primary"
                label="flag"
                name="flag"
                checked={starred.flag}
                onChange={params.row}

                inputProps={{ 'aria-label': 'secondary checkbox', 'spacing': '6' }}
                checkedIcon={<Star />}
                icon={<StarBorder />}
              /> :
              <StarredCheckbox
                color="primary"
                label="flag"
                name="flag"
                onChange={params.row}
                checked={params.row.flag}
                inputProps={{ 'aria-label': 'secondary checkbox', 'spacing': '6' }}
                checkedIcon={<Star />}
                icon={<StarBorder />}
              />
        )
      }
    },
    {
      field: 'title', headerName: 'Tasks Title', width: 1100,
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
            <Typography style={{ backgroundColor: "#ef9a9a" }}>{<PriorityHighRounded />}</Typography> :
            params.row.priority === "medium" ?
              <Typography style={{ backgroundColor: "#FFF59D", color: "#263238" }}>{<PriorityHighRounded />}</Typography> :
              <Typography style={{ backgroundColor: "#C5E1A5", color: "#263238", }}>{<PriorityHighRounded />}</Typography>
        )
      }

    },
  ];
  let rows = []
  const dispatch = useDispatch()
  const { actions } = useTodoSlice()
  const todoList = useSelector(selectAllTodo)
  const priorityList = useSelector(selectAllPriorityList)
  const completedTodoList = useSelector(selectCompletedTodoList)
  const deletedTodoList = useSelector(selectDeletedTodoList)
  const starredTodoList = useSelector(selectStarredTodoList)
  const priorityListView = useSelector(selectPriorityTodoList)
  const priorityLowListView = useSelector(selectLowPriorityTodoList)

  const useEffectOnMount = (effect) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    console.log("useeffect mount called")
    dispatch(actions.loadFormDetails());

  });
  const getAllList = () => {
    $('.btn-div').hide()
    console.log("@@@@@ Get All List")
    dispatch(actions.loadFormDetails())
  }
  const getAllPriorityList = () => {
    $('.btn-div').show()
    dispatch(actions.loadAllPriorityListDetails())

  }
  const getPriorityList = () => {
    $('.btn-div').show()
    dispatch(actions.loadPriorityListDetails())

  }
  const getCompletedTodoList = () => {
    $('.btn-div').hide()
    dispatch(actions.loadCompletedTodoListDetails())

  }
  const getDeletedTodoList = () => {
    $('.btn-div').hide()
    dispatch(actions.loadDeletedTodoListDetails())
  }
  const getStarredTodoList = () => {
    $('.btn-div').hide()
    dispatch(actions.loadStarredTodoListDetails())
  }
  const getLowPriorityList = () => {
    $('.btn-div').show()
    dispatch(actions.loadLowPriorityListDetails())
  }

  const _loadRows = () => {

    $('.btn-div').hide()
    let x = null;
    switch (filters) {
      case "All":
        x = todoList.map((item, i) => ({
          ...item,
          id: i
        }))
        break;
      case "priority":
        $('.btn-div').show()
        x = priorityList.map((item, i) => ({
          ...item,
          id: i
        }))
        break;
      case "completed":
        x = completedTodoList.map((item, i) => ({
          ...item,
          id: i
        }))
        break;
      case "deleted":
        x = deletedTodoList.map((item, i) => ({
          ...item,
          id: i
        }))
        break;
      case "flag":
        x = starredTodoList.map((item, i) => ({
          ...item,
          id: i
        }))
        break;
      case "high":
        $('.btn-div').show()
        x = priorityListView.map((item, i) => ({
          ...item,
          id: i
        }))
        break;
      case "low":
        $('.btn-div').show()
        x = priorityLowListView.map((item, i) => ({
          ...item,
          id: i
        }))
        break;
    }
    rows = x
  }

  const filterChange = (e) => {
    if (e.target.value === "priority") {
      getAllPriorityList();
    }
    if (e.target.value === "completed") {
      getCompletedTodoList();
    }
    if (e.target.value === "deleted") {
      getDeletedTodoList();
    }
    if (e.target.value === "flag") {
      getStarredTodoList();
    }
    setFilters(e.target.value);
  }
  const ButtonHandler = value => () => {
    if (value === "high") {
      getPriorityList();
    }
    if (value === "priority") {
      getAllPriorityList();
    }
    if (value === "low") {
      getLowPriorityList();
    }
    setFilters(value);

  }

  return (
    <div>
      <Grid container  >
        <div style={{ height: '500px', width: '115%' }}>
          <Select displayEmpty label="action" color="action" style={{ minWidth: "200px" }} onChange={filterChange}>
            <MenuItem aria-label="None" disabled key={1} >Select </MenuItem>
            <MenuItem value="All" key={2} ><ListAlt />&nbsp;&nbsp;All</MenuItem>
            <MenuItem value="flag" key={3} ><Star />&nbsp;&nbsp;Starred</MenuItem>
            <MenuItem value="priority" key={4}><Error />&nbsp;&nbsp;Priority</MenuItem>
            <MenuItem value="completed" key={5}><Done />&nbsp;&nbsp;Done</MenuItem>
            <MenuItem value="deleted" key={5}><Delete />&nbsp;&nbsp;Deleted</MenuItem>
          </Select>

          <div className="btn-div">
            <Button
              style={{ backgroundColor: "#ef9a9a", color: "#263238", textTransform: "none", marginLeft: "0px" }}
              startIcon={<PriorityHighRounded />}
              onClick={ButtonHandler("high")}
            >
              Priority High</Button>
            <Button
              style={{ backgroundColor: "#FFF59D", color: "#263238", textTransform: "none", marginLeft: "10px" }}
              onClick={ButtonHandler('priority')}
            >
              Priority Medium</Button>
            <Button style={{ backgroundColor: "#C5E1A5", color: "#263238", textTransform: "none", marginLeft: "10px" }}
              startIcon={<LowPriorityRounded />}
              onClick={ButtonHandler('low')}
            >
              Priority Low</Button>
          </div>
          {todoList.length > 0 && _loadRows()}
          <DataGrid rows={rows} columns={columns} pageSize={10}
            onRowClick={(row) => {
              setTid(row.row.id);
              setTaskData(row.row)
              console.log(tid)
              $('.EditUpdateTaskToDo').toggleClass("open")
            }
            } />
        </div>
        <div>
        </div>
      </Grid>
      <div className="EditUpdateTaskToDo">
        {
          taskData.length !== 0 ? (<TodoUpdate id={tid} />) : ("please select the row to edit")
        }
        {/* (<TodoUpdate id={tid} />) */}
      </div>
    </div>
  )
}

const Todolistsaga = () => {

  const handleAddTask = (e) => {
    $('.CreateNewTask').toggleClass("open")
  }

  return (
    <div>
      <Grid container>
        <div className="CreateNewTask">
          <CreateTodo />
        </div>

        <Grid item xs={12} className="todoRight">
          <div className="search_wrapper">
            <input type="text" id="Search_cntrl" placeholder="Search..." />
            {/* <div className="invite_new_button"> */}
            <Button color="primary" variant="contained"
              onClick={handleAddTask}
            >Add Task</Button>
            {/* </div> */}
            <div>
              <TodoGrid />
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
export default Todolistsaga
