import React, { useState } from "react";
import { Link } from "react-router-dom";

import CreatePreDraftsBtn from "../components/CreatePreDraftsBtn";
import StartTakingPicturesBtn from "../pages/StartTakingPicturesBtn";

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
    <>
      <h1>Dashboard</h1>

      {/* EBAY */}
      <h2>Ebay</h2>
      <p>Currently {ebayState ? "" : "not"} connected to ebay</p>
      {ebayState ? (
        <button onClick={() => setEbayState(null)}>Disconnect from ebay</button>
      ) : (
        <button onClick={() => setEbayState("connected")}>
          Connect to ebay
        </button>
      )}

      {/* PRODUCTS */}
      <h2>Products</h2>

      {/* <Link to="/start-taking-pictures-btn">
        <button>Start Taking Pictures</button>
      </Link> */}
      <CreatePreDraftsBtn />

      <table>
        <tr>
          <td>
            <Link to="/view-pre-draft">View PreDrafts</Link>
          </td>
          <td>{productState.preDrafts}</td>
          <td>
            <button
              onClick={() => {
                setProductState({
                  ...productState,
                  preDrafts: productState.preDrafts + 1,
                });
              }}
            >
              +
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <Link to="/wearhousing">View Needs Wearhousing</Link>
          </td>
          <td>{productState.needsWearhousing}</td>
          <td>
            <button
              onClick={() => {
                setProductState({
                  ...productState,
                  needsWearhousing: productState.needsWearhousing + 1,
                });
              }}
            >
              +
            </button>
          </td>
        </tr>
        {/* <tr>
          <td>
            <Link to="/view-need-category">View Needs Category</Link>
          </td>
          <td>{productState.needsCategory}</td>
          <td>
            <button
              onClick={() => {
                setProductState({
                  ...productState,
                  needsCategory: productState.needsCategory + 1,
                });
              }}
            >
              +
            </button>
          </td>
        </tr> */}
        <tr>
          <td>
            <Link to="/view-drafts">View Drafts</Link>
          </td>
          <td>{productState.drafts}</td>
          <td>
            <button
              onClick={() => {
                setProductState({
                  ...productState,
                  drafts: productState.drafts + 1,
                });
              }}
            >
              +
            </button>
          </td>
        </tr>
      </table>

      {/* LOCATIONS */}

      <h2>Locations</h2>
      <p>Currently {locationState} locations</p>

      <Link to="/view-locations">
        <button>View Locations</button>
      </Link>
    </>
  );
};

export default Dashboard;
