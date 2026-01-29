import React from 'react';
import './Board.css';

const PIECES = {
    w: { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' },
    b: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' },
};

export default function Board({ board, onSquareClick, selectedSquare, lastMove }) {
    const getSquareColor = (row, col) => {
        const isDark = (row + col) % 2 === 1;
        return isDark ? 'dark-square' : 'light-square';
    };

    const getPieceSymbol = (piece) => {
        if (!piece) return '';
        return PIECES[piece.color][piece.type];
    };

    const isSelected = (row, col) => {
        return selectedSquare && selectedSquare.row === row && selectedSquare.col === col;
    };

    const isLastMove = (row, col) => {
        if (!lastMove) return false;
        const fromRow = 8 - parseInt(lastMove.from[1]);
        const fromCol = lastMove.from.charCodeAt(0) - 97;
        const toRow = 8 - parseInt(lastMove.to[1]);
        const toCol = lastMove.to.charCodeAt(0) - 97;

        return (row === fromRow && col === fromCol) || (row === toRow && col === toCol);
    }

    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {row.map((piece, colIndex) => {
                        const squareId = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
                        return (
                            <div
                                key={colIndex}
                                className={`square ${getSquareColor(rowIndex, colIndex)} ${isSelected(rowIndex, colIndex) ? 'selected' : ''} ${isLastMove(rowIndex, colIndex) ? 'highlight' : ''}`}
                                onClick={() => onSquareClick(squareId)}
                            >
                                <span className={`piece ${piece ? piece.color : ''}`}>
                                    {getPieceSymbol(piece)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
