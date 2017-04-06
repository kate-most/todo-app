import * as React from "react";
import { render } from "react-dom";
import * as styles from "./app.scss";
import Header from "./components/header/header.jsx";
import Grid from "./components/grid/grid.jsx"

class App extends React.Component {
    render() {
        return <div key="app" className={ styles.app }>
            <Header title="To-Do List"/>
            <Grid/>
        </div>
    }
}

render(
    <App/>,
    document.getElementById("react-root")
);
