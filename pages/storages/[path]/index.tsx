import { GetServerSidePropsContext } from 'next';

import { Flexbox } from '@cocstorage/ui';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import { storageBoardsParamsDefault } from '@recoil/pages/storageBoards/atoms';

import {
  StorageBoardsHead,
  StorageBoardsIntro,
  StorageBoardsNotice,
  StorageBoardsTabs
} from '@components/pages/storageBoards';
import GridTemplate from '@components/templeates/GridTemplate';
import { Footer, Header } from '@components/UI/molecules';
import {
  BestStorageBoardList,
  IssueKeywordRank,
  LastVisitStorageHistory,
  StorageBoardList
} from '@components/UI/organisms';

import { fetchStorageBoards } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoards() {
  return (
    <>
      <StorageBoardsHead />
      <GridTemplate
        header={<Header scrollFixedTrigger={false} />}
        leftAside={
          <LastVisitStorageHistory
            customStyle={{
              position: 'sticky',
              width: 140,
              top: 72
            }}
          />
        }
        rightAside={
          <Flexbox
            direction="vertical"
            gap={25}
            customStyle={{ position: 'sticky', width: 280, top: 72 }}
          >
            <BestStorageBoardList />
            <IssueKeywordRank compact={false} />
          </Flexbox>
        }
        footer={<Footer />}
      >
        <StorageBoardsIntro />
        <StorageBoardsTabs />
        <StorageBoardsNotice />
        <StorageBoardList ssr={false} />
      </GridTemplate>
    </>
  );
}

export async function getServerSideProps({ req, res, query }: GetServerSidePropsContext) {
  const isGoBack = req.cookies.isGoBack ? JSON.parse(req.cookies.isGoBack) : false;
  if (isGoBack) {
    res.setHeader('Set-Cookie', 'isGoBack=false;path=/');

    return {
      props: {}
    };
  }

  try {
    const queryClient = new QueryClient();
    const path = String(query.path);

    await queryClient.fetchQuery(queryKeys.storages.storageById(path), () => fetchStorage(path));
    await queryClient.fetchQuery(
      queryKeys.storageBoards.storageBoardsByIdWithParams(path, storageBoardsParamsDefault),
      () => fetchStorageBoards(path, storageBoardsParamsDefault)
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

export default StorageBoards;
