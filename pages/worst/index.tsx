import { QueryClient, dehydrate } from 'react-query';

import { worstParamsDefault } from '@recoil/worst/atoms';

import { Alert, Box, Grid, Icon } from 'cocstorage-ui';

import { WorstHead, WorstStorageBoardList, WorstTitle } from '@components/pages/worst';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import Header from '@components/UI/molecules/Header';
import { IssueKeywordRank, SidePopularStorageList } from '@components/UI/organisms';

import { fetchWorstStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/react-query';

function Worst() {
  return (
    <>
      <WorstHead />
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
            <WorstTitle />
            <WorstStorageBoardList />
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
    queryKeys.storageBoards.worstStorageBoardsWithParams(worstParamsDefault),
    () => fetchWorstStorageBoards(worstParamsDefault)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Worst;
