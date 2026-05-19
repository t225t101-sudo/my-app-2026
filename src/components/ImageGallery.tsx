import React from 'react';
import styles from './ImageGallery.module.css';

const TEMPLATES = [
  { id: '1', url: 'https://raw.githubusercontent.com/t225t101-sudo/coloring-book-assets/main/cat.png', label: 'ねこ' },
  { id: '2', url: 'https://raw.githubusercontent.com/t225t101-sudo/coloring-book-assets/main/dog.png', label: 'いぬ' },
  { id: '3', url: 'https://raw.githubusercontent.com/t225t101-sudo/coloring-book-assets/main/flower.png', label: 'おはな' },
];

interface ImageGalleryProps {
  onSelect: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ onSelect }) => {
  return (
    <div className={styles.galleryContainer}>
      <h3>線画をえらぶ</h3>
      <div className={styles.thumbnailGrid}>
        {TEMPLATES.map(template => (
          <div key={template.id} className={styles.thumbnailItem} onClick={() => onSelect(template.url)}>
            <img src={template.url} alt={template.label} />
            <span>{template.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
