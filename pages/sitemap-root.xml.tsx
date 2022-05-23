import { GetServerSidePropsContext } from 'next';

import { fetchSitemapRoot } from '@api/v1/sitemap';

function SitemapRoot() {
  return null;
}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const xml = await fetchSitemapRoot();

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();

  return {
    props: {}
  };
}

export default SitemapRoot;
