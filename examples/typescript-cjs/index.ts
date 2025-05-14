import { KENALL } from '@ken-all/kenall';

const postalCode = '1000001';
const api = new KENALL(process.env.KENALL_API_KEY, { timeout: 10000 });

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
