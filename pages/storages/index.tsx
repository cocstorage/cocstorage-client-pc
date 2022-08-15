import { QueryClient, dehydrate } from 'react-query';

import { Alert, Box, Grid, Icon } from 'cocstorage-ui';

import {
  StoragesCardGrid,
  StoragesHead,
  StoragesLeftMenu,
  StoragesPopularList
} from '@components/pages/storages';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import Header from '@components/UI/molecules/Header';
import IssueKeywordRank from '@components/UI/organisms/IssueKeywordRank';

import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';
import { fetchStorageCategories } from '@api/v1/storage-categories';
import { fetchStorages } from '@api/v1/storages';

import queryKeys from '@constants/react-query';

function Storages() {
  return (
    <>
      <StoragesHead />
      <GeneralTemplate header={<Header scrollFixedTrigger />}>
        <Grid container columnGap={20}>
          <Grid component="section" item customStyle={{ minWidth: 176, marginRight: 27 }}>
            <Box customStyle={{ position: 'fixed', width: 156 }}>
              <StoragesLeftMenu />
            </Box>
          </Grid>
          <Grid component="section" item auto>
            <Alert severity="normal" icon={<Icon name="BulbOutlined" />}>
              게시판을 만들 수 있는 기능을 준비하고 있어요! 조금만 기다려주세요.
            </Alert>
            <StoragesPopularList />
            <StoragesCardGrid />
          </Grid>
          <Grid component="section" item lgHidden customStyle={{ minWidth: 203 }}>
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

  await queryClient.prefetchQuery(
    queryKeys.storageCategories.storageCategories,
    fetchStorageCategories
  );
  await queryClient.prefetchQuery(queryKeys.storages.storages, fetchStorages);
  await queryClient.prefetchQuery(queryKeys.issueKeywords.issueKeywordRank, fetchIssueKeywordRank);

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Storages;
