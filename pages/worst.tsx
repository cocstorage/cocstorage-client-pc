import { QueryClient, dehydrate } from '@tanstack/react-query';

import { worstParamsDefault } from '@recoil/worst/atoms';

import { Alert, Grid, Icon } from 'cocstorage-ui';

import { WorstHead, WorstStorageBoardList, WorstTitle } from '@components/pages/worst';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import Header from '@components/UI/molecules/Header';
import { IssueKeywordRank, SidePopularStorageList } from '@components/UI/organisms';

import { fetchWorstStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function Worst() {
  return (
    <>
      <WorstHead />
      <GeneralTemplate header={<Header scrollFixedTrigger />}>
        <Grid container columnGap={20}>
          <Grid component="section" item lgHidden customStyle={{ minWidth: 203 }}>
            <SidePopularStorageList customStyle={{ position: 'fixed', width: 183 }} />
          </Grid>
          <Grid component="section" item auto>
            <Alert severity="normal" icon={<Icon name="BulbOutlined" />}>
              좀 더 편하게 보실 수 있도록 준비하고 있어요. 불편하시겠지만 조금만 기다려주세요!
            </Alert>
            <WorstTitle />
            <WorstStorageBoardList />
          </Grid>
          <Grid component="section" item customStyle={{ minWidth: 203 }}>
            <IssueKeywordRank customStyle={{ position: 'fixed', width: 183 }} />
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
