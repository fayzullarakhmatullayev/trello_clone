import type { AxiosResponse } from 'axios'
import { $api } from '@/utils/baseHttp'
import type { CardDto, ICard } from './dto/card.dto'

export const getAllCards = () => {
  return $api.get<ICard[]>('/card')
}

export const postCard = (data: CardDto) => {
  return $api.post<CardDto, AxiosResponse<ICard[]>>('/card', data)
}

export const removeCard = (card_id: number) => {
  return $api.delete(`/card/${card_id}`)
}
