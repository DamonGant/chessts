/*
 * ChessTS, TypeScript Chess Logic
 * Copyright (C) 2016 Alexander Schittler
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as pieces from './piece';
import {
  ChessPieceColor,
  XFieldCoordinate,
  YFieldCoordinate,
  SerializePosition,
  DeserializePosition,
  ChessPiecePosition
} from './common';

export class ChessBoard {
  field: pieces.ChessPiece[] = [];

  constructor() {
    // populate the field array
    this.defaultSetup();
  }

  defaultSetup() {
    this.field = [];
    this.pushPieces(
      new pieces.KingPiece(this, ChessPieceColor.White, {x: 4, y:7}),
      new pieces.QueenPiece(this, ChessPieceColor.White, {x: 3, y:7}),
      new pieces.BishopPiece(this, ChessPieceColor.White, {x: 2, y:7}),
      new pieces.BishopPiece(this, ChessPieceColor.White, {x: 5, y:7}),
      new pieces.RookPiece(this, ChessPieceColor.White, {x: 0, y:7}),
      new pieces.RookPiece(this, ChessPieceColor.White, {x: 7, y:7}),
      new pieces.KnightPiece(this, ChessPieceColor.White, {x: 1, y:7}),
      new pieces.KnightPiece(this, ChessPieceColor.White, {x: 6, y:7}),
      new pieces.PawnPiece(this, ChessPieceColor.White, {x: 0, y: 6}),
      new pieces.PawnPiece(this, ChessPieceColor.White, {x: 1, y: 6}),
      new pieces.PawnPiece(this, ChessPieceColor.White, {x: 2, y: 6}),
      new pieces.PawnPiece(this, ChessPieceColor.White, {x: 3, y: 6}),
      new pieces.PawnPiece(this, ChessPieceColor.White, {x: 4, y: 6}),
      new pieces.PawnPiece(this, ChessPieceColor.White, {x: 5, y: 6}),
      new pieces.PawnPiece(this, ChessPieceColor.White, {x: 6, y: 6}),
      new pieces.PawnPiece(this, ChessPieceColor.White, {x: 7, y: 6}),

      new pieces.KingPiece(this, ChessPieceColor.Black, {x: 4, y:0}),
      new pieces.QueenPiece(this, ChessPieceColor.Black, {x: 3, y:0}),
      new pieces.BishopPiece(this, ChessPieceColor.Black, {x: 2, y:0}),
      new pieces.BishopPiece(this, ChessPieceColor.Black, {x: 5, y:0}),
      new pieces.RookPiece(this, ChessPieceColor.Black, {x: 0, y:0}),
      new pieces.RookPiece(this, ChessPieceColor.Black, {x: 7, y:0}),
      new pieces.KnightPiece(this, ChessPieceColor.Black, {x: 1, y:0}),
      new pieces.KnightPiece(this, ChessPieceColor.Black, {x: 6, y:0}),
      new pieces.PawnPiece(this, ChessPieceColor.Black, {x: 0, y: 1}),
      new pieces.PawnPiece(this, ChessPieceColor.Black, {x: 1, y: 1}),
      new pieces.PawnPiece(this, ChessPieceColor.Black, {x: 2, y: 1}),
      new pieces.PawnPiece(this, ChessPieceColor.Black, {x: 3, y: 1}),
      new pieces.PawnPiece(this, ChessPieceColor.Black, {x: 4, y: 1}),
      new pieces.PawnPiece(this, ChessPieceColor.Black, {x: 5, y: 1}),
      new pieces.PawnPiece(this, ChessPieceColor.Black, {x: 6, y: 1}),
      new pieces.PawnPiece(this, ChessPieceColor.Black, {x: 7, y: 1}),
    );
  }

  pushPieces(...pieces: pieces.ChessPiece[]) {
    pieces.forEach((piece: pieces.ChessPiece) => this.field.push(piece))
  }

  getPieceAtPosition(position: ChessPiecePosition) {
    return this.field.reduce<pieces.ChessPiece>((iterator: pieces.ChessPiece, piece: pieces.ChessPiece) => {
      if (piece.position.y === position.y && piece.position.x === piece.position.x) {
        return piece;
      }
      return iterator;
    }, null);
  }

  toJSON() {
    return this.field.reduce<any[]>((iterator: any[], piece: pieces.ChessPiece) => {
      iterator.push({
        color: ChessPieceColor[piece.color],
        position: piece.position,
        type: piece.getType(),
        canMoveTo: piece.canMoveTo()
      });
      return iterator;
    }, []);
  }

  
};

let board = new ChessBoard();

console.log(JSON.stringify(
  board.toJSON()
));