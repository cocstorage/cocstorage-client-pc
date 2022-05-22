import { QueryClient, dehydrate } from 'react-query';

import { Box, Grid } from 'cocstorage-ui';

import {
  IndexBestWorstStorageBoardGrid,
  IndexLatestStorageBoardGrid,
  IndexLeftMenu,
  IndexNoticeAlert
} from '@components/pages/index';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Header } from '@components/UI/molecules';
import IssueKeywordRank from '@components/UI/organisms/IssueKeywordRank';

import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';
import { fetchIndexNotice } from '@api/v1/notices';
import {
  fetchIndexPopularStorageBoards,
  fetchIndexWorstStorageBoards,
  fetchLatestStorageBoards
} from '@api/v1/storage-boards';

import queryKeys from '@constants/react-query';

function Index() {
  return (
    <GeneralTemplate header={<Header scrollFixedTrigger />}>
      <Grid container columnGap={20}>
        <Grid component="section" item lgHidden customStyle={{ minWidth: 203 }}>
          <Box customStyle={{ position: 'fixed', width: 183 }}>
            <IndexLeftMenu />
          </Box>
        </Grid>
        <Grid component="section" item auto>
          <IndexNoticeAlert />
          <IndexBestWorstStorageBoardGrid />
          <IndexLatestStorageBoardGrid />
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
    queryKeys.storageBoards.indexPopularStorageBoards,
    fetchIndexPopularStorageBoards
  );
  await queryClient.prefetchQuery(
    queryKeys.storageBoards.indexWorstStorageBoards,
    fetchIndexWorstStorageBoards
  );
  await queryClient.prefetchQuery(
    queryKeys.storageBoards.latestStorageBoards,
    fetchLatestStorageBoards
  );
  await queryClient.prefetchQuery(queryKeys.issueKeywords.issueKeywordRank, fetchIssueKeywordRank);
  await queryClient.prefetchQuery(queryKeys.notices.indexNotice, fetchIndexNotice);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Index;
