import {
    Body,
    Controller,
    Delete,
    Get, Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {BoardsService} from "./boards.service";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatus} from "./board-status.enum";
import {BoardStatusValidationPipe} from "./pipe/board-status-validation.pipe";
import {AuthGuard} from "@nestjs/passport";
import {GetUser} from "../auth/get-user.decorator";
import {User} from "../auth/user.entity";


@Controller('/boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardController');
    constructor(
        private readonly boardService: BoardsService,
    ) {}

    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardService.getAllBoards();
    }

    @Get('/user')
    getUserBoards(@GetUser() user: User): Promise<Board[]> {
        this.logger.verbose(`User info ${user.userName}`)
        return this.boardService.getUserBoards(user);
    }

    @Post('')
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user:User): Promise<Board> {
        return this.boardService.createBoard(createBoardDto, user)
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id, @GetUser() user: User): Promise<Object> {
        return this.boardService.deleteBoardById(id, user);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id', ParseIntPipe) id, @Body('status', BoardStatusValidationPipe) status: BoardStatus): Promise<Board> {
        return this.boardService.updateBoardStatus(id, status)
    }
}
