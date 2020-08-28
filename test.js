const { KEN_ALL } = require('./built/kenall.js');

const k = new KEN_ALL('9035210724af1cfc35a1e9da0bfec2e70a99e777', {apibase: 'http://localhost:8000'});

(async () => {
  const res = await k.get('1350061');
  console.log(res);
})();
