import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('')
  async findAll() {
    return this.tasksService.findAll();
  }

  @Post('/add')
  async create(@Body() newTask: CreateTaskDto) {
    return this.tasksService.create(newTask);
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
