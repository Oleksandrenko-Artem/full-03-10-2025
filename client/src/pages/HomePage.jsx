import React from "react";
import SportsList from "../components/SportsList/SportsList";
import styles from "./pages.module.scss";

const HomePage = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["content"]}>
        <h1>Sports and Athletes</h1>
        <SportsList />
      </div>
    </div>
  );
};

export default HomePage;