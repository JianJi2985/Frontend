import request from '@/utils/request';
// import * as Console from "console";

export async function queryRule(params) {
  // console.log("query rule is")
  // console.log(params)

  return request('/api/rule/', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule/', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule/', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule/', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
