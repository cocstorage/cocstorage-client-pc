import { useEffect } from 'react';

import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { Flexbox, Typography } from 'cocstorage-ui';

import { StorageBoardContent, StorageBoardHead } from '@components/pages/storageBoard';
import GridTemplate from '@components/templeates/GridTemplate';
import { Footer, GoogleAdSense, Header } from '@components/UI/molecules';
import {
  CommentForm,
  CommentList,
  SidePopularStorageList,
  StorageBoardGrid
} from '@components/UI/organisms';

import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoard() {
  useEffect(() => {
    return () => {
      // 구글 애드센스 영향
      const rootElement = document.getElementById('__next');
      if (rootElement) rootElement.removeAttribute('style');
    };
  }, []);

  return (
    <>
      <StorageBoardHead />
      <GridTemplate
        header={<Header scrollFixedTrigger />}
        footer={<Footer />}
        rightAside={
          <SidePopularStorageList customStyle={{ position: 'sticky', top: 89, width: 183 }} />
        }
      >
        <StorageBoardContent />
        <CommentList />
        <CommentForm customStyle={{ margin: '35px 0 20px 0' }} />
        <GoogleAdSense
          html={
            '<ins class="adsbygoogle"\n' +
            '     style="display:block"\n' +
            '     data-ad-client="ca-pub-5809905264951057"\n' +
            '     data-ad-slot="8033291397"\n' +
            '     data-ad-format="auto"\n' +
            '     data-full-width-responsive="true"></ins>'
          }
          customStyle={{
            marginBottom: 50
          }}
        />
        <Flexbox gap={20} direction="vertical">
          <Typography variant="p1" fontWeight="bold">
            이 게시판의 다른 글
          </Typography>
          <StorageBoardGrid />
        </Flexbox>
      </GridTemplate>
    </>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  try {
    const queryClient = new QueryClient();
    const path = String(query.path);
    const id = Number(query.id);

    const storage = await queryClient.fetchQuery(queryKeys.storages.storageById(path), () =>
      fetchStorage(path)
    );
    await queryClient.fetchQuery(queryKeys.storageBoards.storageBoardById(id), () =>
      fetchStorageBoard(storage.id, id)
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
}

export default StorageBoard;
