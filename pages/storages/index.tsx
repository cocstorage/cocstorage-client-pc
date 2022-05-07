import React from 'react';
import { dehydrate, QueryClient } from 'react-query';

import { Grid, Box } from 'cocstorage-ui';

import { Header, Footer } from '@components/UI/molecules';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import {
  StoragesLeftMenu,
  StoragesRightMenu,
  StoragesPopularList,
  StoragesNoticeAlert,
  StoragesCardGrid
} from '@components/pages/storages';

import { fetchStorageCategories } from '@api/v1/storage-categories';
import { fetchStorages } from '@api/v1/storages';
import queryKeys from '@constants/react-query';

function Storages() {
  return (
    <GeneralTemplate header={<Header scrollFixedTrigger />} footer={<Footer />}>
      <Grid container columnGap={20}>
        <Grid item customStyle={{ minWidth: 176, marginRight: 27 }}>
          <Box customStyle={{ position: 'fixed', width: 156 }}>
            <StoragesLeftMenu />
          </Box>
        </Grid>
        <Grid item auto>
          <StoragesNoticeAlert />
          <StoragesPopularList />
          <StoragesCardGrid />
        </Grid>
        <Grid item lgHidden customStyle={{ minWidth: 203 }}>
          <Box customStyle={{ position: 'fixed', width: 183 }}>
            <StoragesRightMenu />
          </Box>
        </Grid>
      </Grid>
    </GeneralTemplate>
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
