import React, {PropTypes} from 'react';
import * as styles from './toggler.scss';

const Toggler = ({ isCollapsed, collapseCategory, id }) => {
    const className = (isCollapsed) ? styles.iconOpened : styles.iconClosed;
    const title = isCollapsed ? 'ellapse' : 'collapse';

    return (
        <button className={styles.item}
                title={title}
                onClick={() => {collapseCategory(id)}}>
            <div className={className}/>
        </button>
    )
};

Toggler.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    collapseCategory: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default Toggler;