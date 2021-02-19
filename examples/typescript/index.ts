import { KENALL } from 'kenall';

const postalCode = '1000001';
const api = new KENALL('API_KEY');

api.getAddress(postalCode).then(
  (resp) => {
    resp.data.forEach(
      (entry) => {
        console.log(entry.prefecture);
      }
    );
  }
).catch(
  (e) => {
    console.error(e);
  }
);
