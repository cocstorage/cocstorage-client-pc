import React from 'react';
import { QueryClient, dehydrate } from 'react-query';

import { Box, Grid } from 'cocstorage-ui';

import { Header } from '@components/UI/molecules';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import {
  IndexLeftMenu,
  IndexBestWorstStorageBoardGrid,
  IndexNoticeAlert,
  IndexIssueKeywordRankInfo,
  IndexLatestStorageBoardGrid
} from '@components/pages/index';

import { fetchPopularStorageBoards, fetchLatestStorageBoards } from '@api/v1/storage-boards';
import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';
import { fetchNotices } from '@api/v1/notices';

import queryKeys from '@constants/react-query';

function Index() {
  return (
    <GeneralTemplate header={<Header scrollFixedTrigger />}>
      <Grid container columnGap={20}>
        <Grid item lgHidden customStyle={{ minWidth: 203 }}>
          <Box customStyle={{ position: 'fixed', width: 183 }}>
            <IndexLeftMenu />
          </Box>
        </Grid>
        <Grid item auto>
          <IndexNoticeAlert />
          <IndexBestWorstStorageBoardGrid />
          <IndexLatestStorageBoardGrid />
        </Grid>
        <Grid item customStyle={{ minWidth: 203 }}>
          <Box customStyle={{ position: 'fixed', width: 183 }}>
            <IndexIssueKeywordRankInfo />
          </Box>
        </Grid>
      </Grid>
    </GeneralTemplate>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    queryKeys.storageBoards.popularStorageBoards,
    fetchPopularStorageBoards
  );
  await queryClient.prefetchQuery(
    queryKeys.storageBoards.latestStorageBoards,
    fetchLatestStorageBoards
  );
  await queryClient.prefetchQuery(queryKeys.issueKeywords.issueKeywordRank, fetchIssueKeywordRank);
  await queryClient.prefetchQuery(queryKeys.notices.notices, fetchNotices);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Index;
