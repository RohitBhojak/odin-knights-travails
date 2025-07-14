export default function knightMoves(start, end) {
  if (!isValid(start) || !isValid(end)) {
    return "Enter valid starting and ending coordinates";
  }

  const visited = [];
  for (let i = 0; i < 8; i++) {
    const arr = [];
    for (let j = 0; j < 8; j++) arr.push(false);
    visited.push(arr);
  }

  const rowMoves = [2, 2, -2, -2, 1, 1, -1, -1];
  const colMoves = [1, -1, 1, -1, 2, -2, 2, -2];

  const queue = [];
  queue.push([start[0], start[1]]);
  visited[start[0]][start[1]] = true;
  let count = 0;

  while (queue.length) {
    let size = queue.length;
    count++;
    while (size--) {
      const [row, col] = queue.shift();
      if (row === end[0] && col === end[1]) return count;

      for (let i = 0; i < 8; i++) {
        const newRow = row + rowMoves[i];
        const newCol = col + colMoves[i];

        if (isValid([newRow, newCol]) && !visited[newRow][newCol]) {
          queue.push([newRow, newCol]);
          visited[newRow][newCol] = true;
        }
      }
    }
  }
  return -1;
}

function isValid(coordinates) {
  if (!Array.isArray(coordinates) || coordinates.length !== 2) return false;
  let [row, col] = coordinates;
  for (let i = 0; i < 2; i++) {
    if (coordinates[i] < 0 || coordinates[i] >= 8) return false;
  }
  return true;
}
