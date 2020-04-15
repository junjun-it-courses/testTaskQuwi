export default async function ({store, redirect}) {
  const isLoggedIn = await store.dispatch('auth/autoLogin');
  if(!isLoggedIn) {
    redirect('/login');
  }
};
