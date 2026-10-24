import React from "react";
import SportsList from "../components/SportsList/SportsList";
import MovingShapes from "../components/MovingShapes/MovingShapes";
import styles from "./pages.module.scss";

const HomePage = () => {
  return (
    <div className={styles["wrapper"]}>
      {/* Анимация летает по всей ширине экрана */}
      <MovingShapes />

      {/* Контент аккуратно центрируется по сетке вашего %wrapper */}
      <div className={styles["content"]}>
        <h1>Sports and Athletes</h1>
        <SportsList />
      </div>
    </div>
  );
};

export default HomePage;