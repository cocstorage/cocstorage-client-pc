import { GetServerSidePropsContext } from 'next';

import { fetchRSS } from '@api/v1/rss';

function RSS() {
  return null;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const xml = await fetchRSS();

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();

  return {
    props: {}
  };
}

export default RSS;
