import http from '../http-service'

export const fetchGenders = async () => {
  const params = {
    method: 'get',
    url: '/gender'
  }

  return await http
    .request(params)
    .then((response) => {
      return response?.data?.map((x) => ({ value: x.id, label: x.description }))
    })
    .catch(() => {
      return null
    })
}
