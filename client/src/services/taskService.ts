import type { AxiosResponse } from 'axios'
import { $api } from '@/utils/baseHttp'
import type { ITask, TaskDto } from './dto/task.dto'

export const postCardTask = (data: TaskDto) => {
  return $api.post<TaskDto, AxiosResponse<ITask[]>>('/task', data)
}
