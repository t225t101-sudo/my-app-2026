import React, { useRef, useEffect, useState } from 'react';
import { floodFill, hexToRgba } from '../utils/floodFill';
import styles from './Canvas.module.css';

interface CanvasProps {
  imageUrl: string;
  selectedColor: string;
}

const Canvas: React.FC<CanvasProps> = ({ imageUrl, selectedColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      // Clear canvas and draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate aspect ratio to fit image
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      
      // Initial state for history
      setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    };
  }, [imageUrl]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * canvas.width);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const fillColor = hexToRgba(selectedColor);

    floodFill(imageData, x, y, fillColor);
    ctx.putImageData(imageData, 0, 0);

    // Save to history (limited to last 10 steps)
    setHistory(prev => [...prev.slice(-9), imageData]);
  };

  const undo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // Remove current state
    const prevState = newHistory[newHistory.length - 1];
    ctx.putImageData(prevState, 0, 0);
    setHistory(newHistory);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'colored-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className={styles.canvasContainer}>
      <div className={styles.controls}>
        <button onClick={undo} disabled={history.length <= 1}>元に戻す (Undo)</button>
        <button onClick={download}>ダウンロード</button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        className={styles.canvas}
      />
    </div>
  );
};

export default Canvas;
