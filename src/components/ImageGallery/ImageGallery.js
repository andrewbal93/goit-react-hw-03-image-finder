import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';
import { nanoid } from 'nanoid';

export default function ImageGallery({ hits, onHitClick }) {
  return (
    <ul className={styles['ImageGallery']}>
      {hits.length > 0 &&
        hits.map(hit => (
          <ImageGalleryItem
            key={hit.id + nanoid()}
            hit={hit}
            onHitClick={onHitClick}
          />
        ))}
    </ul>
  );
}
