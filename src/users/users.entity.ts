import { Task } from 'src/tasks/tasks.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, unique: true })
  username: string

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @OneToMany(() => Task, (task) => task.owner, { cascade: true })
  tasks: Task[]

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
