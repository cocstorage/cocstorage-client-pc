import { useRef, useState } from 'react';

import { useRouter } from 'next/router';

import dayjs from 'dayjs';

import { useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';

import {
  Box,
  Button,
  Flexbox,
  Icon,
  IconButton,
  Image,
  Menu,
  Typography,
  useTheme
} from 'cocstorage-ui';

import useStorage from '@hooks/query/useStorage';

function StorageBoardsIntro() {
  const { query } = useRouter();
  const {
    theme: {
      type: themeType,
      palette: {
        text,
        secondary: { yellow }
      }
    }
  } = useTheme();

  const [open, setOpen] = useState(false);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const { data: { path, name, avatarUrl, description, user, createdAt } = {} } = useStorage(
    String(query.path)
  );

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMenuOpen = () => setOpen(true);
  const handleMenuClose = () => setOpen(false);

  const handleDialogOpen = () =>
    setCommonFeedbackDialogState((prevState) => ({
      ...prevState,
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    }));

  return (
    <Flexbox component="section" justifyContent="space-between">
      <Flexbox gap={16} alignment="center">
        <Image
          width={102}
          height={102}
          round={6}
          src={avatarUrl || ''}
          alt="Storage Logo Img"
          disableAspectRatio
        />
        <div>
          <Flexbox alignment="center" gap={6}>
            <Typography variant="h2" fontWeight="bold">
              {name}
            </Typography>
            <IconButton ref={buttonRef}>
              <Icon
                name="InfoOutlined"
                width={20}
                height={20}
                onClick={handleMenuOpen}
                color={text[themeType].text1}
                customStyle={{ display: 'block' }}
              />
            </IconButton>
            <Menu anchorRef={buttonRef} centered open={open} onClose={handleMenuClose}>
              <Flexbox gap={10} direction="vertical" customStyle={{ padding: 20 }}>
                <Flexbox>
                  <Typography fontWeight="medium" customStyle={{ width: 54 }}>
                    관리자
                  </Typography>
                  <Typography color={text[themeType].text1}>{(user || {}).nickname}</Typography>
                </Flexbox>
                <Flexbox>
                  <Typography fontWeight="medium" customStyle={{ width: 54 }}>
                    개설일
                  </Typography>
                  <Typography color={text[themeType].text1}>
                    {dayjs(createdAt).format('YYYY. MM. DD')}
                  </Typography>
                </Flexbox>
                <Flexbox>
                  <Typography fontWeight="medium" customStyle={{ width: 54 }}>
                    URL
                  </Typography>
                  <Typography color={text[themeType].text1}>
                    {`https://www.cocstorage.com/storages/${path}`}
                  </Typography>
                </Flexbox>
              </Flexbox>
            </Menu>
          </Flexbox>
          <Typography color={text[themeType].text1} customStyle={{ marginTop: 2 }}>
            {description}
          </Typography>
          <Box customStyle={{ marginTop: 16 }}>
            <Flexbox alignment="center" gap={6}>
              <Typography fontWeight="medium">관리자</Typography>
              <Typography color={text[themeType].text1}>{(user || {}).nickname}</Typography>
            </Flexbox>
          </Box>
        </div>
      </Flexbox>
      <Flexbox gap={6} alignment="center">
        <Button
          size="small"
          startIcon={<Icon name="StarOutlined" width={15} height={15} color={yellow.main} />}
          iconOnly
          onClick={handleDialogOpen}
        />
        <Button
          size="small"
          startIcon={<Icon name="MoreMenuOutlined" width={15} height={15} />}
          iconOnly
          onClick={handleDialogOpen}
        />
      </Flexbox>
    </Flexbox>
  );
}

export default StorageBoardsIntro;
