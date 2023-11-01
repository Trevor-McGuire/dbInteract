import React, { useState } from "react";
import { Paper } from "@mui/material";


const ReviewCard = ({ review, index }) => {
  const [showFullText, setShowFullText] = useState(
    Array.from({ length: review.length }, (_, index) => false)
  );

  const toggleShowFullText = (index) => {
    setShowFullText((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <Paper elevation={2} sx={{}} key={index}>
      <strong>{review.title}</strong>
      <p>
        Rating:{" "}
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`fa fa-star${i < review.rating ? "" : "-o"}`}
          ></i>
        ))}{" "}
        By: {review.user.username}
      </p>
      {showFullText[index] ? (
        <p>{review.body}</p>
      ) : (
        <p>
          {review.body.length > 50
            ? `${review.body.slice(0, 50)}...`
            : review.body}
          {review.body.length > 50 && (
            <span
              style={{ color: "blue" }}
              onClick={() => toggleShowFullText(index)}
            >
              Show more
            </span>
          )}
        </p>
      )}
    </Paper>
  );
};

export default ReviewCard;
