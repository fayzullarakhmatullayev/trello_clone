import type { AxiosResponse } from 'axios'
import { $api } from '@/utils/baseHttp'
import type { CardDto, CardPositionDto, ICard } from './dto/card.dto'

export const getAllCards = () => {
  return $api.get<ICard[]>('/card')
}

export const postCard = (data: CardDto) => {
  return $api.post<CardDto, AxiosResponse<ICard[]>>('/card', data)
}

export const removeCard = (card_id: number) => {
  return $api.delete(`/card/${card_id}`)
}

export const updateCard = (payload: { card_id: number; title: string }) => {
  return $api.put(`/card/${payload.card_id}`, { title: payload.title })
}

export const updateCardPosition = (cardPositions: CardPositionDto[]) => {
  console.log(cardPositions)
  return $api.post(`/card/update-position`, { cardPositions })
}
