import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { fetchIndexNotice } from '@api/v1/notices';
import {
  IndexBestWorstStorageBoardGrid,
  IndexHead,
  IndexLatestStorageBoardGrid,
  IndexNoticeAlert
} from '@components/pages/index';
import GridTemplate from '@components/templeates/GridTemplate';
import Header from '@components/UI/molecules/Header';
import { IssueKeywordRank, SidePopularStorageList } from '@components/UI/organisms';
import queryKeys from '@constants/queryKeys';

function Index() {
  return (
    <>
      <IndexHead />
      <GridTemplate
        header={<Header scrollFixedTrigger />}
        leftAside={
          <SidePopularStorageList customStyle={{ position: 'sticky', top: 89, width: 183 }} />
        }
        rightAside={<IssueKeywordRank customStyle={{ position: 'sticky', top: 89, width: 183 }} />}
      >
        <IndexNoticeAlert />
        <IndexBestWorstStorageBoardGrid />
        <IndexLatestStorageBoardGrid />
      </GridTemplate>
    </>
  );
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const isGoBack = req.cookies.isGoBack ? JSON.parse(req.cookies.isGoBack) : false;
  if (isGoBack) {
    res.setHeader('Set-Cookie', 'isGoBack=false;path=/');

    return {
      props: {}
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.notices.indexNotice, fetchIndexNotice);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Index;
