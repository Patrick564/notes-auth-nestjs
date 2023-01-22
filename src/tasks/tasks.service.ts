import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) {}

  create(task: CreateTaskDto) {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  findAll() {
    return this.tasksRepository.find();
  }

  findOne(id: number) {
    return this.tasksRepository.findOneBy({ id });
  }

  update(id: number, task: UpdateTaskDto) {
    return this.tasksRepository.update(id, task);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
