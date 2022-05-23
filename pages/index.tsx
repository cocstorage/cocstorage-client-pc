import { QueryClient, dehydrate } from 'react-query';

import { Box, Grid } from 'cocstorage-ui';

import {
  IndexBestWorstStorageBoardGrid,
  IndexHead,
  IndexLatestStorageBoardGrid,
  IndexNoticeAlert
} from '@components/pages/index';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Header } from '@components/UI/molecules';
import { IssueKeywordRank, SidePopularStorageList } from '@components/UI/organisms';

import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';
import { fetchIndexNotice } from '@api/v1/notices';

import queryKeys from '@constants/react-query';

function Index() {
  return (
    <>
      <IndexHead />
      <GeneralTemplate header={<Header scrollFixedTrigger />}>
        <Grid container columnGap={20}>
          <Grid component="section" item lgHidden customStyle={{ minWidth: 203 }}>
            <Box customStyle={{ position: 'fixed', width: 183 }}>
              <SidePopularStorageList />
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
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.notices.indexNotice, fetchIndexNotice);
  await queryClient.prefetchQuery(queryKeys.issueKeywords.issueKeywordRank, fetchIssueKeywordRank);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Index;
