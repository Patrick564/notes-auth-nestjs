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

  @Get(':userId')
  async findAll(
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<Task[]> {
    return this.tasksService.findAll(userId)
  }

  @Post(':userId/add')
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() newTask: CreateTaskDto
  ): Promise<Task> {
    try {
      return this.tasksService.create(userId, newTask)
    } catch (err) {
      throw new BadRequestException('Missing task content')
    }
  }

  @Get(':userId/:id')
  async findOne(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number
  ): Promise<Task> {
    try {
      return await this.tasksService.findOne(userId, id)
    } catch (err) {
      throw new NotFoundException('Task not found')
    }
  }

  @Patch(':userId/:id')
  async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto
  ) {
    try {
      return this.tasksService.update(userId, id, task)
    } catch (err) {
      throw new BadRequestException('Missing task content')
    }
  }

  @Delete(':userId/:id')
  async remove(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) id: number
  ): Promise<void> {
    return this.tasksService.remove(userId, id)
  }
}
