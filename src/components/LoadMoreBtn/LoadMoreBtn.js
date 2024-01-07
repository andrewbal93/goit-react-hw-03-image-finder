import styles from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={styles['loadmore-div']}>
      <button className={styles['loadmore-btn']} onClick={onClick}>
        More..
      </button>
    </div>
  );
}
