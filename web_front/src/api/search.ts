import request from '@/utils/request';

export function searchBookmarks(params: any) {
  return request.get('/search', { params });
}
