import * as React from "react";
import * as styles from "./icon.scss";

class Icon extends React.Component {
    render() {
        let className;
        if (this.props.action === 'update') {
            className = styles.itemUpdate;
        } else if (this.props.action === 'create') {
            className = styles.itemCreate;
        } else if (this.props.action === 'delete') {
            className = styles.itemDelete;
        } else {
            className = styles.item;
        }
        return <button title={ this.props.action } className={ className } />
    }
}

export default Icon;