import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Divider,
} from "@mui/material";

const Dashboard = () => {
  const [ebayState, setEbayState] = useState(null);
  const [productState, setProductState] = useState({
    preDrafts: 0,
    needsWearhousing: 0,
    needsCategory: 0,
    drafts: 0,
    listed: 0,
    sold: 0,
  });
  const [locationState, setLocationState] = useState(0);

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ my: 3 }}>
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        {/* Section 1 */}
        <Box
          align="center"
          sx={{
            flex: 1,
            p: 2,
            border: 1,
            borderColor: "primary.main",
            borderRadius: 1,
          }}
        >
          <Typography variant="h6">Ebay</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Divider />
            <Typography variant="body1">
              Currently{" "}
              {ebayState ? "connected to eBay" : "not connected to eBay"}
            </Typography>
            <Button
              variant="contained"
              color={ebayState ? "error" : "primary"}
              onClick={() => setEbayState(ebayState ? null : "connected")}
            >
              {ebayState ? "Disconnect from eBay" : "Connect to eBay"}
            </Button>
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          align="center"
          sx={{
            flex: 1,
            p: 2,
            border: 1,
            borderColor: "primary.main",
            borderRadius: 1,
          }}
        >
          <Typography variant="h6">Products</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Divider />
            <Link to="/create-pre-draft">
              <Button variant="contained" color="primary">
                Create Pre-Draft
              </Button>
            </Link>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Link to="/view-pre-draft">View PreDrafts</Link>
                  </TableCell>
                  <TableCell>{productState.preDrafts}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleIncrement("preDrafts")}
                    >
                      +
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Link to="/wearhousing">View Needs Wearhousing</Link>
                  </TableCell>
                  <TableCell>{productState.needsWearhousing}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleIncrement("needsWearhousing")}
                    >
                      +
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Link to="/view-drafts">View Drafts</Link>
                  </TableCell>
                  <TableCell>{productState.drafts}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleIncrement("drafts")}
                    >
                      +
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>

        {/* Section 3 */}
        <Box
          align="center"
          sx={{
            flex: 1,
            p: 2,
            border: 1,
            borderColor: "primary.main",
            borderRadius: 1,
          }}
        >
          <Typography variant="h6">Locations</Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Divider />
            <Typography variant="body1">
              Currently {locationState} locations
            </Typography>

            <Link to="/view-locations">
              <Button variant="contained" color="primary">
                View Locations
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
