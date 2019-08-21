import request from '@/utils/request'

export const getAllChannel = () => {
  return request.get('channels')
}

export const getMyChannel = () => {
  return request.get('user/channels')
}

export const addMyChannel = (items) => {
  return request.put('user/channels', { channels: items })
}

export const delMyChannel = (id) => {
  return request.delete('user/channels/' + id)
}
