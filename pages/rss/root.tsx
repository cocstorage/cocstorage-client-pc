import { GetServerSidePropsContext } from 'next';

import { fetchRSSRoot } from '@api/rss';

function RSSRoot() {
  return null;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const xml = await fetchRSSRoot();

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();

  return {
    props: {}
  };
}

export default RSSRoot;
