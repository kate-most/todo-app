import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import * as styles from './header.scss';

const Header = ({ appTitle }) => (
    <div className={styles.container}>
        <h1 className={styles.title}>
            <Link to='/' className={styles.titleLink}>{appTitle}</Link>
        </h1>
    </div>
);

Header.propTypes = {
    appTitle: PropTypes.string.isRequired
};

export default Header;