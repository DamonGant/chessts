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

import {ChessBoard} from './board';
import * as common from './common';

export class ChessPiece {
  constructor(public board: ChessBoard, public color: common.ChessPieceColor, public position: common.ChessPiecePosition) {

  }

  getMaxSteps() : number {
    return 8;
  }

  getType() : string {
    throw new Error("getType needs to be implemented");
  }

  getPossibleMoves() : common.ChessPiecePosition[] {
    throw new Error("getPossibleMoves needs to be implemented");
  }

  getSteppers() : common.Stepper[] {
    throw new Error("getSteppers needs to be implemented if used");
  }

  stepperIterator(stepper) {
    let possiblePositions = []
    for (let i = 1; i < this.getMaxSteps(); i++) {
      let position = stepper.bind(this)(i);
      if (!common.isPositionInBounds(position)) {
        break;
      }
      if (common.isOccupied(this.board, position)) {
        if (this.board.getPieceAtPosition(position).color !== this.color) {
          possiblePositions.push(position);
        }
        break;
      }
      possiblePositions.push(position);
    }
    return possiblePositions;
  }

  canMoveTo() {
    return this.getPossibleMoves();
  }
}

export class PawnPiece extends ChessPiece {
  getType() : string {
    return "Pawn";
  }

  getPossibleMoves() {
    let possiblePositions: common.ChessPiecePosition[] = [];
    
    let frontPosition;
    let frontLeftPosition;
    let frontRightPosition;

    if (this.color === common.ChessPieceColor.White) {
      frontPosition = {y: this.position.y - 1, x: this.position.x};
      frontLeftPosition = {y: this.position.y - 1, x: this.position.x - 1};
      frontRightPosition = {y: this.position.y - 1, x: this.position.x + 1};
    }
    if (this.color === common.ChessPieceColor.Black) {
      frontPosition = {y: this.position.y + 1, x: this.position.x};
      frontLeftPosition = {y: this.position.y + 1, x: this.position.x - 1};
      frontRightPosition = {y: this.position.y + 1, x: this.position.x + 1};
    }

    if (common.isPositionInBounds(frontPosition) && !common.isOccupied(this.board, frontPosition)) {
      possiblePositions.push(frontPosition);
    };

    if (common.isPositionInBounds(frontLeftPosition) && common.isOccupied(this.board, frontLeftPosition)) {
      if (this.board.getPieceAtPosition(frontLeftPosition).color !== this.color) {
        possiblePositions.push(frontLeftPosition);
      }
    };

    if (common.isPositionInBounds(frontRightPosition) && common.isOccupied(this.board, frontRightPosition)) {
      if (this.board.getPieceAtPosition(frontRightPosition).color !== this.color) {
        possiblePositions.push(frontRightPosition);
      }
    };
    return possiblePositions;
  }
}

export class KnightPiece extends ChessPiece {
  getType(): string {
    return "Knight";
  }

  getPossibleMoves() {
    let possiblePositions = [
      {x: this.position.x + 2, y: this.position.y - 1},
      {x: this.position.x + 2, y: this.position.y + 1},
      {x: this.position.x - 2, y: this.position.y - 1},
      {x: this.position.x - 2, y: this.position.y + 1},
      {x: this.position.x + 1, y: this.position.y + 2},
      {x: this.position.x + 1, y: this.position.y - 2},
      {x: this.position.x - 1, y: this.position.y + 2},
      {x: this.position.x - 1, y: this.position.y - 2}
    ]
    return possiblePositions
      .filter((position) => common.isPositionInBounds(position))
      .filter((position) => !(common.isOccupied(this.board, position) && this.board.getPieceAtPosition(position).color === this.color))
  }
}

export class KingPiece extends ChessPiece {
  getType() : string {
    return "King";
  }

  getMaxSteps() {
    return 1;
  }

  getSteppers() {
    return common.queenSteppers;
  }

  getPossibleMoves() : common.ChessPiecePosition[] {
    let possiblePositions : common.ChessPiecePosition[] = []
    this.getSteppers().forEach((stepper) => {
      possiblePositions = possiblePositions.concat(this.stepperIterator(stepper));
    });
    return possiblePositions;
  }
}

export class BishopPiece extends ChessPiece {
  getType() : string {
    return "Bishop"
  }

  getSteppers() {
    return common.bishopSteppers;
  }

  getPossibleMoves() : common.ChessPiecePosition[] {
    let possiblePositions : common.ChessPiecePosition[] = []
    this.getSteppers().forEach((stepper) => {
      possiblePositions = possiblePositions.concat(this.stepperIterator(stepper));
    });
    return possiblePositions;
  }
}

export class RookPiece extends ChessPiece {
  getType() : string {
    return "Rook"
  }

  getSteppers() {
    return common.rookSteppers;
  }

  getPossibleMoves() : common.ChessPiecePosition[] {
    let possiblePositions : common.ChessPiecePosition[] = []

    this.getSteppers().forEach((stepper) => {
      possiblePositions = possiblePositions.concat(this.stepperIterator(stepper));
    });
    
    return possiblePositions;
  }
}

export class QueenPiece extends ChessPiece {
  getType() : string {
    return "Queen"
  }

  getSteppers() {
    return common.queenSteppers;
  }

  getPossibleMoves() : common.ChessPiecePosition[] {
    let possiblePositions : common.ChessPiecePosition[] = []

    this.getSteppers().forEach((stepper) => {
      possiblePositions = possiblePositions.concat(this.stepperIterator(stepper));
    });
    
    return possiblePositions;
  }
}