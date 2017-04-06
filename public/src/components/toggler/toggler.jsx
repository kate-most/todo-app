import * as React from "react";
import * as styles from "./toggler.scss";

class Toggler extends React.Component {

    render() {
        let className = (this.props.isCollapsed) ? styles.itemOpened : styles.itemClosed;
        return <button className={ className } title={this.props.isCollapsed} onClick={this.props.onClick}/>
    }
}

export default Toggler;