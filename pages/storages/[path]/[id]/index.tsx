import { GetServerSidePropsContext } from 'next';

import { useRouter } from 'next/router';

import { QueryClient, dehydrate } from 'react-query';

import { Box, Flexbox, Grid, Typography } from 'cocstorage-ui';

import { StorageBoardContent, StorageBoardRightMenu } from '@components/pages/storageBoard';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Footer, Header } from '@components/UI/molecules';
import {
  CommentForm,
  CommentList,
  StorageBoardGrid,
  StorageBoardGridPagination
} from '@components/UI/organisms';
import CommentListPagination from '@components/UI/organisms/CommentListPagination';

import { fetchStorageBoard } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/react-query';

function StorageBoard() {
  const {
    query: { path = '', id = 0 }
  } = useRouter();

  return (
    <GeneralTemplate header={<Header scrollFixedTrigger />} footer={<Footer />}>
      <Grid container columnGap={20}>
        <Grid item auto>
          <StorageBoardContent />
          {path && id && (
            <Flexbox direction="vertical" gap={24}>
              <CommentList type="storageBoard" path={path as string} id={id as string} />
              <Box customStyle={{ margin: 'auto' }}>
                <CommentListPagination
                  type="storageBoard"
                  path={path as string}
                  id={id as string}
                />
              </Box>
            </Flexbox>
          )}
          <Box customStyle={{ margin: '35px 0 50px 0' }}>
            <CommentForm />
          </Box>
          {path && (
            <>
              <Flexbox gap={20} direction="vertical">
                <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
                  이 게시판의 다른 글
                </Typography>
                <StorageBoardGrid path={path as string} />
              </Flexbox>
              <Flexbox justifyContent="center" customStyle={{ margin: '50px 0 30px 0' }}>
                <StorageBoardGridPagination path={path as string} />
              </Flexbox>
            </>
          )}
        </Grid>
        <Grid item lgHidden customStyle={{ minWidth: 203 }}>
          <Box customStyle={{ position: 'fixed', width: 183 }}>
            <StorageBoardRightMenu />
          </Box>
        </Grid>
      </Grid>
    </GeneralTemplate>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const path = query.path as string;
  const id = query.id as string;

  const storage = await fetchStorage(path);

  await queryClient.setQueryData(queryKeys.storages.storageById(path), storage);
  await queryClient.prefetchQuery(queryKeys.storageBoards.storageBoardById(id), () =>
    fetchStorageBoard(storage.id, id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default StorageBoard;
