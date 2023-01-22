import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListAllEntities } from './dto/list-all-entities.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private tasksService: TaskService) {}

  @Get('/all')
  async findAll(@Query() query: ListAllEntities) {
    return this.tasksService.findAll();
  }

  @Post('/add')
  async create(@Body() createTaskDto: CreateTaskDto) {
    return ""
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return ""
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return ""
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return ""
  }
}
