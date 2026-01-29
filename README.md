# Chess Puzzle App

A modern, interactive Chess Puzzle application built with **React** and **Vite**. This app tests your chess tactics by presenting puzzles (FEN positions) that must be solved with the correct sequence of moves.

## Features

- **Interactive Board**: Fully functional 8x8 chess board using Unicode pieces.
- **Puzzle Engine**:
  - Loads puzzles from FEN strings.
  - Validates user moves against the correct solution.
  - Provides instant feedback (Correct/Incorrect).
- **Game Logic**: robust move validation and rule enforcement powered by `chess.js`.
- **UI/UX**:
  - Dark mode "Glassmorphism" aesthetic.
  - Responsive design.
  - Highlighted valid squares and move history.

## Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Chess Logic**: [chess.js](https://github.com/jhlywa/chess.js)
- **Styling**: Vanilla CSS (Variables, Flexbox, Grid)

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mbouges/ChessApp.git
   cd ChessApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Troubleshooting

### Node.js Compatibility
If you encounter `crypto.hash is not a function` errors, it likely means you are on Node.js v20.11.1 using a version of Vite that requires v20.12+.
This project has been configured with `vite@^5.4.11` to ensure compatibility with Node.js v20.11.1.

## License

[MIT](LICENSE)
