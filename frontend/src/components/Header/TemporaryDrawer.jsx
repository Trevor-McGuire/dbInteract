import * as React from "react";
import {
  ListSubheader,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Box,
  Divider,
  ListItem,
  Link,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { useQuery, gql } from "@apollo/client";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/system";

const StyledLink = styled(RouterLink)`
  display: flex;
  width: 100%;
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories
  }
`;

export default function TemporaryDrawer({ open, onClose }) {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [openLists, setOpenLists] = React.useState({});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const categoriesString = data?.getCategories || "";
  const categories = JSON.parse(categoriesString);

  console.log("categories", categories);

  const handleClick = (listId) => {
    setOpenLists((prevOpenLists) => ({
      ...prevOpenLists,
      [listId]: !prevOpenLists[listId],
    }));
  };

  const renderNestedCategories = (subcategories) => {
    return subcategories.map((subcategory) => (
      <React.Fragment key={subcategory.identifier}>
        {subcategory.subCategories.length > 0 ? (
          <ListItemButton sx={{ pl: subcategory.depth * 3 }}>
                          <Link
                onClick={onClose}
                to={`/category/${subcategory.identifier}`}
                component={RouterLink}
                sx={{
                  display: "flex",
                  width: "100%",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
            <ListItemText primary={subcategory.name} />
            </Link>
            {openLists[subcategory._id] ? (
              <ExpandLess
                fontSize="large"
                onClick={() => handleClick(subcategory._id)}
                color="primary"
              />
            ) : (
              <ExpandMore
                fontSize="large"
                onClick={() => handleClick(subcategory._id)}
                color="secondary"
              />
            )}
          </ListItemButton>
        ) : (
          <React.Fragment key={subcategory.identifier}>
            <ListItemButton
              onClick={() => handleClick(subcategory._id)}
              sx={{ pl: subcategory.depth * 3 }}
            >
              <ListItemText primary={subcategory.name} />
            </ListItemButton>
          </React.Fragment>
        )}
        {subcategory.subCategories.length > 0 && (
          <Collapse
            in={openLists[subcategory._id]}
            timeout="auto"
            unmountOnExit
          >
            {renderNestedCategories(subcategory.subCategories)}
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  const list = (
    <Box sx={{ minWidth: 250, maxWidth: 500 }}>
      <List subheader={<ListSubheader color='primary'>Categories</ListSubheader>}>
        {categories.map((category) => (
          <React.Fragment key={category._id}>
            <ListItemButton sx={{ pl: category.depth * 2 }}>
              <Link
                onClick={onClose}
                to={`/category/${category.identifier}`}
                component={RouterLink}
                sx={{
                  display: "flex",
                  width: "100%",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <ListItemText primary={category.name} />
              </Link>
              {openLists[category._id] ? (
                <ExpandLess
                  fontSize="large"
                  onClick={() => handleClick(category._id)}
                  color="primary"
                />
              ) : (
                <ExpandMore
                  fontSize="large"
                  onClick={() => handleClick(category._id)}
                  color="secondary"
                />
              )}
            </ListItemButton>
            <Collapse in={openLists[category._id]} timeout="auto" unmountOnExit>
              {renderNestedCategories(category.subCategories)}
            </Collapse>
          </React.Fragment>
        ))}
      </List>
      <Divider />
      <List subheader={<ListSubheader color='primary'>Info</ListSubheader>}>
        <ListItem key={"Contact"} disablePadding>
          <ListItemButton>
            <StyledLink to="/about" onClick={onClose}>
              <ListItemIcon>{/* <InboxIcon />  */}</ListItemIcon>
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
