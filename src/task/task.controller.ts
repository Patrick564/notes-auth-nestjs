import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ListAllEntities } from './dto/list-all-entities.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './interfaces/task.interface';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private tasksService: TaskService) {}

  @Get('/all')
  async findAll(@Query() query: ListAllEntities): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post('/add')
  create(@Body() createTaskDto: CreateTaskDto) {
    return ""
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return ""
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return ""
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return ""
  }
}
