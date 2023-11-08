import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {BoardsService} from "./boards.service";
import {Board} from "./board.entity";
import {CreateBoardDto} from "./dto/create-board.dto";
import {BoardStatus} from "./board-status.enum";
import {BoardStatusValidationPipe} from "./pipe/board-status-validation.pipe";


@Controller('/boards')
export class BoardsController {
    constructor(private readonly boardService: BoardsService) {}

    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardService.getAllBoards();
    }

    @Post('')
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.createBoard(createBoardDto)
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id): Promise<Object> {
        return this.boardService.deleteBoardById(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(@Param('id', ParseIntPipe) id, @Body('status', BoardStatusValidationPipe) status: BoardStatus): Promise<Board> {
        return this.boardService.updateBoardStatus(id, status)
    }
}
