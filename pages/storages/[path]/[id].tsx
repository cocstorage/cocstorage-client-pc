import { GetServerSidePropsContext } from 'next';

import { useRouter } from 'next/router';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { Flexbox, Grid, Typography } from 'cocstorage-ui';

import { StorageBoardContent, StorageBoardHead } from '@components/pages/storageBoard';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
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
  const {
    query: { path = '', id = 0 }
  } = useRouter();

  return (
    <>
      <StorageBoardHead />
      <GeneralTemplate header={<Header scrollFixedTrigger />} footer={<Footer />}>
        <Grid container columnGap={20}>
          <Grid component="section" item auto>
            <StorageBoardContent />
            <CommentList id={Number(id)} />
            <CommentForm id={Number(id)} customStyle={{ margin: '35px 0 20px 0' }} />
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
              <StorageBoardGrid path={String(path)} />
            </Flexbox>
          </Grid>
          <Grid component="section" item lgHidden customStyle={{ minWidth: 203 }}>
            <SidePopularStorageList customStyle={{ position: 'fixed', width: 183 }} />
          </Grid>
        </Grid>
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  try {
    const queryClient = new QueryClient();
    const path = String(query.path);
    const id = Number(query.id);

    const storage = await fetchStorage(path);
    const storageBoard = await fetchStorageBoard(storage.id, id);

    await queryClient.setQueryData(queryKeys.storages.storageById(path), storage);
    await queryClient.setQueryData(queryKeys.storageBoards.storageBoardById(id), storageBoard);

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

export default StorageBoard;
