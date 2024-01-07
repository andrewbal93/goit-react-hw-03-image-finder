import { Component } from 'react';
import { Notify } from 'notiflix';

import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  shouldComponentUpdate(_, nextState) {
    return this.state.query !== nextState.query;
  }

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    const { query } = this.state;
    e.preventDefault();
    if (query.trim() === '') {
      Notify.warning('Please write a search query.');
      this.reset();
      return;
    }
    this.props.onSubmit(query);
    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;

    return (
      <header className={styles['Searchbar']}>
        <form className={styles['SearchForm']} onSubmit={this.handleFormSubmit}>
          <button className={styles['SearchForm-button']} type="submit">
            <span className={styles['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={styles['SearchForm-input']}
            type="text"
            name="query"
            value={query}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          ></input>
        </form>
      </header>
    );
  }
}
