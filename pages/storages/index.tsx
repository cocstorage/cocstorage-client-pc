import React from 'react';

import { Grid, Box } from 'cocstorage-ui';

import { Header } from '@components/UI/molecules';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import {
  StoragesLeftMenu,
  StoragesRightMenu,
  StoragesPopularList,
  StoragesNoticeAlert,
  StoragesCardGrid
} from '@components/pages/storages';

function Storages() {
  return (
    <GeneralTemplate header={<Header />}>
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

export default Storages;
