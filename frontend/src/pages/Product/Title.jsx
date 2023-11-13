import React from 'react'
import { Typography } from '@mui/material'
import { useState, useEffect, useRef } from "react";


const Title = ({title}) => {
  const [fontSize, setFontSize] = useState(48);
  const titleRef = useRef(null);

  useEffect(() => {
    const titleHeight = titleRef.current.clientHeight;
    if (titleHeight > 120) {
      setFontSize(fontSize - 2);
    }
  }, [fontSize, title]);

  return (
    <Typography
    variant="h4"
    className="product-title"
    ref={titleRef}
    sx={{
      maxHeight: `${fontSize * 5}px`,
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      "-webkit-line-clamp": "5",
      "-webkit-box-orient": "vertical",
      fontSize: `${fontSize}px`,
    }}
  >
    {title}
  </Typography>
  )
}

export default Title