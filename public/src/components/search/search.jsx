import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import * as styles from './search.scss';

const Search = ({ params, searchParams, changeSearchName, changeSearchStatus, clearSearchName, clearError }) => {

    const categoryId = params.category;

    return (
        <div className={ styles.container }>
            <div className={ styles.checkboxWrap }>
                <input type='checkbox'
                       name='show-done'
                       id='show-done'
                       value={searchParams.onlyCompleted}
                       checked={searchParams.onlyCompleted}
                       className={styles.checkbox}
                       onChange={() => {
                           changeSearchStatus();
                           clearError();
                       }} />
                <label htmlFor='show-done' className={styles.checkboxLabel} />
                <div className={styles.checkboxTitle}>Show done</div>
            </div>

            <div className={styles.inputWrap}>
                <input type='text'
                       placeholder='Search'
                       value={searchParams.name}
                       className={styles.input}
                       onChange={(event) => {
                           changeSearchName(event.target.value);
                           clearError();
                       }} />
                <button type='button' className={styles.inputClose} onClick={() => {
                    clearSearchName();
                    clearError();
                }} />
            </div>
            <button type='button' className={styles.button}>
                <Link className={styles.buttonLink} to={categoryId + '?name=' + searchParams.name + '&completed=' + searchParams.onlyCompleted}>Search</Link>
            </button>
        </div>
    )
};

Search.propTypes = {
    params: PropTypes.shape({
        category: PropTypes.string.isRequired
    }),
    searchParams: PropTypes.shape({
        name: PropTypes.string,
        onlyCompleted: PropTypes.bool
    }),
    changeSearchName: PropTypes.func.isRequired,
    changeSearchStatus: PropTypes.func.isRequired,
    clearSearchName: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired
};

export default Search;