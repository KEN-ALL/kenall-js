import { KENALL } from '@ken-all/kenall';

const apiKey = process.env.KENALL_API_KEY;
if (!apiKey) {
  console.error('Please set the KENALL_API_KEY environment variable.');
  process.exit(1);
}

const api = new KENALL(apiKey, { timeout: 10000 });

async function main() {
  // Postal code → address
  const address = await api.getAddress('1000001');
  console.log('getAddress:', address.data[0].prefecture, address.data[0].city);

  // Free-text address search
  const foundAddresses = await api.searchAddresses({
    q: '東京都 千代田区 麹町',
    limit: 2,
  });
  console.log('searchAddresses:', foundAddresses.count, 'hit(s)');

  // Prefecture code (JIS X 0401) → cities
  const cities = await api.getCities('13');
  console.log('getCities:', cities.data.map((city) => city.city));

  // Corporate number (法人番号)
  const corporation = await api.getNTACorporateInfo('2021001052596');
  console.log('getNTACorporateInfo:', corporation.data.name);

  // Corporate number search
  const foundCorporations = await api.searchNTACorporateInfo({
    query: 'ケンオール',
    limit: 2,
  });
  console.log('searchNTACorporateInfo:', foundCorporations.count, 'hit(s)');

  // Qualified invoice issuer (適格請求書発行事業者)
  const issuer = await api.getNTAQualifiedInvoiceIssuerInfo('T2021001052596');
  console.log('getNTAQualifiedInvoiceIssuerInfo:', issuer.data.name);

  // Banks and branches
  const banks = await api.getBanks();
  console.log('getBanks:', banks.data.length, 'bank(s)');

  const bank = await api.getBank('0001');
  console.log('getBank:', bank.data.name);

  const branches = await api.getBankBranches('0001');
  console.log('getBankBranches:', Object.keys(branches.data.branches).length, 'branch(es)');

  const branch = await api.getBankBranch('0001', '001');
  console.log('getBankBranch:', branch.data.branch.name);

  // The IP address the request originates from, as seen by the API
  const me = await api.whoami();
  console.log('whoami:', me.remote_addr.address);

  // Japanese public holidays and business-day check
  const holidays = await api.getHolidays({ year: 2026 });
  console.log('getHolidays:', holidays.data.length, 'holiday(s)');

  const businessDay = await api.checkBusinessDay('2026-01-01');
  console.log('checkBusinessDay:', businessDay.result);

  // School code (学校コード)
  const school = await api.getSchool('F113110102700');
  console.log('getSchool:', school.data.name);

  const foundSchools = await api.searchSchool({ q: 'name:東京大学', limit: 2 });
  console.log('searchSchool:', foundSchools.count, 'hit(s)');
}

main().catch((e) => console.error(e));
