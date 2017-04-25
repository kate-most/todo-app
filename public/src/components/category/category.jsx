import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Toggler from './../toggler/toggler.jsx'
import CategoriesList from './../categories-list/categories-list.jsx';
import * as styles from './category.scss';

const Category = ({ id, parentId, categories, toDos, params, removeCategory, collapseCategory, handleChoseNewCategory, openModal }) => {

    return (
        <li className={styles.container}>
            <div className={styles.inner}>
                {categories.byId[id].children.length ?
                    <Toggler isCollapsed={categories.byId[id].isCollapsed}
                             collapseCategory={collapseCategory}
                             id={id}/> :
                    null
                }

                <h4 className={styles.title}>
                    <Link to={`/${id}`}
                          className={styles.titleLink}
                          activeClassName={styles.titleLinkActive}>{categories.byId[id].name}</Link>
                </h4>

                {(params.todo && categories.byId[params.category].toDos.length && toDos.byId[params.todo])  ?
                    <button type='button' title='move' className={styles.buttonMove} onClick={() => {handleChoseNewCategory(id)}}/> :

                    <div className={styles.buttonsList}>
                        <button type='button' title='edit' className={styles.buttonEdit} onClick={() => {openModal(id, true)}}/>
                        <button type='button' title='remove' className={styles.buttonRemove} onClick={() => {
                            if (confirm('Delete the category ' + categories.byId[id].name + '?')) removeCategory(id, parentId);
                        }}/>
                        <button type='button' title='create child' className={styles.buttonCreate} onClick={() => {openModal(id, false)}}/>
                    </div>
                }
            </div>

            {categories.byId[id].children.length && !categories.byId[id].isCollapsed ?
                <div className={styles.list}>
                    <CategoriesList parentId={id}
                                    children={categories.byId[id].children}
                                    categories={categories}
                                    toDos={toDos}
                                    params={params}
                                    removeCategory={removeCategory}
                                    collapseCategory={collapseCategory}
                                    handleChoseNewCategory={handleChoseNewCategory}
                                    openModal={openModal}/>
                </div> : null}
        </li>
    )
};

Category.propTypes = {
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    categories:PropTypes.object.isRequired,
    toDos: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    removeCategory: PropTypes.func.isRequired,
    collapseCategory: PropTypes.func.isRequired,
    handleChoseNewCategory: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired
};

export default Category;