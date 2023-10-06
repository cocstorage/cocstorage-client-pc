import { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Avatar,
  Button,
  Flexbox,
  IconButton,
  Menu,
  Skeleton,
  Spotlight,
  Tooltip,
  Typography,
  useTheme
} from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import dayjs from 'dayjs';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import useStorage from '@hooks/query/useStorage';
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

function StorageBoardsIntro() {
  const router = useRouter();
  const { query } = router;

  const {
    theme: {
      mode,
      palette: { text }
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

  const { data: { path, name, avatarUrl, description, user, createdAt } = {}, isLoading } =
    useStorage(String(query.path));

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
        <Flexbox gap={12} alignment="center">
          <Avatar
            width={40}
            height={40}
            round={8}
            src={avatarUrl || ''}
            alt="Storage Logo Img"
            fallback={{
              name: 'ImageOutlined',
              width: 32,
              height: 32
            }}
          />
          <div>
            <Flexbox alignment="center" gap={6}>
              {isLoading && <Skeleton width={90} height={18.5} round={6} disableAspectRatio />}
              {!isLoading && (
                <Typography component="h1" variant="h4" fontWeight="bold">
                  {name}
                </Typography>
              )}
              <IconButton ref={buttonRef} onClick={handleMenuOpen}>
                <Icon name="InfoOutlined" width={16} height={16} />
              </IconButton>
              <Menu
                anchorRef={buttonRef}
                centered
                open={open && !isLoading}
                onClose={handleMenuClose}
              >
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
            {isLoading && <Skeleton width={150} height={15} round={6} disableAspectRatio />}
            {!isLoading && (
              <Typography component="h2" variant="s1" customStyle={{ marginTop: 4 }}>
                {description}
              </Typography>
            )}
          </div>
        </Flexbox>
        <Flexbox gap={8} alignment="center">
          <Button
            ref={postButtonRef}
            variant="accent"
            size="small"
            startIcon={<Icon name="WriteFilled" />}
            onClick={handleClick}
          >
            글쓰기
          </Button>
          <Button
            size="small"
            startIcon={<Icon name="StarOutlined" />}
            iconOnly
            onClick={handleDialogOpen}
          />
          <Button
            size="small"
            startIcon={<Icon name="MoreMenuOutlined" />}
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
            startIcon={<Icon name="WriteOutlined" />}
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
