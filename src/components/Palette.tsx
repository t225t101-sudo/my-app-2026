import React from 'react';
import styles from './Palette.module.css';

const PRESET_COLORS = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FFA500', '#800080', '#008000', '#FFC0CB', '#A52A2A', '#000000',
  '#FFFFFF', '#808080', '#ADD8E6', '#90EE90', '#F0E68C', '#E6E6FA'
];

interface PaletteProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const Palette: React.FC<PaletteProps> = ({ selectedColor, onColorChange }) => {
  return (
    <div className={styles.paletteContainer}>
      <h3>カラーパレット</h3>
      <div className={styles.colorGrid}>
        {PRESET_COLORS.map(color => (
          <div
            key={color}
            className={`${styles.colorBox} ${selectedColor === color ? styles.selected : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>
      <div className={styles.customColor}>
        <label htmlFor="custom-color">カスタム:</label>
        <input
          id="custom-color"
          type="color"
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Palette;
