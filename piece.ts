import {ChessBoard} from './board.ts';
import * as common from './common.ts';

export class ChessPiece {
  constructor(public board: ChessBoard, color: common.ChessPieceColor, position: common.ChessPiecePosition) {

  }

  canMoveTo() {
    throw new Error("canMoveTo needs to be implemented");
  }
}

export class KingPiece extends ChessPiece {

}