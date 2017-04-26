import React, {PropTypes } from 'react';
import { Link } from 'react-router';
import * as styles from './search.scss';

const Search = ({ categoryId, searchParams, handleChangeSearchName, handleChangeSearchStatus, clearSearchName }) => (
    <div className={ styles.container }>
        <div className={ styles.checkboxWrap }>
            <input type='checkbox'
                   name='show-done'
                   id='show-done'
                   value={searchParams.onlyCompleted}
                   checked={searchParams.onlyCompleted}
                   className={styles.checkbox}
                   onChange={() => {handleChangeSearchStatus()}}/>
            <label htmlFor='show-done' className={styles.checkboxLabel}/>
            <div className={styles.checkboxTitle}>Show done</div>
        </div>

        <div className={styles.inputWrap}>
            <input type='text'
                   placeholder='Search'
                   value={searchParams.name}
                   className={styles.input}
                   onChange={(event) => {handleChangeSearchName(event)}}/>
            <button type='button' className={styles.inputClose} onClick={clearSearchName}/>
        </div>
        <button type='button' className={styles.button}>
            <Link className={styles.buttonLink} to={categoryId + '?name=' + searchParams.name + '&completed=' + searchParams.onlyCompleted}>Search</Link>
        </button>
    </div>
);

Search.propTypes = {
    categoryId: PropTypes.string.isRequired,
    searchParams: PropTypes.shape({
        name: PropTypes.string.isRequired,
        onlyCompleted: PropTypes.bool.isRequired
    }).isRequired,
    handleChangeSearchName: PropTypes.func.isRequired,
    handleChangeSearchStatus: PropTypes.func.isRequired,
    clearSearchName: PropTypes.func.isRequired
};

export default Search;