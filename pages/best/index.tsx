import { QueryClient, dehydrate } from 'react-query';

import { bestParamsDefault } from '@recoil/best/atoms';

import { Alert, Box, Grid, Icon } from 'cocstorage-ui';

import { BestHead, BestStorageBoardList, BestTitle } from '@components/pages/best';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Header } from '@components/UI/molecules';
import { IssueKeywordRank, SidePopularStorageList } from '@components/UI/organisms';

import { fetchPopularStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/react-query';

function Best() {
  return (
    <>
      <BestHead />
      <GeneralTemplate header={<Header scrollFixedTrigger />}>
        <Grid container columnGap={20}>
          <Grid component="section" item lgHidden customStyle={{ minWidth: 203 }}>
            <Box customStyle={{ position: 'fixed', width: 183 }}>
              <SidePopularStorageList />
            </Box>
          </Grid>
          <Grid component="section" item auto>
            <Alert severity="normal" icon={<Icon name="BulbOutlined" />}>
              좀 더 편하게 보실 수 있도록 준비하고 있어요. 불편하시겠지만 조금만 기다려주세요!
            </Alert>
            <BestTitle />
            <BestStorageBoardList />
          </Grid>
          <Grid component="section" item customStyle={{ minWidth: 203 }}>
            <Box customStyle={{ position: 'fixed', width: 183 }}>
              <IssueKeywordRank />
            </Box>
          </Grid>
        </Grid>
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    queryKeys.storageBoards.popularStorageBoardsWithParams(bestParamsDefault),
    () => fetchPopularStorageBoards(bestParamsDefault)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Best;
