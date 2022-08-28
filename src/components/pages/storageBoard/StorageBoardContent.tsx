import { MouseEvent, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import styled from '@emotion/styled';

import { useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';

import { Box, Button, Flexbox, Icon, Image, Tag, Typography, useTheme } from 'cocstorage-ui';

import type { AxiosError } from 'axios';

import GoogleAdSense from '@components/UI/molecules/GoogleAdSense';

import { useStorageBoardData } from '@hooks/query/useStorageBoard';

import getErrorMessageByCode from '@utils/getErrorMessageByCode';

import {
  putNonMemberStorageBoardRecommend,
  putStorageBoardViewCount
} from '@api/v1/storage-boards';

import queryKeys from '@constants/queryKeys';

function StorageBoardContent() {
  const { query: { id = 0 } = {} } = useRouter();
  const {
    theme: {
      type,
      palette: { primary, text, box }
    }
  } = useTheme();

  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const updatedViewCountRef = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const {
    id: storageBoardId,
    user,
    storage,
    subject = '',
    content = '',
    nickname,
    thumbUp = 0,
    thumbDown = 0,
    commentTotalCount = 0,
    viewCount = 0,
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
      onError: (error) => {
        const asError = error as AxiosError;

        if (asError && asError.response) {
          const { data = {} } = (asError || {}).response || {};

          setCommonFeedbackDialogState({
            open: true,
            title: getErrorMessageByCode(data.code),
            message: '다른 글도 한번 살펴보시는 건 어때요?'
          });
        }
      }
    }
  );

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

  useEffect(() => {
    if (!updatedViewCountRef.current && storageBoardId && storage && storage.id) {
      updatedViewCountRef.current = true;
      mutate({ storageId: storage.id, storageBoardId });
    }
  }, [mutate, storage, storageBoardId]);

  // TODO video autoplay 가 동작하지 않는 문제, 서버 쪽 크롤링 로직 확인 후 수정
  // 임시 처리
  useEffect(() => {
    if (content && contentRef.current) {
      const videos = contentRef.current.getElementsByTagName('video');

      if (videos.length) {
        for (let i = 0; i < videos.length; i += 1) {
          videos[i].play();
        }
      }
    }
  }, [content]);

  return (
    <>
      <Flexbox direction="vertical" gap={8}>
        <Typography variant="h2" fontWeight="bold">
          {subject}
        </Typography>
        <Flexbox justifyContent="space-between">
          <Flexbox gap={6}>
            <Image
              width={24}
              height={24}
              src={(user || {}).avatarUrl || ''}
              alt="User Avatar Img"
              round="50%"
              disableAspectRatio
              fallback={{
                iconName: 'UserFilled',
                width: 12,
                height: 12
              }}
            />
            <UserInfo>
              <Typography variant="s1" color={text[type].text1}>
                {nickname || user?.nickname}
              </Typography>
              <Typography variant="s1" color={text[type].text1}>
                {dayjs(createdAt).fromNow()}
              </Typography>
            </UserInfo>
          </Flexbox>
          <Flexbox gap={12}>
            <Flexbox gap={4} alignment="center">
              <Icon name="ThumbsUpOutlined" width={15} height={15} color={text[type].text1} />
              <Typography variant="s1" color={text[type].text1}>
                {thumbUp.toLocaleString()}
              </Typography>
            </Flexbox>
            <Flexbox gap={4} alignment="center">
              <Icon name="ThumbsDownOutlined" width={15} height={15} color={text[type].text1} />
              <Typography variant="s1" color={text[type].text1}>
                {thumbDown.toLocaleString()}
              </Typography>
            </Flexbox>
            <Flexbox gap={4} alignment="center">
              <Icon name="CommentOutlined" width={15} height={15} color={text[type].text1} />
              <Typography variant="s1" color={text[type].text1}>
                {commentTotalCount.toLocaleString()}
              </Typography>
            </Flexbox>
            <Flexbox gap={4} alignment="center">
              <Icon name="ViewOutlined" width={15} height={15} color={text[type].text1} />
              <Typography variant="s1" color={text[type].text1}>
                {viewCount.toLocaleString()}
              </Typography>
            </Flexbox>
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
      <GoogleAdSense
        html={
          '<ins class="adsbygoogle"\n' +
          '     style="display:block"\n' +
          '     data-ad-client="ca-pub-5809905264951057"\n' +
          '     data-ad-slot="3990104603"\n' +
          '     data-ad-format="auto"\n' +
          '     data-full-width-responsive="true"></ins>'
        }
      />
      <Content
        ref={contentRef}
        component="article"
        lineHeight="main"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Box customStyle={{ margin: '30px 0', textAlign: 'center' }}>
        <Button
          size="small"
          startIcon={<Icon name="ThumbsUpFilled" width={15} height={15} color={primary.main} />}
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
          size="small"
          startIcon={
            <Icon name="ThumbsDownOutlined" width={15} height={15} color={text[type].text1} />
          }
          customStyle={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            color: text[type].text1
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
    background-color: ${({ theme: { type, palette } }) => palette.text[type].text1};
    vertical-align: middle;
  }
  & > span:last-child:after {
    display: none;
  }
`;

const Content = styled(Typography)`
  position: relative;
  margin-top: 20px;

  img,
  video,
  embed,
  iframe {
    max-width: 100%;
    border-radius: 8px;
  }
`;

export default StorageBoardContent;
