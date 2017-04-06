import * as React from "react";
import * as styles from "./grid.scss";
import Progress from "../progress-bar/progress-bar.jsx";
import CreateItem from "../create-item/create-item.jsx";
import Category from "../category/category.jsx";
import ToDoItem from "../to-do-item/to-do-item.jsx";

class Page extends React.Component {
    render() {
        return <div className={ styles.container }>
            <div className={ styles.progress }>
                <Progress/>
            </div>
            <div className={ styles.reducer }>
                <div className={ styles.actions }>
                    <CreateItem placeholder="category title"/>
                    <CreateItem placeholder="todo item title"/>
                </div>

                <div className={ styles.content }>
                    <div className={ styles.categories }>
                        <Category title="Category 1"/>
                        <Category title="Category 2"/>
                        <Category title="Category 3"/>
                    </div>

                    <div className={ styles.todos }>
                        <ToDoItem title="To-Do item #1"/>
                        <ToDoItem title="To-Do item #1"/>
                        <ToDoItem title="To-Do item #1"/>
                        <ToDoItem title="To-Do item #1"/>
                        <ToDoItem title="To-Do item #1"/>
                        <ToDoItem title="To-Do item #1"/>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Page;