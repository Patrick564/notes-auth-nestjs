import { User } from 'src/users/users.entity'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  content: string

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn()
  owner: User

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
