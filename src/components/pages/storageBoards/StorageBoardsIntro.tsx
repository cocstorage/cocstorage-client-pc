import React, { useState, useRef } from 'react';

import {
  useTheme,
  Avatar,
  Flexbox,
  Icon,
  IconButton,
  Typography,
  Box,
  Button,
  Menu
} from 'cocstorage-ui';

function StorageBoardsIntro() {
  const {
    theme: { type, palette }
  } = useTheme();

  const [open, setOpen] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Flexbox justifyContent="space-between">
      <Flexbox gap={16} alignment="center">
        <Avatar
          round
          width={102}
          height={102}
          src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
          alt="Storage Logo Img"
        />
        <div>
          <Flexbox alignment="center" gap={6}>
            <Typography fontSize="20px" fontWeight={700} lineHeight="25px">
              인터넷 방송
            </Typography>
            <IconButton ref={buttonRef}>
              <Icon
                name="InfoOutlined"
                width={20}
                height={20}
                onClick={() => setOpen(true)}
                color={palette.text[type].text1}
              />
            </IconButton>
            <Menu anchorRef={buttonRef} centered open={open} onClose={() => setOpen(false)}>
              <Flexbox gap={10} direction="vertical" customStyle={{ padding: 20 }}>
                <Flexbox>
                  <Typography fontWeight={500} lineHeight="18px" customStyle={{ width: 54 }}>
                    관리자
                  </Typography>
                  <Typography lineHeight="18px" color={palette.text[type].text1}>
                    HYEOK
                  </Typography>
                </Flexbox>
                <Flexbox>
                  <Typography fontWeight={500} lineHeight="18px" customStyle={{ width: 54 }}>
                    개설일
                  </Typography>
                  <Typography lineHeight="18px" color={palette.text[type].text1}>
                    2022. 05. 07
                  </Typography>
                </Flexbox>
                <Flexbox>
                  <Typography fontWeight={500} lineHeight="18px" customStyle={{ width: 54 }}>
                    URL
                  </Typography>
                  <Typography lineHeight="18px" color={palette.text[type].text1}>
                    https://www.cocstorage.com/storages/ibroadcast
                  </Typography>
                </Flexbox>
              </Flexbox>
            </Menu>
          </Flexbox>
          <Typography
            lineHeight="18px"
            color={palette.text[type].text1}
            customStyle={{ marginTop: 2 }}
          >
            인터넷 방송 저장소입니다.
          </Typography>
          <Box customStyle={{ marginTop: 16 }}>
            <Flexbox alignment="center" gap={6}>
              <Typography fontWeight={500} lineHeight="18px">
                관리자
              </Typography>
              <Typography lineHeight="18px" color={palette.text[type].text1}>
                HYEOK
              </Typography>
            </Flexbox>
          </Box>
        </div>
      </Flexbox>
      <Flexbox gap={6} alignment="center">
        <Button
          color="accent"
          size="small"
          startIcon={<Icon name="WriteOutlined" width={15} height={15} />}
        >
          게시글 작성
        </Button>
        <Button
          size="small"
          startIcon={
            <Icon
              name="StarOutlined"
              width={15}
              height={15}
              color={palette.secondary.yellow.main}
            />
          }
          iconOnly
        />
        <Button
          size="small"
          startIcon={<Icon name="MoreMenuOutlined" width={15} height={15} />}
          iconOnly
        />
      </Flexbox>
    </Flexbox>
  );
}

export default StorageBoardsIntro;
