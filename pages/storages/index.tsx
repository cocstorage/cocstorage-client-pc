import { QueryClient, dehydrate } from '@tanstack/react-query';

import { Alert, Grid, Icon } from 'cocstorage-ui';

import {
  StoragesGrid,
  StoragesHead,
  StoragesLeftMenu,
  StoragesPopularList
} from '@components/pages/storages';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import Header from '@components/UI/molecules/Header';
import IssueKeywordRank from '@components/UI/organisms/IssueKeywordRank';

import { fetchStorageCategories } from '@api/v1/storage-categories';
import { fetchStorages } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function Storages() {
  return (
    <>
      <StoragesHead />
      <GeneralTemplate header={<Header scrollFixedTrigger />}>
        <Grid container columnGap={20}>
          <Grid component="section" item customStyle={{ minWidth: 176, marginRight: 27 }}>
            <StoragesLeftMenu />
          </Grid>
          <Grid component="section" item auto>
            <Alert severity="normal" icon={<Icon name="BulbOutlined" />}>
              게시판을 만들 수 있는 기능을 준비하고 있어요! 조금만 기다려주세요.
            </Alert>
            <StoragesPopularList />
            <StoragesGrid />
          </Grid>
          <Grid component="section" item lgHidden customStyle={{ minWidth: 203 }}>
            <IssueKeywordRank customStyle={{ position: 'fixed', width: 183 }} />
          </Grid>
        </Grid>
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps() {
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
