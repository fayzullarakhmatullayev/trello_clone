export interface TaskDto {
  card_id: number
  text: string
  position: number
}

export interface ITask {
  task_id: number
  card_id: number
  position: number
  text: string
  createdAt: Date
  updatedAt: Date
}

export interface TaskPositionDto {
  position: number
  card_id: number
  task_id: number
}
