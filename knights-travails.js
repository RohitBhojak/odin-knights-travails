export default function knightMoves(start, end) {
  // Check validity of arguments
  if (!isValid(start) || !isValid(end)) {
    throw new Error("Enter valid starting and ending coordinates");
  }

  // Initialize visited matrix to false
  const visited = [];
  for (let i = 0; i < 8; i++) {
    const arr = [];
    for (let j = 0; j < 8; j++) arr.push(false);
    visited.push(arr);
  }

  // Initialize map to keep track of parent coordinates
  const parent = new Map();

  // Moves array
  const rowMoves = [2, 2, -2, -2, 1, 1, -1, -1];
  const colMoves = [1, -1, 1, -1, 2, -2, 2, -2];

  // Initialize queue with start and mark visited
  const queue = [];
  visitSquare(queue, visited, parent, null, start); //set start parent to null

  // Initialize moves to zero
  let moves = 0;

  // While queue is not empty
  while (queue.length) {
    let size = queue.length;

    while (size--) {
      // Dequeue square
      const [row, col] = queue.shift();
      const square = [row, col];

      // Get path if end is reached
      if (square[0] === end[0] && square[1] === end[1]) {
        console.log(`You made it in ${moves} moves!  Here's your path:`);
        getPath(parent, square);
        return;
      }

      // Loop to move the knight
      for (let i = 0; i < 8; i++) {
        const newRow = row + rowMoves[i];
        const newCol = col + colMoves[i];
        const newSquare = [newRow, newCol];

        // If move is valid visit square
        if (isValid(newSquare) && !visited[newRow][newCol]) {
          visitSquare(queue, visited, parent, square, newSquare);
        }
      }
    }

    // Increment moves
    moves++;
  }
}

// A square is valid iff it's an array of length 2 with values in the range [0, 7];
function isValid(square) {
  if (!Array.isArray(square) || square.length !== 2) return false;
  for (let i = 0; i < 2; i++) {
    if (square[i] < 0 || square[i] >= 8) return false;
  }
  return true;
}

// Pushes a square to queue, marks it as visited and sets its parent
function visitSquare(queue, visited, parent, from, to) {
  queue.push(to);
  visited[to[0]][to[1]] = true;
  parent.set(JSON.stringify(to), JSON.stringify(from));
}

// Logs the path recursively
function getPath(parent, square) {
  const parentSquare = JSON.parse(parent.get(JSON.stringify(square)));
  if (parentSquare === null) {
    console.log(square);
    return;
  }

  getPath(parent, parentSquare);
  console.log(square);
}
