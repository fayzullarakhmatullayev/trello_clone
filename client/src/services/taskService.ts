import type { AxiosResponse } from 'axios'
import { $api } from '@/utils/baseHttp'
import type { ITask, TaskDto, TaskPositionDto } from './dto/task.dto'

export const postCardTask = (data: TaskDto) => {
  return $api.post<TaskDto, AxiosResponse<ITask[]>>('/task', data)
}

export const updateCardTask = (payload: { text: string; task_id: number }) => {
  return $api.put<TaskDto, AxiosResponse<ITask[]>>(`/task/${payload.task_id}`, {
    text: payload.text
  })
}

export const deleteCardTask = (task_id: number) => {
  return $api.delete(`/task/${task_id}`)
}

export const updateTaskPosition = (taskPositions: TaskPositionDto[]) => {
  return $api.post(`/task/update-position`, { taskPositions })
}
