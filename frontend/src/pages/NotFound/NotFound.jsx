import React from "react";
import classes from "./styles.module.scss";


const NotFound = ({ history }) => {
  return (
    <div className={classes.notFound}>
      <div className={classes.notFound_box}>
        <h1>Page not found</h1>
        <button onClick={() => history.push("/")}>Go Home</button>
      </div>
    </div>
  );
};

export default NotFound;
