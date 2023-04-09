import Head from 'next/head';
import { useRouter } from 'next/router';

import { useTheme } from '@cocstorage/ui';

import useStorage from '@hooks/query/useStorage';

function IndexHead() {
  const router = useRouter();
  const { path, id } = router.query;

  const {
    theme: {
      palette: { background }
    }
  } = useTheme();

  const { data: { name, avatarUrl, description, user } = {} } = useStorage(String(path));

  return (
    <Head>
      <meta name="author" content={(user || {}).nickname} />
      <meta name="title" content={`${name} : 글수정 : 개념글 저장소`} />
      <meta name="description" content={description} />
      <meta property="og:title" content={`${name} : 글수정 : 개념글 저장소`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {avatarUrl && <meta property="og:image" content={avatarUrl} />}
      <meta property="og:url" content={`https://www.cocstorage.com/storages/${path}/${id}/edit`} />
      <meta property="og:site_name" content="개념글 저장소" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="twitter:title" content={`${name} : 글수정 : 개념글 저장소`} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:creator" content={(user || {}).nickname} />
      {avatarUrl && <meta property="twitter:image" content={avatarUrl} />}
      <meta
        property="twitter:url"
        content={`https://www.cocstorage.com/storages/${path}/${id}/edit`}
      />
      <meta property="twitter:card" content="summary" />
      <meta name="apple-mobile-web-app-title" content={`${name} : 글수정 : 개념글 저장소`} />
      <meta name="theme-color" content={background.bg} />
      <meta name="msapplication-TileColor" content={background.bg} />
      <title>{`${name} : 글수정 : 개념글 저장소`}</title>
      <link rel="canonical" href={`https://www.cocstorage.com/storages/${path}/${id}/edit`} />
      <link
        rel="alternate"
        media="only screen and (max-width: 640px)"
        href={`https://m.cocstorage.com/storages/${path}/${id}/edit`}
      />
    </Head>
  );
}

export default IndexHead;
