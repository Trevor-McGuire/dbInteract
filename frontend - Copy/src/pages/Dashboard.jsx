import React, { useState } from "react";
import { Link } from "react-router-dom";

import CreatePreDraftsBtn from "../components/CreatePreDraftsBtn";

const Dashboard = () => {
  const [ebayState, setEbayState] = useState(null);
  const [productState, setProductState] = useState({
    preDrafts: 0,
    needsWearhousing: 0,
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

      <table>
        <tr>
          <td>PreDrafts</td>
          <td>{productState.preDrafts}</td>
          <td><button
            onClick={() => {
              setProductState({ ...productState, preDrafts: productState.preDrafts + 1 });
            }}
          >+</button>
          </td>
        </tr>
        <tr>
          <td>Needs Wearhousing</td>
          <td>{productState.needsWearhousing}</td>
          <td>
            <button
              onClick={() => {
                setProductState({ ...productState, needsWearhousing: productState.needsWearhousing + 1 });
              }}
            >+</button>
          </td>
        </tr>
        <tr>
          <td>Drafts</td>
          <td>{productState.drafts}</td>
          <td>
            <button
              onClick={() => {
                setProductState({ ...productState, drafts: productState.drafts + 1 });
              }}
            >+</button>
          </td>
        </tr>
        <tr>
          <td>Listed</td>
          <td>{productState.listed}</td>
          <td>
            <button
              onClick={() => {
                setProductState({ ...productState, listed: productState.listed + 1 });
              }}
            >+</button>
          </td>
        </tr>
        <tr>
          <td>Sold</td>
          <td>{productState.sold}</td>
          <td>
            <button
              onClick={() => {
                setProductState({ ...productState, sold: productState.sold + 1 });
              }}
            >+</button>
          </td>
        </tr>
      </table>
      <CreatePreDraftsBtn />

      {productState.preDrafts === 0 ? (
        <button disabled>View PreDrafts</button>
      ) : (
        <Link to="/view-pre-draft">
          <button>View PreDrafts</button>
        </Link>
      )}

      {productState.needsWearhousing === 0 ? (
        <button disabled>View Needs Wearhousing</button>
      ) : (
        <Link to="/wearhousing">
          <button>View Needs Wearhousing</button>
        </Link>
      )}

      {productState.drafts === 0 ? (
        <button disabled>View Drafts</button>
      ) : (
        <Link to="view-drafts">
          <button>View Drafts</button>
        </Link>
      )}

      {productState.listed === 0 ? (
        <button disabled>View Listed</button>
      ) : (
        <Link to="view-listed">
          <button>View Listed</button>
        </Link>
      )}

      {productState.sold === 0 ? (
        <button disabled>View Sold</button>
      ) : (
        <Link to="view-sold">
          <button>View Sold</button>
        </Link>
      )}

      {/* LOCATIONS */}

      <h2>Locations</h2>
      <p>Currently {locationState} locations</p>

      <Link to="/create-location">
        <button>Create New Location</button>
      </Link>

      {locationState === 0 ? (
        <button disabled>View Locations</button>
      ) : (
        <Link to="view-locations">
          <button>View Locations</button>
        </Link>
      )}


    </>
  );
};

export default Dashboard;
