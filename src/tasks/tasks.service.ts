import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLocaleLowerCase().includes(search) ||
          task.description.toLocaleLowerCase().includes(search)
        ) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(taskId: string): Task {
    const found = this.tasks.find((task) => task.id === taskId);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  deleteTask(taskId: string): Task[] {
    const tasks: Task[] = this.tasks.filter((element) => {
      return element.id !== taskId;
    });
    if (JSON.stringify(this.tasks) == JSON.stringify(tasks)) {
      console.log('No se elimino nada');
      return;
    }
    this.tasks = tasks;
    return tasks;
  }

  updateTaskStatus(taskId: string, taskStatus: TaskStatus): Task {
    const task = this.getTaskById(taskId);
    task.status = taskStatus;
    return task;
  }
}
