import { QueryClient, dehydrate } from '@tanstack/react-query';

import { Grid } from 'cocstorage-ui';

import {
  IndexBestWorstStorageBoardGrid,
  IndexHead,
  IndexLatestStorageBoardGrid,
  IndexNoticeAlert
} from '@components/pages/index';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import Header from '@components/UI/molecules/Header';
import { IssueKeywordRank, SidePopularStorageList } from '@components/UI/organisms';

import { fetchIndexNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function Index() {
  return (
    <>
      <IndexHead />
      <GeneralTemplate header={<Header scrollFixedTrigger />}>
        <Grid container columnGap={20}>
          <Grid component="section" item lgHidden customStyle={{ minWidth: 203 }}>
            <SidePopularStorageList customStyle={{ position: 'fixed', width: 183 }} />
          </Grid>
          <Grid component="section" item auto>
            <IndexNoticeAlert />
            <IndexBestWorstStorageBoardGrid />
            <IndexLatestStorageBoardGrid />
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

  await queryClient.prefetchQuery(queryKeys.notices.indexNotice, fetchIndexNotice);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Index;
