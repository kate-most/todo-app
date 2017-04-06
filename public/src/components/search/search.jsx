import * as React from "react";
import * as styles from "./search.scss";

class Search extends React.Component {
    render() {
        return <div className={ styles.container }>
            <div className={ styles.confirm }>
                <input type='checkbox' className={ styles.checkbox }/>
                <label className={ styles.label }>Show done</label>
            </div>

            <input className={ styles.input } type='text' placeholder='Search'/>
        </div>
    }
}

export default Search;