import React from 'react';

import { Flexbox } from 'cocstorage-ui';

import { Header, Footer } from '@components/UI/molecules';
import GeneralTemplate from '@components/templeates/GeneralTemplate';

import {
  StorageBoardsIntro,
  StorageBoardsTabs,
  StorageBoardsNoticeAlert,
  StorageBoardsGrid
} from '@components/pages/storageBoards';

function StorageBoard() {
  return (
    <GeneralTemplate header={<Header />} footer={<Footer />}>
      <Flexbox gap={20} direction="vertical">
        <StorageBoardsIntro />
        <StorageBoardsTabs />
        <StorageBoardsNoticeAlert />
        <StorageBoardsGrid />
      </Flexbox>
    </GeneralTemplate>
  );
}

export default StorageBoard;
