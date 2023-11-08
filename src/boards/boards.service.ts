import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Board} from "./board.entity";
import {Repository} from "typeorm";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatus} from "./board-status.enum";


@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>
    ) {}

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {

        const {title, description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        });

        await this.boardRepository.save(board);

        return board;
    }
    async getBoardById(id: number): Promise<Board> {

        const found: Board = await this.boardRepository.findOneBy({id: id});

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }


    async deleteBoardById(id: number): Promise<Object> {
        const result = await this.boardRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException()
        } else {
            return {result: "success"}
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        console.log(board);

        board.status = status

        await this.boardRepository.save(board);

        return board;
    }

}
