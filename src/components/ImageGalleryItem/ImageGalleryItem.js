import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ hit, onHitClick }) {
  return (
    <>
      <li className={styles['ImageGalleryItem']}>
        <img
          className={styles['ImageGalleryItem-image']}
          src={hit.webformatURL}
          alt={hit.tags}
          onClick={() => onHitClick(hit)}
        />
      </li>
    </>
  );
}
