import React from 'react';
import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from 'react-query';

import { storageBoardParamsDefault } from '@recoil/storageBoards/atoms';

import { Flexbox } from 'cocstorage-ui';

import { Header, Footer } from '@components/UI/molecules';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import {
  StorageBoardsIntro,
  StorageBoardsTabs,
  StorageBoardsNoticeAlert,
  StorageBoardsGrid,
  StorageBoardsPagination
} from '@components/pages/storageBoards';

import { fetchStorage } from '@api/v1/storages';
import { fetchStorageBoards } from '@api/v1/storage-boards';
import queryKeys from '@constants/react-query';

function StorageBoard() {
  return (
    <GeneralTemplate header={<Header />} footer={<Footer />}>
      <Flexbox gap={20} direction="vertical">
        <StorageBoardsIntro />
        <StorageBoardsTabs />
        <StorageBoardsNoticeAlert />
        <StorageBoardsGrid />
        <StorageBoardsPagination />
      </Flexbox>
    </GeneralTemplate>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const id = query.path as string;

  await queryClient.prefetchQuery(queryKeys.storages.storageById(id), () => fetchStorage(id));
  await queryClient.prefetchQuery(
    queryKeys.storageBoards.storageBoardsByParams(storageBoardParamsDefault),
    () => fetchStorageBoards(id, storageBoardParamsDefault)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default StorageBoard;
