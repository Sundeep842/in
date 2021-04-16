import React from "react";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import BlockedIcon from "@material-ui/icons/Block";
import ProgressIcon from "@material-ui/icons/DonutLarge";

import { green, blue, grey, red } from "@material-ui/core/colors";

function colorForStatus(status) {
  switch (status) {
    case "completed":
      return green;
    // case "Inprogress":
    //   return blue;
    // case "blocked":
    //   return red;
    default:
      return blue;
  }
}

function StatusChip({ status }) {
  return (
    <Chip
      label={status}
     // avatar={<DoneIcon style={{ color: "white" }}/>}

       avatar={status === "completed" && <DoneIcon style={{ color: "white" }}/>}
    //   avatar={status === "blocked" && <BlockedIcon style={{ color: "white" }} />}
    //   avatar={status === "in progress" && <ProgressIcon style={{ color: "white" }} />}
      style={{ backgroundColor: colorForStatus(status)[300], color: "white"}}
    />
  );
}

export default StatusChip;
