import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LoggedOutView.module.css';

const LoggedOutView = () => (

  (
    <ul className={styles.navbar}>

      <li className={styles['nav-item']}>
        <NavLink to="/" exact className={styles.link} activeClassName={styles.main}>
          <i className="ion-home" />
          &nbsp;Главная
        </NavLink>
      </li>

      <li className={styles['nav-item']}>
        <NavLink to="/login" className={styles.link} activeClassName={styles.main}>
          <i className="ion-log-in" />
          &nbsp;Войти
        </NavLink>
      </li>

      <li className={styles['nav-item']}>
        <NavLink to="/register" className={styles.link} activeClassName={styles.main}>
          <i className="ion-person" />
          &nbsp;Регистрация
        </NavLink>
      </li>

    </ul>
  ));
export default LoggedOutView;
