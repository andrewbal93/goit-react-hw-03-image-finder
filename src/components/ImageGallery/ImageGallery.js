import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ hits, onHitClick }) {
  return (
    <ul className={styles['ImageGallery']}>
      {hits.length > 0 &&
        hits.map(hit => (
          <ImageGalleryItem key={hit.id} hit={hit} onHitClick={onHitClick} />
        ))}
    </ul>
  );
}
