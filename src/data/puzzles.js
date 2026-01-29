export const puzzles = [
  {
    id: "1",
    fen: "4k3/8/4K3/8/8/8/8/7R w - - 0 1",
    blurb: "White to move. Mate in 1.",
    solution: ["h1h8"], // UCI format
  },
  {
    id: "2",
    fen: "rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2",
    blurb: "Black to move. Mate in 1.",
    solution: ["d8h4"],
  },
  {
    id: "3",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
    blurb: "White to move. Mate in 1.",
    solution: ["h5f7"],
  }
];
