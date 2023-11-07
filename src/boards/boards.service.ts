import {Injectable, NotFoundException} from '@nestjs/common';
import {Board, BoardStatus} from "./board.model";
import {v1 as uuid} from 'uuid';
import {CreateBoardDto} from "./dto/create-board.dto";

@Injectable()
export class BoardsService {
    private boards: Board[] = [];


    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto : CreateBoardDto) {
        const { title, description } = createBoardDto;

        const board : Board = {
            id : uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board)
        return board
    }

    getBoardById(id : string) {
        const found = this.boards.find((board) => board.id === id);

        if (!found) {
            throw new NotFoundException(`Can't found ${id} in boards`)
        }

        return found;
    }

    deleteBoardById(id: string) {
        const found = this.getBoardById(id);
        return this.boards.filter((board) => board.id !== found.id)
    }

    updateBoardStatus(id: string, status: BoardStatus) {
        const board = this.getBoardById(id);
        board.status = status;
        return board;

    }
}
