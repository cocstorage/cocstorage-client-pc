import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import dayjs from 'dayjs';

import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  commonFeedbackDialogState,
  commonOnBoardingDefault,
  commonOnBoardingState
} from '@recoil/common/atoms';
import {
  storageBoardsPostDraftIdState,
  storageBoardsPostEditorContentsState,
  storageBoardsPostSubjectState
} from '@recoil/pages/storageBoardsPost/atoms';

import {
  Avatar,
  Box,
  Button,
  Flexbox,
  Icon,
  IconButton,
  Menu,
  Spotlight,
  Tooltip,
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
  const [openSpotlight, setOpenSpotlight] = useState(false);

  const [
    { theme: { done: themeDone = false } = {}, post: { done = false } = {} },
    setCommonOnBoardingState
  ] = useRecoilState(commonOnBoardingState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);
  const resetDraftIdState = useResetRecoilState(storageBoardsPostDraftIdState);
  const resetSubjectState = useResetRecoilState(storageBoardsPostSubjectState);
  const resetEditorContentsState = useResetRecoilState(storageBoardsPostEditorContentsState);

  const { data: { path, name, avatarUrl, description, user, createdAt } = {} } = useStorage(
    String(query.path)
  );

  const buttonRef = useRef<HTMLButtonElement>(null);
  const postButtonRef = useRef<HTMLButtonElement>(null);
  const spotlightOpenTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleMenuOpen = () => setOpen(true);
  const handleMenuClose = () => setOpen(false);

  const handleClick = () => {
    if (openSpotlight) handleClose();

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

  const handleClose = () => {
    setOpenSpotlight(false);
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      post: {
        ...commonOnBoardingDefault.post,
        step: 1,
        done: commonOnBoardingDefault.post.lastStep === 1
      }
    }));
  };

  useEffect(() => {
    // TODO Spotlight 컴포넌트 동시성 개선 필요
    if (themeDone && !done) {
      spotlightOpenTimerRef.current = setTimeout(() => {
        setOpenSpotlight(true);
      }, 350);
    }
  }, [themeDone, done]);

  useEffect(() => {
    return () => {
      if (spotlightOpenTimerRef.current) {
        clearTimeout(spotlightOpenTimerRef.current);
      }
    };
  }, []);

  return (
    <>
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
            ref={postButtonRef}
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
      <Spotlight open={openSpotlight} targetRef={postButtonRef} round={8} onClose={handleClose}>
        <Tooltip open onClose={handleClose} content="로그인하지 않아도 게시글을 등록할 수 있어요!">
          <Button
            variant="accent"
            size="small"
            startIcon={<Icon name="WriteOutlined" width={15} height={15} />}
            onClick={handleClick}
          >
            글쓰기
          </Button>
        </Tooltip>
      </Spotlight>
    </>
  );
}

export default StorageBoardsIntro;
