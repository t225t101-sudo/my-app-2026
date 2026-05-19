/**
 * Flood fill algorithm using a stack-based approach (DFS).
 * @param imageData The canvas ImageData object.
 * @param x The start X coordinate.
 * @param y The start Y coordinate.
 * @param fillColor The color to fill with [R, G, B, A].
 */
export function floodFill(
  imageData: ImageData,
  x: number,
  y: number,
  fillColor: [number, number, number, number]
) {
  const { width, height, data } = imageData;
  const startPos = (y * width + x) * 4;
  const startColor: [number, number, number, number] = [
    data[startPos],
    data[startPos + 1],
    data[startPos + 2],
    data[startPos + 3],
  ];

  // If start color is the same as fill color, do nothing
  if (
    startColor[0] === fillColor[0] &&
    startColor[1] === fillColor[1] &&
    startColor[2] === fillColor[2] &&
    startColor[3] === fillColor[3]
  ) {
    return;
  }

  // We should also avoid filling black lines (assuming black is the line color)
  // For a simple coloring book, we can assume anything very dark is a line.
  const isLine = (r: number, g: number, b: number, a: number) => {
    return r < 50 && g < 50 && b < 50 && a > 200;
  };

  if (isLine(startColor[0], startColor[1], startColor[2], startColor[3])) {
    return;
  }

  const stack: [number, number][] = [[x, y]];

  while (stack.length > 0) {
    const [currX, currY] = stack.pop()!;
    const currPos = (currY * width + currX) * 4;

    if (
      data[currPos] === startColor[0] &&
      data[currPos + 1] === startColor[1] &&
      data[currPos + 2] === startColor[2] &&
      data[currPos + 3] === startColor[3]
    ) {
      data[currPos] = fillColor[0];
      data[currPos + 1] = fillColor[1];
      data[currPos + 2] = fillColor[2];
      data[currPos + 3] = fillColor[3];

      if (currX + 1 < width) stack.push([currX + 1, currY]);
      if (currX - 1 >= 0) stack.push([currX - 1, currY]);
      if (currY + 1 < height) stack.push([currX, currY + 1]);
      if (currY - 1 >= 0) stack.push([currX, currY - 1]);
    }
  }
}

export function hexToRgba(hex: string): [number, number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b, 255];
}
