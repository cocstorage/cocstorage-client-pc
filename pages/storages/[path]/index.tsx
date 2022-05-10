import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from 'react-query';

import { storageBoardParamsDefault } from '@recoil/storageBoards/atoms';

import { Flexbox } from 'cocstorage-ui';

import {
  StorageBoardsGrid,
  StorageBoardsIntro,
  StorageBoardsNoticeAlert,
  StorageBoardsPagination,
  StorageBoardsTabs
} from '@components/pages/storageBoards';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import { Footer, Header } from '@components/UI/molecules';

import { fetchStorageBoards } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

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
