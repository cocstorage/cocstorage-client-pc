import Link from 'next/link';

import { Avatar, Box, Flexbox, Typography } from 'cocstorage-ui';

function StoragesPopularList() {
  return (
    <Flexbox direction="vertical" gap={20} customStyle={{ marginTop: 20 }}>
      <Typography variant="p1" fontWeight="bold">
        인기 게시판
      </Typography>
      <Flexbox gap={20} customStyle={{ overflowX: 'auto' }}>
        <Link href="/storages/ibroadcast">
          <a>
            <Box component="button">
              <Avatar
                width={81}
                height={81}
                round
                src={`https://${process.env.IMAGE_DOMAIN}/images/xt868xt2w6i50bf4x98xdsbfado3`}
                alt="Storage Logo Img"
              />
              <Typography customStyle={{ marginTop: 6, textAlign: 'center' }}>
                인터넷 방송
              </Typography>
            </Box>
          </a>
        </Link>
        <Link href="/storages/streamer">
          <a>
            <Box component="button">
              <Avatar
                width={81}
                height={81}
                round
                src={`https://${process.env.IMAGE_DOMAIN}/images/zksw76puo6l255o5sabljom0gw8l`}
                alt="Storage Logo Img"
              />
              <Typography customStyle={{ marginTop: 6, textAlign: 'center' }}>스트리머</Typography>
            </Box>
          </a>
        </Link>
        <Link href="/storages/baseball">
          <a>
            <Box component="button">
              <Avatar
                width={81}
                height={81}
                round
                src={`https://${process.env.IMAGE_DOMAIN}/images/uvx4jiy4ur5hm0t0vpbqb3lw1qq9`}
                alt="Storage Logo Img"
              />
              <Typography customStyle={{ marginTop: 6, textAlign: 'center' }}>야구</Typography>
            </Box>
          </a>
        </Link>
        <Link href="/storages/hotissue">
          <a>
            <Box component="button">
              <Avatar
                width={81}
                height={81}
                round
                src={`https://${process.env.IMAGE_DOMAIN}/images/on6nrgp7utess2qf3lyj8ry921tm`}
                alt="Storage Logo Img"
              />
              <Typography customStyle={{ marginTop: 6, textAlign: 'center' }}>핫이슈</Typography>
            </Box>
          </a>
        </Link>
        <Link href="/storages/bitcoins">
          <a>
            <Box component="button">
              <Avatar
                width={81}
                height={81}
                round
                src={`https://${process.env.IMAGE_DOMAIN}/images/58l159jwcs71iwkdx0kh4reg5ra6`}
                alt="Storage Logo Img"
              />
              <Typography customStyle={{ marginTop: 6, textAlign: 'center' }}>비트코인</Typography>
            </Box>
          </a>
        </Link>
      </Flexbox>
    </Flexbox>
  );
}

export default StoragesPopularList;
