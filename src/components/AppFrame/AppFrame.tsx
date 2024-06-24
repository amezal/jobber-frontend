import { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AppFrame.module.scss";
import Footer from "./Footer";
import TopBar from "./TopBar";

const AppFrame: FC = () => {
  return (
    <div className={styles.appFrame}>
      <TopBar />
      <div className={styles.scrollWrapper}>
        <div className={styles.centerWrapper}>
          <div className={styles.content}>{<Outlet />}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppFrame;
