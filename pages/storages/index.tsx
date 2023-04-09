import { GetServerSidePropsContext } from 'next';

import { Alert } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import { QueryClient, dehydrate } from '@tanstack/react-query';

import {
  StoragesGrid,
  StoragesHead,
  StoragesLeftMenu,
  StoragesPopularList
} from '@components/pages/storages';
import GridTemplate from '@components/templeates/GridTemplate';
import Header from '@components/UI/molecules/Header';
import IssueKeywordRank from '@components/UI/organisms/IssueKeywordRank';

import { fetchStorageCategories } from '@api/v1/storage-categories';
import { fetchStorages } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function Storages() {
  return (
    <>
      <StoragesHead />
      <GridTemplate
        header={<Header scrollFixedTrigger />}
        leftAside={<StoragesLeftMenu />}
        rightAside={<IssueKeywordRank customStyle={{ position: 'sticky', top: 89, width: 183 }} />}
      >
        <Alert severity="normal" icon={<Icon name="BulbOutlined" />}>
          게시판을 만들 수 있는 기능을 준비하고 있어요! 조금만 기다려주세요.
        </Alert>
        <StoragesPopularList />
        <StoragesGrid />
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
    queryKeys.storageCategories.storageCategories,
    fetchStorageCategories
  );
  await queryClient.prefetchQuery(queryKeys.storages.storages, fetchStorages);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Storages;
