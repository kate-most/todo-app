import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './toggler.scss';

const Toggler = ({ id, isCollapsed, toggleCategory}) => {
    const className = (isCollapsed) ? styles.iconClosed : styles.iconOpened;
    const title = isCollapsed ? 'ellapse' : 'collapse';

    return (
        <button className={styles.item}
                title={title}
                onClick={() => {toggleCategory(id)}}>
            <div className={className}/>
        </button>
    )
};

Toggler.propTypes = {
    id: PropTypes.string.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    toggleCategory: PropTypes.func.isRequired
};

export default Toggler;