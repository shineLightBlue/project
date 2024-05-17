import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
export const TimeAgo = ({ timestamp }) => {
  // console.log(timestamp);
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    // console.log(date);
    const timePeriod = formatDistanceToNow(date);
    // console.log(timePeriod);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp}>
      &nbsp;<i>{timeAgo}</i>
    </span>
  );
};
