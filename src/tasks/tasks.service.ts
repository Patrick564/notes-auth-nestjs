import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {}
  private readonly tasks: Task[] = [];

  create(task: CreateTaskDto) {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  findAll() {
    return this.tasksRepository.find();
  }
}
