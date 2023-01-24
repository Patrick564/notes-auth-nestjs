import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/users.entity'
import { Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './tasks.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async create(userId: number, taskData: CreateTaskDto) {
    if (taskData.content === '') {
      throw new Error('Empty task content')
    }

    const task = this.tasksRepository.create(taskData)
    const newTask = await this.tasksRepository.save(task)
    const owner = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['tasks']
    })

    owner.tasks.push(task)
    await this.usersRepository.save(owner)

    return newTask
  }

  async findAll(userId: number) {
    const owner = await this.usersRepository.findOneBy({ id: userId })

    return this.tasksRepository.find({ where: { owner } })
  }

  async findOne(userId: number, id: number) {
    const owner = await this.usersRepository.findOneBy({ id: userId })
    const found = await this.tasksRepository.findOne({
      where: { owner, id }
    })

    if (found === null) {
      throw new Error('Task not found')
    }

    return found
  }

  async update(userId: number, id: number, task: UpdateTaskDto) {
    const owner = await this.usersRepository.findOneBy({ id: userId })

    if (task.content === '') {
      throw new Error('Empty task content')
    }

    return this.tasksRepository.update({ owner, id }, task)
  }

  async remove(userId: number, id: number): Promise<void> {
    const owner = await this.usersRepository.findOneBy({ id: userId })
    await this.tasksRepository.delete({ owner, id })
  }
}
