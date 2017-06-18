import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './error.scss';

const Error = ({ error }) => (
    <div className={styles.container}>
        <h2 className={styles.title}>Here is an error</h2>
        <h4 className={styles.content}>{error}</h4>
    </div>
);

Error.propTypes = {
    error: PropTypes.string.isRequired
};

export default Error;