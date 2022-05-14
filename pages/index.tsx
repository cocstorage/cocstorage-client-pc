import { QueryClient, dehydrate } from 'react-query';

import { Box, Grid } from 'cocstorage-ui';

import {
  IndexBestWorstStorageBoardGrid,
  IndexLatestStorageBoardGrid,
  IndexLeftMenu,
  IndexNoticeAlert,
  IndexRightMenu
} from '@components/pages/index';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Header } from '@components/UI/molecules';

import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';
import { fetchNotices } from '@api/v1/notices';
import { fetchLatestStorageBoards, fetchPopularStorageBoards } from '@api/v1/storage-boards';

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
            <IndexRightMenu />
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
