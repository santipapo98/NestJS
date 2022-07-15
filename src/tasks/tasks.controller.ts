import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') taskId: string): Task {
    return this.tasksService.getTaskById(taskId);
  }

  // @Post()
  // createTaks(@Body() body): Task {
  //   return this.tasksService.createTask(body.title, body.description);
  // }

  @Post()
  createTaks(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') taskId: string): Task[] {
    return this.tasksService.deleteTask(taskId);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') taskId: string,
    @Body('status') taskStatus: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(taskId, taskStatus);
  }
}
