import type { ITask } from './task.dto'

export interface CardDto {
  title: string
  position: number
}

export interface ICard {
  card_id: number
  user_id: number
  position: number
  title: string
  createdAt: Date
  updatedAt: Date
  tasks: ITask[]
}

export interface CardPositionDto {
  position: number
  card_id: number
}
