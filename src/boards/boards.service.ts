import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Board} from "./board.entity";
import {Repository} from "typeorm";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatus} from "./board-status.enum";
import {User} from "../auth/user.entity";


@Injectable()
export class BoardsService {

    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>
    ) {}

    async getAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find();
    }
    async getUserBoards(user: User): Promise<Board[]> {
        console.log(user)
        return await this.boardRepository.findBy({'userId': user.id});
    }

    async createBoard(
        createBoardDto: CreateBoardDto,
        user: User): Promise<Board> {

        const {title, description} = createBoardDto;

        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
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


    async deleteBoardById(id: number, user: User): Promise<Object> {
        const result = await this.boardRepository.delete({id, 'userId': user.id})
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
