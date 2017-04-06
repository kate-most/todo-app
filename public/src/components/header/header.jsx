import * as React from "react";
import * as styles from "./header.scss";
import Search from "../search/search.jsx"

class Header extends React.Component {
    render() {
        return <div className={ styles.container }>
            <div className={ styles.inner }>
                <h1 className={ styles.title }>{this.props.title}</h1>
                <Search/>
            </div>
        </div>
    }
}

export default Header;