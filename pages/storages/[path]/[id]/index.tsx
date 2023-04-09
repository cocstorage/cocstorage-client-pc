import { GetServerSidePropsContext } from 'next';

import { Flexbox, Typography } from '@cocstorage/ui';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import {
  StorageBoardContent,
  StorageBoardDeleteDialog,
  StorageBoardHead
} from '@components/pages/storageBoard';
import GridTemplate from '@components/templeates/GridTemplate';
import { Footer, Header } from '@components/UI/molecules';
import {
  BestStorageBoardList,
  CommentForm,
  CommentList,
  IssueKeywordRank,
  LastVisitStorageHistory,
  StorageBoardList
} from '@components/UI/organisms';

import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoard() {
  return (
    <>
      <StorageBoardHead />
      <GridTemplate
        header={<Header scrollFixedTrigger />}
        footer={<Footer />}
        leftAside={
          <LastVisitStorageHistory
            customStyle={{
              position: 'sticky',
              width: 140,
              top: 99
            }}
          />
        }
        rightAside={
          <Flexbox
            direction="vertical"
            gap={25}
            customStyle={{ position: 'sticky', width: 280, top: 99 }}
          >
            <BestStorageBoardList />
            <IssueKeywordRank compact={false} />
          </Flexbox>
        }
      >
        <StorageBoardContent />
        <CommentList />
        <CommentForm customStyle={{ margin: '35px 0 20px 0' }} />
        <Flexbox
          gap={20}
          direction="vertical"
          customStyle={{
            marginTop: 50
          }}
        >
          <Typography variant="p1" fontWeight="bold">
            이 게시판의 다른 글
          </Typography>
          <StorageBoardList ssr={false} />
        </Flexbox>
      </GridTemplate>
      <StorageBoardDeleteDialog />
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
