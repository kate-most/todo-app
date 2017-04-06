import * as React from "react";
import * as styles from "./category.scss";
import Icon from "../icon/icon.jsx";
import Toggler from "../toggler/toggler.jsx";

class Category extends React.Component {  constructor(props) {
    super(props);
    this.state = {isCollapsed: true};

    this.Collapse = this.Collapse.bind(this);
}

    Collapse() {
        this.setState(prevState => ({
            isCollapsed: !prevState.isCollapsed
        }));
    }

    render() {
        return <div className={ styles.container }>
            <Toggler isCollapsed={ this.state.isCollapsed } onClick={this.Collapse}/>
            <h4 className={ styles.title }>{ this.props.title }</h4>
            <div className={ styles.actions}>
                <Icon action="update"/>
                <div className="category__actions-inner">
                    <Icon action="delete"/>
                    <Icon action="create"/>
                </div>
            </div>
        </div>
    }
}

export default Category;