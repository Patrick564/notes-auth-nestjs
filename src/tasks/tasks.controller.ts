import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  BadRequestException,
  NotFoundException
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './tasks.entity'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':username')
  async findAll(@Param('username') username: string): Promise<Task[]> {
    return this.tasksService.findAll(username)
  }

  @Post(':username/add')
  async create(
    @Param('username') username: string,
    @Body() newTask: CreateTaskDto
  ): Promise<Task> {
    try {
      return this.tasksService.create(username, newTask)
    } catch (err) {
      throw new BadRequestException('Missing task content')
    }
  }

  @Get(':username/:id')
  async findOne(
    @Param('username') username: string,
    @Param('id', ParseIntPipe) id: number
  ): Promise<Task> {
    try {
      return await this.tasksService.findOne(username, id)
    } catch (err) {
      throw new NotFoundException('Task not found')
    }
  }

  @Patch(':username/:id')
  async update(
    @Param('username') username: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto
  ) {
    try {
      return this.tasksService.update(username, id, task)
    } catch (err) {
      throw new BadRequestException('Missing task content')
    }
  }

  @Delete(':username/:id')
  async remove(
    @Param('username') username: string,
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    return this.tasksService.remove(username, id)
  }
}
