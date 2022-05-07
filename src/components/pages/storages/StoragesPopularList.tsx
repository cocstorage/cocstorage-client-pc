import React from 'react';

import { Avatar, Flexbox, Box, Typography } from 'cocstorage-ui';

function StoragesPopularList() {
  return (
    <Flexbox direction="vertical" gap={20} customStyle={{ marginTop: 20 }}>
      <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
        인기 게시판
      </Typography>
      <Flexbox gap={20} customStyle={{ overflowX: 'auto' }}>
        <Box component="button">
          <Avatar
            width={81}
            height={81}
            round
            src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
            alt="Storage Logo Img"
          />
          <Typography customStyle={{ marginTop: 6, textAlign: 'center' }}>인터넷 방송</Typography>
        </Box>
        <Box component="button">
          <Avatar
            width={81}
            height={81}
            round
            src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            alt="Storage Logo Img"
          />
          <Typography customStyle={{ marginTop: 6, textAlign: 'center' }}>스트리머</Typography>
        </Box>
      </Flexbox>
    </Flexbox>
  );
}

export default StoragesPopularList;
