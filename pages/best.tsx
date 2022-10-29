import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { bestParamsDefault } from '@recoil/pages/best/atoms';

import { Alert, Icon } from 'cocstorage-ui';

import { BestHead, BestStorageBoardList, BestTitle } from '@components/pages/best';
import GridTemplate from '@components/templeates/GridTemplate';
import { Header } from '@components/UI/molecules';
import { IssueKeywordRank, SidePopularStorageList } from '@components/UI/organisms';

import { fetchPopularStorageBoards } from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function Best() {
  return (
    <>
      <BestHead />
      <GridTemplate
        header={<Header scrollFixedTrigger />}
        leftAside={
          <SidePopularStorageList customStyle={{ position: 'sticky', top: 89, width: 183 }} />
        }
        rightAside={<IssueKeywordRank customStyle={{ position: 'sticky', top: 89, width: 183 }} />}
      >
        <Alert severity="normal" icon={<Icon name="BulbOutlined" />}>
          좀 더 편하게 보실 수 있도록 준비하고 있어요. 불편하시겠지만 조금만 기다려주세요!
        </Alert>
        <BestTitle />
        <BestStorageBoardList />
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

  await queryClient.prefetchQuery(
    queryKeys.storageBoards.popularStorageBoardsWithParams(bestParamsDefault),
    () => fetchPopularStorageBoards(bestParamsDefault)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Best;
