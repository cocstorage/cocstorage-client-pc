import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { QueryClient, dehydrate } from 'react-query';

import { useSetRecoilState } from 'recoil';

import { worstParamsDefault, worstParamsState } from '@recoil/worst/atoms';

import { Alert, Box, Grid, Icon } from 'cocstorage-ui';

import { WorstStorageBoardList, WorstTitle } from '@components/pages/worst';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Header } from '@components/UI/molecules';
import { IssueKeywordRank, SidePopularStorageList } from '@components/UI/organisms';

import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';
import { fetchWorstStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/react-query';

function Worst() {
  const { events } = useRouter();

  const setParams = useSetRecoilState(worstParamsState);

  const handleRouteChangeComplete = useCallback(
    (url: string) => {
      if (url.indexOf('/storages/') < 0) {
        setParams(worstParamsDefault);
      }
    },
    [setParams]
  );

  useEffect(() => {
    events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [events, handleRouteChangeComplete]);

  return (
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
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    queryKeys.storageBoards.worstStorageBoardsWithParams(worstParamsDefault),
    () => fetchWorstStorageBoards(worstParamsDefault)
  );
  await queryClient.prefetchQuery(queryKeys.issueKeywords.issueKeywordRank, fetchIssueKeywordRank);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Worst;
