import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { useQuery, gql } from "@apollo/client";
import { READ_CATEGORIES_QUERY } from "../utils/queries";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/system";

import { Link } from "react-router-dom";

const StyledLink = styled(RouterLink)`
  display: flex;
  width: 100%;
`;

export default function TemporaryDrawer({ open, onClose }) {
  const { data } = useQuery(READ_CATEGORIES_QUERY);
  const categories = data?.readCategories || [];

  const list = (
    <Box sx={{ width: 250 }}>
      <List>
        {categories.map((category, index) => (
          <ListItem key={category.name} disablePadding>
            <ListItemButton>
            <StyledLink 
              to={`/category/${category.name}`} 
              onClick={onClose}
            >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </StyledLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
          <ListItem key={"Contact"} disablePadding>
            <ListItemButton>
            <StyledLink 
              to="/about"
              onClick={onClose}
            >
                <ListItemIcon>
                  <InboxIcon /> 
                </ListItemIcon>
                <ListItemText primary={"Contact"} />
              </StyledLink>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      {list}
    </Drawer>
  );
}
