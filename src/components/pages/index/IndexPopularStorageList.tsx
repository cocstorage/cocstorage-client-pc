import React from 'react';

import { Box, Flexbox } from 'cocstorage-ui';

import { SideAccordion, StorageCard } from '@components/UI/molecules';

function IndexPopularStorageList() {
  return (
    <Flexbox direction="vertical" gap={30} customStyle={{ minWidth: 183, whiteSpace: 'nowrap' }}>
      <Box customStyle={{ position: 'fixed' }}>
        <SideAccordion title="인기 게시판">
          <StorageCard
            src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
            name="인터넷 방송"
          />
          <StorageCard
            src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            name="스트리머"
          />
        </SideAccordion>
      </Box>
    </Flexbox>
  );
}

export default IndexPopularStorageList;
