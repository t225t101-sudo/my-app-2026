import { useState } from 'react'
import './App.css'
import Canvas from './components/Canvas'
import Palette from './components/Palette'
import ImageGallery from './components/ImageGallery'

function App() {
  const [selectedColor, setSelectedColor] = useState('#FF0000')
  const [selectedImage, setSelectedImage] = useState('https://raw.githubusercontent.com/t225t101-sudo/coloring-book-assets/main/cat.png')

  return (
    <div className="app-container">
      <header>
        <h1>ぬりえアプリ</h1>
      </header>
      <main>
        <div className="sidebar left">
          <ImageGallery onSelect={setSelectedImage} />
        </div>
        <div className="canvas-area">
          <Canvas imageUrl={selectedImage} selectedColor={selectedColor} />
        </div>
        <div className="sidebar right">
          <Palette selectedColor={selectedColor} onColorChange={setSelectedColor} />
        </div>
      </main>
      <footer>
        <p>&copy; 2026 Coloring Book App</p>
      </footer>
    </div>
  )
}

export default App
