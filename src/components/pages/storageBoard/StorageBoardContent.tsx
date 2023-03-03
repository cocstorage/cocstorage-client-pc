import { MouseEvent, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { convertToReactElement } from 'cocstorage-ui-editor';
import dayjs from 'dayjs';

import styled, { CSSObject } from '@emotion/styled';

import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  commonFeedbackDialogState,
  commonHistoryState,
  commonOnBoardingDefault,
  commonOnBoardingState
} from '@recoil/common/atoms';
import { storageBoardDeleteDialogOpenState } from '@recoil/pages/storageBoard/atoms';
import {
  storageBoardEditEditorContentsState,
  storageBoardEditNicknameState,
  storageBoardEditPasswordState,
  storageBoardEditSubjectState
} from '@recoil/pages/storageBoardEdit/atoms';

import {
  Avatar,
  Box,
  Button,
  Flexbox,
  Icon,
  Menu,
  Spotlight,
  Tag,
  Tooltip,
  Typography,
  useTheme
} from 'cocstorage-ui';

import type { AxiosError } from 'axios';

import { useStorageBoardData } from '@hooks/query/useStorageBoard';

import getErrorMessageByCode from '@utils/getErrorMessageByCode';

import {
  putNonMemberStorageBoardRecommend,
  putStorageBoardViewCount
} from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function StorageBoardContent() {
  const router = useRouter();
  const { id } = router.query;

  const {
    theme: {
      mode,
      palette: { primary, text, box }
    }
  } = useTheme();

  const [
    {
      theme: { done: themeDone = false },
      comment: { done: commentDone = false } = {},
      editAndDelete: { done = false } = {}
    },
    setCommonOnBoardingState
  ] = useRecoilState(commonOnBoardingState);
  const { index, object } = useRecoilValue(commonHistoryState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);
  const [openDeleteDialog, setOpenState] = useRecoilState(storageBoardDeleteDialogOpenState);
  const resetSubjectState = useResetRecoilState(storageBoardEditSubjectState);
  const resetNicknameState = useResetRecoilState(storageBoardEditNicknameState);
  const resetPasswordState = useResetRecoilState(storageBoardEditPasswordState);
  const resetEditorContentsState = useResetRecoilState(storageBoardEditEditorContentsState);

  const [open, setOpen] = useState(false);
  const [openSpotlight, setOpenSpotlight] = useState(false);

  const updatedViewCountRef = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spotlightOpenTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const queryClient = useQueryClient();

  const {
    id: storageBoardId,
    user,
    storage,
    subject = '',
    content = '',
    contentJson = [],
    nickname,
    thumbUp = 0,
    thumbDown = 0,
    commentTotalCount = 0,
    viewCount = 0,
    createdIp,
    sourceCode,
    scrapCode,
    createdAt
  } = useStorageBoardData(Number(id)) || {};

  const { mutate } = useMutation(
    (data: { storageId: number; storageBoardId: number }) =>
      putStorageBoardViewCount(data.storageId, data.storageBoardId),
    {
      onSuccess: () => {
        updatedViewCountRef.current = false;
      }
    }
  );

  const { mutate: recommendMutate } = useMutation(
    (data: { storageId: number; storageBoardId: number; type: 0 | 1 }) =>
      putNonMemberStorageBoardRecommend(data.storageId, data.storageBoardId, data.type),
    {
      onSuccess: (data) => {
        if (storageBoardId && data) {
          queryClient.setQueryData(queryKeys.storageBoards.storageBoardById(storageBoardId), data);
        }
      },
      onError: (error: AxiosError) => {
        if (error && error.response) {
          const { data: { code = '' } = {} } = error.response as { data: { code: string } };

          setCommonFeedbackDialogState({
            open: true,
            title: getErrorMessageByCode(code),
            message: '다른 글도 한번 살펴보시는 건 어때요?'
          });
        }
      }
    }
  );

  const handleClick = () => {
    if (openSpotlight) handleCloseSpotlight();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleClickEdit = () => {
    resetNicknameState();
    resetPasswordState();
    resetSubjectState();
    resetEditorContentsState();
    router.push(`/storages/${storage?.path}/${id}/edit`);
  };

  const handleClickDelete = () => setOpenState(true);

  const handleClickRecommend = (event: MouseEvent<HTMLButtonElement>) => {
    const dataType = Number(event.currentTarget.getAttribute('data-type') || 0);

    if (storageBoardId && storage && storage.id && (dataType === 0 || dataType === 1)) {
      recommendMutate({
        storageId: storage.id,
        storageBoardId,
        type: dataType
      });
    }
  };

  const handleClickSource = () =>
    window.open(
      `https://gall.dcinside.com/board/view/?id=${sourceCode}&no=${scrapCode}&exception_mode=recommend&page=1`,
      '_blank'
    );

  const handleCloseSpotlight = () => {
    setOpenSpotlight(false);
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      editAndDelete: {
        ...commonOnBoardingDefault.editAndDelete,
        step: 1,
        done: commonOnBoardingDefault.editAndDelete.lastStep === 1
      }
    }));
  };

  useEffect(() => {
    if (!updatedViewCountRef.current && storageBoardId && storage && storage.id) {
      updatedViewCountRef.current = true;
      mutate({ storageId: storage.id, storageBoardId });
    }
  }, [mutate, storage, storageBoardId]);

  // TODO video autoplay 가 동작하지 않는 문제, 서버 쪽 크롤링 로직 확인 후 수정
  // 임시 처리
  useEffect(() => {
    if (content && contentRef.current && sourceCode) {
      const videos = contentRef.current.getElementsByTagName('video');

      if (videos.length) {
        for (let i = 0; i < videos.length; i += 1) {
          videos[i].muted = true;
          videos[i].play();
        }
      }
    }
  }, [content, sourceCode]);

  useEffect(() => {
    // TODO Spotlight 컴포넌트 동시성 개선 필요
    if (
      object[index - 1] === '/storages/[path]/post' &&
      themeDone &&
      commentDone &&
      !done &&
      !sourceCode
    ) {
      spotlightOpenTimerRef.current = setTimeout(() => {
        setOpenSpotlight(true);
      }, 350);
    }
  }, [object, index, themeDone, commentDone, done, sourceCode]);

  useEffect(() => {
    if (!openDeleteDialog) setOpen(false);
  }, [openDeleteDialog]);

  useEffect(() => {
    return () => {
      if (spotlightOpenTimerRef.current) {
        clearTimeout(spotlightOpenTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <Flexbox direction="vertical" gap={8}>
        <Typography component="h1" variant="h2" fontWeight="bold">
          {subject}
        </Typography>
        <Flexbox justifyContent="space-between">
          <Flexbox gap={6}>
            <Avatar
              width={24}
              height={24}
              src={(user || {}).avatarUrl || ''}
              alt="User Avatar Img"
              fallback={{
                iconName: 'UserFilled',
                width: 12,
                height: 12
              }}
            />
            <UserInfo>
              <Typography variant="s1" color={text[mode].text1}>
                {nickname || user?.nickname}
              </Typography>
              {!user && createdIp && (
                <Typography variant="s1" color={text[mode].text1}>
                  {`(${createdIp})`}
                </Typography>
              )}
              <Typography variant="s1" color={text[mode].text1}>
                {dayjs(createdAt).fromNow()}
              </Typography>
            </UserInfo>
          </Flexbox>
          <Flexbox gap={12}>
            <Flexbox gap={4} alignment="center">
              <Icon name="ThumbsUpOutlined" width={15} height={15} color={text[mode].text1} />
              <Typography variant="s1" color={text[mode].text1}>
                {thumbUp.toLocaleString()}
              </Typography>
            </Flexbox>
            <Flexbox gap={4} alignment="center">
              <Icon name="ThumbsDownOutlined" width={15} height={15} color={text[mode].text1} />
              <Typography variant="s1" color={text[mode].text1}>
                {thumbDown.toLocaleString()}
              </Typography>
            </Flexbox>
            <Flexbox gap={4} alignment="center">
              <Icon name="CommentOutlined" width={15} height={15} color={text[mode].text1} />
              <Typography variant="s1" color={text[mode].text1}>
                {commentTotalCount.toLocaleString()}
              </Typography>
            </Flexbox>
            <Flexbox gap={4} alignment="center">
              <Icon name="ViewOutlined" width={15} height={15} color={text[mode].text1} />
              <Typography variant="s1" color={text[mode].text1}>
                {viewCount.toLocaleString()}
              </Typography>
            </Flexbox>
            {!sourceCode && (
              <>
                <Button
                  ref={buttonRef}
                  variant="transparent"
                  size="pico"
                  startIcon={<Icon name="MoreMenuOutlined" />}
                  iconOnly
                  onClick={handleClick}
                />
                <Menu anchorRef={buttonRef} open={open} onClose={handleClose}>
                  <Flexbox
                    gap={8}
                    alignment="center"
                    onClick={handleClickEdit}
                    customStyle={{
                      padding: '12px 16px',
                      cursor: 'pointer'
                    }}
                  >
                    <Icon name="WriteOutlined" width={20} height={20} color={text[mode].text2} />
                    <Typography>수정하기</Typography>
                  </Flexbox>
                  <Flexbox
                    gap={8}
                    alignment="center"
                    onClick={handleClickDelete}
                    customStyle={{
                      padding: '12px 16px',
                      cursor: 'pointer'
                    }}
                  >
                    <Icon name="CloseOutlined" width={20} height={20} color={text[mode].text2} />
                    <Typography>삭제하기</Typography>
                  </Flexbox>
                </Menu>
              </>
            )}
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <Box
        customStyle={{
          margin: '20px 0',
          width: '100%',
          height: 1,
          backgroundColor: box.stroked.normal
        }}
      />
      {sourceCode && (
        <Flexbox gap={8} customStyle={{ marginBottom: 20, justifyContent: 'flex-end' }}>
          <Tag
            startIcon={<Icon name="LogoutOutlined" />}
            onClick={handleClickSource}
            customStyle={{ cursor: 'pointer' }}
          >
            출처 바로가기
          </Tag>
          <Tag startIcon={<Icon name="EmailOutlined" />}>cocstoragehelps@gmail.com</Tag>
        </Flexbox>
      )}
      {sourceCode && (
        <Content
          ref={contentRef}
          component="article"
          lineHeight="main"
          sourceCode={sourceCode}
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
      )}
      {!sourceCode && (
        <Content ref={contentRef} component="article" lineHeight="main" sourceCode={sourceCode}>
          {convertToReactElement(contentJson)}
        </Content>
      )}
      <Box customStyle={{ margin: '30px 0', textAlign: 'center' }}>
        <Button
          startIcon={<Icon name="ThumbsUpFilled" color={primary.main} />}
          customStyle={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            fontWeight: 700,
            color: primary.main
          }}
          data-type={0}
          onClick={handleClickRecommend}
        >
          {thumbUp.toLocaleString()}
        </Button>
        <Button
          startIcon={<Icon name="ThumbsDownOutlined" color={text[mode].text1} />}
          customStyle={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            color: text[mode].text1
          }}
          data-type={1}
          onClick={handleClickRecommend}
        >
          {thumbDown.toLocaleString()}
        </Button>
      </Box>
      <Box
        customStyle={{
          margin: '20px 0',
          width: '100%',
          height: 1,
          backgroundColor: box.stroked.normal
        }}
      />
      {!sourceCode && (
        <Spotlight
          open={openSpotlight}
          targetRef={buttonRef}
          onClose={handleCloseSpotlight}
          round={8}
        >
          <Tooltip
            open
            onClose={handleCloseSpotlight}
            content="게시글의 수정 및 삭제는 여기를 클릭해 주세요!"
          >
            <Button
              variant="transparent"
              size="pico"
              startIcon={<Icon name="MoreMenuOutlined" />}
              iconOnly
              onClick={handleClick}
            />
          </Tooltip>
        </Spotlight>
      )}
    </>
  );
}

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  & > span:after {
    content: '';
    display: inline-block;
    width: 2px;
    height: 2px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: ${({
      theme: {
        mode,
        palette: { text }
      }
    }) => text[mode].text1};
    vertical-align: middle;
  }
  & > span:last-child:after {
    display: none;
  }
`;

const Content = styled(Typography)<{
  sourceCode?: string | null;
}>`
  position: relative;
  margin-top: 20px;
  overflow: hidden;

  ${({ sourceCode }): CSSObject =>
    sourceCode
      ? {
          '*': {
            maxWidth: '100%'
          },
          'img, video, embed, iframe': {
            borderRadius: 6
          }
        }
      : {}}
`;

export default StorageBoardContent;
