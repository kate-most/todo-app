import * as React from "react";
import * as styles from "./create-item.scss";

class CreateItem extends React.Component {
    render() {
        return <div className={ styles.container }>
            <input type="text" placeholder={"Enter " + this.props.placeholder} className={ styles.input }/>
            <button type="send" className={ styles.button }>Add</button>
        </div>
    }
}

export default CreateItem;