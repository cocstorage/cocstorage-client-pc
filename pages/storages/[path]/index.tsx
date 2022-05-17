import { useCallback, useEffect } from 'react';

import { GetServerSidePropsContext } from 'next';

import { useRouter } from 'next/router';

import { QueryClient, dehydrate } from 'react-query';

import { useSetRecoilState } from 'recoil';

import { storageBoardsParamsDefault, storageBoardsParamsState } from '@recoil/storageBoards/atoms';

import { Box, Flexbox } from 'cocstorage-ui';

import {
  StorageBoardsIntro,
  StorageBoardsNoticeAlert,
  StorageBoardsTabs
} from '@components/pages/storageBoards';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Footer, Header } from '@components/UI/molecules';
import { StorageBoardGrid, StorageBoardGridPagination } from '@components/UI/organisms';

import { fetchStorageBoards } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/react-query';

function StorageBoards() {
  const {
    query: { path = '' },
    events
  } = useRouter();

  const setParams = useSetRecoilState(storageBoardsParamsState);

  const handleRouteChangeComplete = useCallback(
    (url: string) => {
      if (url.indexOf('/storages/') < 0) {
        setParams(storageBoardsParamsDefault);
      }
    },
    [setParams]
  );

  useEffect(() => {
    events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [events, handleRouteChangeComplete]);

  return (
    <GeneralTemplate header={<Header />} footer={<Footer />}>
      <Flexbox gap={20} direction="vertical">
        <StorageBoardsIntro />
        <StorageBoardsTabs />
        <StorageBoardsNoticeAlert />
        {path && (
          <>
            <StorageBoardGrid path={String(path)} />
            <Box
              customStyle={{
                margin: '50px auto'
              }}
            >
              <StorageBoardGridPagination path={String(path)} />
            </Box>
          </>
        )}
      </Flexbox>
    </GeneralTemplate>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const path = String(query.path);

  await queryClient.prefetchQuery(queryKeys.storages.storageById(path), () => fetchStorage(path));
  await queryClient.prefetchQuery(queryKeys.storageBoards.storageBoardsByIdWithPage(path, 1), () =>
    fetchStorageBoards(path, storageBoardsParamsDefault)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default StorageBoards;
