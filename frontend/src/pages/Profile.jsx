import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useQuery } from "@apollo/client";
import { READ_USER } from "../utils/queries";
import Item from "@mui/material/Grid";
import registerLists from "../utils/lists";

const { inputValues } = registerLists;
const updatedInputValues = inputValues.filter(item => item.lowercase !== 'password');


export default function OutlinedCard() {
  const { data, error, loading } = useQuery(READ_USER);
  const user = data?.readUser || {};

  if (error) {
    return <h2>{error.message}</h2>;
  }
  if (!user) {
    window.location.assign("/");
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "2rem auto" }}>
      <Box sx={{ maxWidth: 800, margin: "2rem " }}>
        <Card variant="outlined">
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{ textAlign: "center" }}
            >
              Profile
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ sm: 2 }}>
              {updatedInputValues.map((input, index) => (
                <>
                  <Grid item xs={6} key={index}>
                    <Item
                      sx={{
                        fontWeight: "bold",
                        textAlign: "right",
                      }}
                    >
                      {input.proper}:
                    </Item>
                  </Grid>
                  <Grid item xs={6} key={index}>
                    <Item>{user[input.lowercase]}</Item>
                  </Grid>
                </>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
