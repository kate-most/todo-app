import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getProgress from  './../../selectors/progress-selectors';
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

const mapStateToProps = (state, props) => ({
    categories: state.categories,
    progress: getProgress(state, props)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);