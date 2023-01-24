import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TasksModule } from './tasks/tasks.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'notes',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    TasksModule,
    UsersModule
  ]
})
export class AppModule {}
