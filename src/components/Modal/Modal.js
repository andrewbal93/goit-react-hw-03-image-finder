import { Component } from 'react';
import styles from './Modal.module.css';

export default class Modal extends Component {
  handleEscClick = e => {
    if (e.code === 'Escape') {
      this.props.hideModal();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscClick);
  }

  render() {
    const { largeImageURL, tags } = this.props.selectedHit;

    return (
      <div className={styles['Overlay']}>
        <div className={styles['Modal']}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
