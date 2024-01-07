// Inner components
import { Notify } from 'notiflix';
import { Component } from 'react';
// Functional
import fetchImgs from './apiFetch';
// User Components
import Searchbar from 'components/Searchbar/Searchbar';
import LoadMoreBtn from 'components/LoadMoreBtn/LoadMoreBtn';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
// CSS style
import styles from './App.module.css';

Notify.init({
  width: '300px',
  position: 'right-top',
  fontSize: '16px',
});

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    hits: [],
    selectedHit: null,
    loadMore: false,
    loader: false,
    isModalShow: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query } = this.state;

    if (query === '') {
      this.handleEmptyQuery();
      return;
    }

    if (this.shouldFetchData(prevState)) {
      this.fetchData();
    }
  }

  handleEmptyQuery() {
    Notify.warning('Search query is empty.');
  }

  shouldFetchData(prevState) {
    const { page, query } = this.state;
    return page !== prevState.page || query !== prevState.query;
  }

  async fetchData() {
    try {
      this.setState({ loader: true });
      const data = await fetchImgs(this.state.query, this.state.page);

      if (data.hits && data.hits.length > 0) {
        this.handleFetchSuccess(data);
      } else {
        Notify.failure('There are no results for your query.');
      }
    } catch (error) {
      this.handleFetchError(error);
    } finally {
      this.setState({ loader: false });
    }
  }

  handleFetchSuccess(data) {
    const { page } = this.state;

    if (page === 1) {
      Notify.success(`We found ${data.totalHits} results`);
    }

    this.setState(prevState => ({
      hits: [...prevState.hits, ...data.hits],
      loadMore: page < Math.ceil(data.totalHits / 12),
    }));
  }

  handleFetchError(error) {
    console.error(error.message);
  }

  handleSearchbarSubmit = query => {
    if (query === this.state.query) {
      Notify.warning('This query is already used.');
    }

    this.setState({
      query,
      hits: [],
      page: 1,
      loadMore: false,
    });
  };

  handleLoadMoreButton = _ => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleHitClick = ({ largeImageURL, tags }) => {
    this.setState({ selectedHit: { largeImageURL, tags } });
    this.toogleModal();
  };

  toogleModal = () => {
    this.setState(prevState => ({
      isModalShow: !prevState.isModalShow,
    }));
  };

  render() {
    const { hits, loadMore, loader, isModalShow, selectedHit } = this.state;

    return (
      <div className={styles['App-div']}>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        {loader && <Loader />}
        {hits.length && (
          <ImageGallery hits={hits} onHitClick={this.handleHitClick} />
        )}
        {isModalShow && (
          <Modal selectedHit={selectedHit} hideModal={this.toogleModal} />
        )}
        {loadMore && <LoadMoreBtn onClick={this.handleLoadMoreButton} />}
      </div>
    );
  }
}
