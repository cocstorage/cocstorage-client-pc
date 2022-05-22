import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { QueryClient, dehydrate } from 'react-query';

import { useSetRecoilState } from 'recoil';

import { bestParamsDefault, bestParamsState } from '@recoil/best/atoms';

import { Box, Grid } from 'cocstorage-ui';

import {
  BestLeftMenu,
  BestNoticeAlert,
  BestStorageBoardList,
  BestTitle
} from '@components/pages/best';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Header } from '@components/UI/molecules';
import IssueKeywordRank from '@components/UI/organisms/IssueKeywordRank';

import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';
import { fetchPopularStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/react-query';

function Best() {
  const { events } = useRouter();

  const setParams = useSetRecoilState(bestParamsState);

  const handleRouteChangeComplete = useCallback(
    (url: string) => {
      if (url.indexOf('/storages/') < 0) {
        setParams(bestParamsDefault);
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
            <BestLeftMenu />
          </Box>
        </Grid>
        <Grid component="section" item auto>
          <BestNoticeAlert />
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
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    queryKeys.storageBoards.popularStorageBoards(bestParamsDefault),
    () => fetchPopularStorageBoards(bestParamsDefault)
  );
  await queryClient.prefetchQuery(queryKeys.issueKeywords.issueKeywordRank, fetchIssueKeywordRank);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Best;
