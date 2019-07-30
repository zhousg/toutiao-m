import request from '@/utils/request'

export const getAllChannel = () => {
  return request.get('channels')
}

export const getMyChannel = () => {
  return request.get('user/channels')
}

export const addMyChannel = (item) => {
  return request.patch('user/channels', { channels: [item] })
}

export const delMyChannel = (id) => {
  return request.delete('user/channels/' + id)
}
