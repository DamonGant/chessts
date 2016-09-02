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