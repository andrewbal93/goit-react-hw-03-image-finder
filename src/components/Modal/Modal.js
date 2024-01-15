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

  handleOverlayClick = () => {
    this.props.hideModal();
  };

  handleModalClick = e => {
    e.stopPropagation();
  };

  render() {
    const { largeImageURL, tags } = this.props.selectedHit;

    return (
      <div className={styles['Overlay']} onClick={this.handleOverlayClick}>
        <div className={styles['Modal']} onClick={this.handleModalClick}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
