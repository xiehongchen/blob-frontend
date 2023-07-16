import request from '@/utils/request'

export function getTags() {
  return request({
    url: '/home/tags',
    method: 'get',
  })
}

export function getClassify() {
  return request({
    url: '/home/classify',
    method: 'get',
  })
}

export function getBlogList() {
  return request({
    url: '/home/blogs',
    method: 'get',
  })
}
