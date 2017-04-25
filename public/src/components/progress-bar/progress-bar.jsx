import React, { PropTypes } from 'react';
import * as styles from './progress-bar.scss';

const ProgressBar = ({ progress }) => {
    const indicatorStyle = {
      width: progress + '%'
    };

    return (
        <div className={styles.container}>
            <div className={styles.indicator} style={indicatorStyle}/>
        </div>
    )
};

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired
};

export default ProgressBar;