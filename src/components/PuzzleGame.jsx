import React, { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import Board from './Board';
import { puzzles } from '../data/puzzles';

export default function PuzzleGame() {
    const [game, setGame] = useState(new Chess());
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [status, setStatus] = useState('playing'); // playing, solved, failed
    const [selectedSquare, setSelectedSquare] = useState(null);
    const [lastMove, setLastMove] = useState(null);

    // Load puzzle
    useEffect(() => {
        const puzzle = puzzles[currentPuzzleIndex];
        const newGame = new Chess(puzzle.fen);
        setGame(newGame);
        setStatus('playing');
        setSelectedSquare(null);
        setLastMove(null);
    }, [currentPuzzleIndex]);

    function onSquareClick(square) {
        if (status !== 'playing') return;

        // Deselect if clicking same square
        if (selectedSquare && selectedSquare.square === square) {
            setSelectedSquare(null);
            return;
        }

        // Select piece
        if (!selectedSquare) {
            const piece = game.get(square);
            // Only select if it's the turn of the player (based on FEN)
            if (piece && piece.color === game.turn()) {
                setSelectedSquare({ square, row: 8 - parseInt(square[1]), col: square.charCodeAt(0) - 97 });
            }
            return;
        }

        // Attempt move
        try {
            const move = {
                from: selectedSquare.square,
                to: square,
                promotion: 'q', // always promote to queen for simplicity
            };

            const result = game.move(move);

            if (result) {
                // Valid move - Update state
                setGame(new Chess(game.fen())); // Force re-render
                setSelectedSquare(null);
                setLastMove(result);

                // Check against solution
                const puzzle = puzzles[currentPuzzleIndex];
                const expectedMove = puzzle.solution[0]; // Assuming 1-move puzzles for now or step by step

                if (result.lan === expectedMove || result.from + result.to === expectedMove) {
                    setStatus('solved');
                } else {
                    setStatus('failed');
                    // Undo move after a delay to show it was wrong? or just show red.
                    // For now, just set failed.
                }
            } else {
                // If invalid move but clicking on another own piece, select that instead
                const piece = game.get(square);
                if (piece && piece.color === game.turn()) {
                    setSelectedSquare({ square, row: 8 - parseInt(square[1]), col: square.charCodeAt(0) - 97 });
                } else {
                    setSelectedSquare(null);
                }
            }
        } catch (e) {
            // Invalid move (e.g. game.move throws or returns null)
            // Actually chess.js move() returns null on invalid, doesn't throw usually unless format wrong.
            // But we wrap in try just in case.
            const piece = game.get(square);
            if (piece && piece.color === game.turn()) {
                setSelectedSquare({ square, row: 8 - parseInt(square[1]), col: square.charCodeAt(0) - 97 });
            } else {
                setSelectedSquare(null);
            }
        }
    }

    function nextPuzzle() {
        if (currentPuzzleIndex < puzzles.length - 1) {
            setCurrentPuzzleIndex(prev => prev + 1);
        } else {
            alert("No more puzzles!");
        }
    }

    function retry() {
        const puzzle = puzzles[currentPuzzleIndex];
        const newGame = new Chess(puzzle.fen);
        setGame(newGame);
        setStatus('playing');
        setSelectedSquare(null);
        setLastMove(null);
    }

    return (
        <div className="puzzle-container">
            <h2>Puzzle #{currentPuzzleIndex + 1}</h2>
            <p>{puzzles[currentPuzzleIndex].blurb}</p>

            <div className={`game-area ${status}`}>
                <Board
                    board={game.board()}
                    onSquareClick={onSquareClick}
                    selectedSquare={selectedSquare}
                    lastMove={lastMove}
                />
            </div>

            <div className="status-area">
                {status === 'solved' && <div className="success">Has Solved! <button onClick={nextPuzzle}>Next</button></div>}
                {status === 'failed' && <div className="error">Incorrect! <button onClick={retry}>Retry</button></div>}
                {status === 'playing' && <div className="info">Your Turn ({game.turn() === 'w' ? 'White' : 'Black'})</div>}
            </div>
        </div>
    );
}
