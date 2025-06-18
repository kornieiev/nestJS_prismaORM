import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    {
      id: 1,
      title: 'Learn NestJS',
      isComplited: false,
    },
    {
      id: 2,
      title: 'Learn GraphQL',
      isComplited: false,
    },
  ];
  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  create(dto: CreateTaskDto) {
    const { title, isComplited } = dto;
    const newTask = {
      id: this.tasks.length + 1,
      title,
      isComplited,
    };

    this.tasks.push(newTask);

    return dto;
  }

  update(id: number, dto: UpdateTaskDto) {
    const task = this.findById(id);
    const { title, isComplited } = dto;

    task.title = title;
    task.isComplited = isComplited;

    return task;
  }

  patchUpdate(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(id);

    Object.assign(task, dto);

    return task;
  }

  deleteById(id: number) {
    // Вариант удаления №1
    // const index = this.tasks.find((task) => task.id === id);
    // if (!index) {
    //   throw new Error('Элемент с таким Id не найден');
    // }
    // const deleted = this.tasks.splice(+index, 1)[0];
    // return deleted;

    // Вариант удаления №2
    const task = this.findById(id);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    return this.tasks;
  }
}
