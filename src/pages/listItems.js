import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import "../AppCss/dashboard.css";

export default function MainListItems({ setClick }) {
  return (
    <div>
      <ListItem button onClick={() => setClick("client")}>
        <ListItemIcon style={{ color: "white" }}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Client Management" style={{ color: "white" }} />
      </ListItem>
      <ListItem button onClick={() => setClick("store")} >
        <ListItemIcon style={{ color: "white" }}>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Store Management" style={{ color: "white" }} />
      </ListItem>
      <ListItem button  onClick={() => setClick("support")}>
        <ListItemIcon style={{ color: "white" }}>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Support Queries" style={{ color: "white" }} />
      </ListItem>
    </div>
  );
}
