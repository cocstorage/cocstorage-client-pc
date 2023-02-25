import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { storageBoardsParamsDefault } from '@recoil/pages/storageBoards/atoms';

import { Flexbox } from 'cocstorage-ui';

import {
  StorageBoardsBestList,
  StorageBoardsHead,
  StorageBoardsIntro,
  StorageBoardsIssueKeywordRank,
  StorageBoardsLastVisitHistory,
  StorageBoardsNotice,
  StorageBoardsTabs
} from '@components/pages/storageBoards';
import GridTemplate from '@components/templeates/GridTemplate';
import { Footer, Header } from '@components/UI/molecules';
import StorageBoardList from '@components/UI/organisms/StorageBoardList';

import { fetchStorageBoards } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoards() {
  return (
    <>
      <StorageBoardsHead />
      <GridTemplate
        header={<Header scrollFixedTrigger={false} />}
        leftAside={<StorageBoardsLastVisitHistory />}
        rightAside={
          <Flexbox
            direction="vertical"
            gap={25}
            customStyle={{ position: 'sticky', width: 280, top: 69 }}
          >
            <StorageBoardsBestList />
            <StorageBoardsIssueKeywordRank />
          </Flexbox>
        }
        footer={<Footer />}
      >
        <StorageBoardsIntro />
        <StorageBoardsTabs />
        <StorageBoardsNotice />
        <StorageBoardList />
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
