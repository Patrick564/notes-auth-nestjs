import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TaskService {
  private readonly tasks: Task[] = [];

  create(task: Task) {
    this.tasks.push(task);
  }

  findAll(): Task[] {
    return this.tasks
  }
}
