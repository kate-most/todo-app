import * as React from 'react';
import * as styles from "./progress-bar.scss";

class Progress extends React.Component {
    render() {
        return <div className={ styles.container }>
            <div className={ styles.indicator }/>
        </div>
    }
}

export default Progress;