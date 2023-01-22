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

  @Get('')
  async findAll(): Promise<Task[]> {
    return this.tasksService.findAll()
  }

  @Post('/add')
  async create(@Body() newTask: CreateTaskDto): Promise<Task> {
    try {
      return this.tasksService.create(newTask)
    } catch (err) {
      throw new BadRequestException('Missing task content')
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    try {
      return await this.tasksService.findOne(id)
    } catch (err) {
      throw new NotFoundException('Task not found')
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() task: UpdateTaskDto
  ) {
    try {
      return this.tasksService.update(id, task)
    } catch (err) {
      throw new BadRequestException('Missing task content')
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.remove(id)
  }
}
