import * as React from "react";
import * as styles from "./to-do-item.scss";
import Icon from "../icon/icon.jsx";

class ToDoItem extends React.Component {
    render() {
        return <div className={ styles.container }>
            <input type="checkbox" className={ styles.input }/>
            <label className={ styles.label }>{ this.props.title }</label>
            <Icon action="update"/>
        </div>
    }
}

export default ToDoItem;