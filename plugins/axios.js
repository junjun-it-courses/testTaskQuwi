export default function ({$axios, store}) {

  $axios.interceptors.request.use(request => {
    if (store.getters['auth/isAuthenticated'] && !request.headers.common['Authorization']) {
      const token = store.getters['auth/token'];
      request.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return request
  });

}
