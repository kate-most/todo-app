import React  from 'react';
import { Link } from 'react-router';
import * as styles from './header.scss';

const Header = () => (
    <div className={styles.container}>
        <h1 className={styles.title}>
            <Link to='/' className={styles.titleLink}>To-Do List</Link>
        </h1>
    </div>
);

export default Header;