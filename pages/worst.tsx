import { GetServerSidePropsContext } from 'next';

import { Alert } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import { fetchWorstStorageBoards } from '@api/v1/storage-boards';
import { WorstHead, WorstStorageBoardList, WorstTitle } from '@components/pages/worst';
import GridTemplate from '@components/templeates/GridTemplate';
import Header from '@components/UI/molecules/Header';
import { IssueKeywordRank, SidePopularStorageList } from '@components/UI/organisms';
import queryKeys from '@constants/queryKeys';
import { worstParamsDefault } from '@recoil/pages/worst/atoms';

function Worst() {
  return (
    <>
      <WorstHead />
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
        <WorstTitle />
        <WorstStorageBoardList />
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
