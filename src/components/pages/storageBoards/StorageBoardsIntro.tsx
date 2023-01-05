import { useRef, useState } from 'react';

import { useRouter } from 'next/router';

import dayjs from 'dayjs';

import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';
import {
  storageBoardPostDraftIdState,
  storageBoardPostEditorContentsState,
  storageBoardPostSubjectState
} from '@recoil/pages/storageBoardPost/atoms';

import {
  Avatar,
  Box,
  Button,
  Flexbox,
  Icon,
  IconButton,
  Menu,
  Typography,
  useTheme
} from 'cocstorage-ui';

import useStorage from '@hooks/query/useStorage';

function StorageBoardsIntro() {
  const router = useRouter();
  const { query } = router;
  const {
    theme: {
      mode,
      palette: {
        text,
        secondary: { yellow }
      }
    }
  } = useTheme();

  const [open, setOpen] = useState(false);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);
  const resetDraftIdState = useResetRecoilState(storageBoardPostDraftIdState);
  const resetSubjectState = useResetRecoilState(storageBoardPostSubjectState);
  const resetEditorContentsState = useResetRecoilState(storageBoardPostEditorContentsState);

  const { data: { path, name, avatarUrl, description, user, createdAt } = {} } = useStorage(
    String(query.path)
  );

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMenuOpen = () => setOpen(true);
  const handleMenuClose = () => setOpen(false);

  const handleClick = () => {
    resetDraftIdState();
    resetSubjectState();
    resetEditorContentsState();
    router.push(`/storages/${path}/post`);
  };

  const handleDialogOpen = () =>
    setCommonFeedbackDialogState({
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    });

  return (
    <Flexbox component="section" justifyContent="space-between">
      <Flexbox gap={16} alignment="center">
        <Avatar width={102} height={102} round={6} src={avatarUrl || ''} alt="Storage Logo Img" />
        <div>
          <Flexbox alignment="center" gap={6}>
            <Typography component="h1" variant="h2" fontWeight="bold">
              {name}
            </Typography>
            <IconButton ref={buttonRef}>
              <Icon
                name="InfoOutlined"
                width={20}
                height={20}
                onClick={handleMenuOpen}
                color={text[mode].text1}
                customStyle={{ display: 'block' }}
              />
            </IconButton>
            <Menu anchorRef={buttonRef} centered open={open} onClose={handleMenuClose}>
              <Flexbox gap={10} direction="vertical" customStyle={{ padding: 20 }}>
                <Flexbox>
                  <Typography fontWeight="medium" customStyle={{ width: 54 }}>
                    관리자
                  </Typography>
                  <Typography color={text[mode].text1}>{(user || {}).nickname}</Typography>
                </Flexbox>
                <Flexbox>
                  <Typography fontWeight="medium" customStyle={{ width: 54 }}>
                    개설일
                  </Typography>
                  <Typography color={text[mode].text1}>
                    {dayjs(createdAt).format('YYYY. MM. DD')}
                  </Typography>
                </Flexbox>
                <Flexbox>
                  <Typography fontWeight="medium" customStyle={{ width: 54 }}>
                    URL
                  </Typography>
                  <Typography color={text[mode].text1}>
                    {`https://www.cocstorage.com/storages/${path}`}
                  </Typography>
                </Flexbox>
              </Flexbox>
            </Menu>
          </Flexbox>
          <Typography component="h2" color={text[mode].text1} customStyle={{ marginTop: 2 }}>
            {description}
          </Typography>
          <Box customStyle={{ marginTop: 16 }}>
            <Flexbox alignment="center" gap={6}>
              <Typography fontWeight="medium">관리자</Typography>
              <Typography color={text[mode].text1}>{(user || {}).nickname}</Typography>
            </Flexbox>
          </Box>
        </div>
      </Flexbox>
      <Flexbox gap={6} alignment="center">
        <Button
          variant="accent"
          size="small"
          startIcon={<Icon name="WriteOutlined" width={15} height={15} />}
          onClick={handleClick}
        >
          글쓰기
        </Button>
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
