import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { BoardsService } from './boards.service';
import {Board, BoardStatus} from "./board.model";
import {CreateBoardDto} from "./dto/create-board.dto";
@Controller('boards')
export class BoardsController {
    constructor(private boardService: BoardsService) {}


    @Get('')
    getAllBoard() : Board[] {
        return this.boardService.getAllBoards();
    }

    @Post('')
    createBoard(@Body() createBoardDto: CreateBoardDto) : Board {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string) : Board {
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoardById(@Param() id: string) {
        return this.boardService.deleteBoardById(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param() id: string,
        @Body() status: BoardStatus
    ){
        return this.boardService.updateBoardStatus(id, status)
    }
}
