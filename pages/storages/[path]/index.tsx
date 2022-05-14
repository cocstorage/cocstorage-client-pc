import { GetServerSidePropsContext } from 'next';

import { useRouter } from 'next/router';

import { QueryClient, dehydrate } from 'react-query';

import { storageBoardsParamsDefault } from '@recoil/boards/atoms';

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
    query: { path = '' }
  } = useRouter();

  return (
    <GeneralTemplate header={<Header />} footer={<Footer />}>
      <Flexbox gap={20} direction="vertical">
        <StorageBoardsIntro />
        <StorageBoardsTabs />
        <StorageBoardsNoticeAlert />
        <StorageBoardGrid path={path as string} />
        <Box
          customStyle={{
            margin: '50px auto'
          }}
        >
          <StorageBoardGridPagination path={path as string} />
        </Box>
      </Flexbox>
    </GeneralTemplate>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const id = query.path as string;

  await queryClient.prefetchQuery(queryKeys.storages.storageById(id), () => fetchStorage(id));
  await queryClient.prefetchQuery(
    queryKeys.storageBoards.storageBoardsByParams(storageBoardsParamsDefault),
    () => fetchStorageBoards(id, storageBoardsParamsDefault)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default StorageBoards;
