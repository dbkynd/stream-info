// import store from '../../store'

export default function headers(): { [key: string]: string } {
  // const keys = store.get('keys') as Keys // TODO use store
  return {
    authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    'client-id': process.env.CLIENT_ID,
  };
}
