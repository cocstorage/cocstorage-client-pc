import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import { useQuery } from 'react-query';

import {
  useTheme,
  Flexbox,
  Icon,
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
  Hidden
} from 'cocstorage-ui';

import { RatioImage } from '@components/UI/atoms';

import { fetchStorage } from '@api/v1/storages';
import queryKeys from '@constants/react-query';

function StorageBoardsIntro() {
  const { query } = useRouter();
  const {
    theme: { type, palette }
  } = useTheme();

  const { data: { path, name, avatarUrl, description, user, createdAt } = {} } = useQuery(
    queryKeys.storages.storageById(query.path as string),
    () => fetchStorage(query.path as string)
  );

  const [open, setOpen] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleMenuOpen = () => setOpen(true);
  const handleMenuClose = () => setOpen(false);

  return (
    <Flexbox justifyContent="space-between">
      <Flexbox gap={16} alignment="center">
        <RatioImage
          width={102}
          height={102}
          round={6}
          src={avatarUrl || ''}
          alt="Storage Logo Img"
        />
        <div>
          <Flexbox alignment="center" gap={6}>
            <Typography fontSize="20px" fontWeight={700} lineHeight="25px">
              {name}
            </Typography>
            <IconButton ref={buttonRef}>
              <Icon
                name="InfoOutlined"
                width={20}
                height={20}
                onClick={handleMenuOpen}
                color={palette.text[type].text1}
                customStyle={{ display: 'block' }}
              />
            </IconButton>
            <Menu anchorRef={buttonRef} centered open={open} onClose={handleMenuClose}>
              <Flexbox gap={10} direction="vertical" customStyle={{ padding: 20 }}>
                <Flexbox>
                  <Typography fontWeight={500} lineHeight="18px" customStyle={{ width: 54 }}>
                    관리자
                  </Typography>
                  <Typography lineHeight="18px" color={palette.text[type].text1}>
                    {(user || {}).nickname}
                  </Typography>
                </Flexbox>
                <Flexbox>
                  <Typography fontWeight={500} lineHeight="18px" customStyle={{ width: 54 }}>
                    개설일
                  </Typography>
                  <Typography lineHeight="18px" color={palette.text[type].text1}>
                    {dayjs(createdAt).format('YYYY. MM. DD')}
                  </Typography>
                </Flexbox>
                <Flexbox>
                  <Typography fontWeight={500} lineHeight="18px" customStyle={{ width: 54 }}>
                    URL
                  </Typography>
                  <Typography lineHeight="18px" color={palette.text[type].text1}>
                    {`https://www.cocstorage.com/storages/${path}`}
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
            {description}
          </Typography>
          <Box customStyle={{ marginTop: 16 }}>
            <Flexbox alignment="center" gap={6}>
              <Typography fontWeight={500} lineHeight="18px">
                관리자
              </Typography>
              <Typography lineHeight="18px" color={palette.text[type].text1}>
                {(user || {}).nickname}
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
          <Hidden lgHidden>게시글 작성</Hidden>
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
