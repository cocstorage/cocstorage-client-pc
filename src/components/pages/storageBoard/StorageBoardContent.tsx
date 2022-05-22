import { MouseEvent, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQueryClient } from 'react-query';

import styled from '@emotion/styled';

import { Box, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import type { AxiosError } from 'axios';

import dayjs from 'dayjs';

import RatioImage from '@components/UI/atoms/RatioImage';
import MessageDialog from '@components/UI/organisms/MessageDialog';

import { useStorageBoardData } from '@hooks/react-query/useStorageBoard';

import { getErrorMessageByCode } from '@utils';

import {
  putNonMemberStorageBoardRecommend,
  putStorageBoardViewCount
} from '@api/v1/storage-boards';

import queryKeys from '@constants/react-query';

function StorageBoardContent() {
  const { query: { id = 0 } = {} } = useRouter();
  const {
    theme: { type, palette }
  } = useTheme();

  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<{
    title: string;
    code: string;
    message: string;
  }>({
    title: '알 수 없는 오류가 발생했어요.',
    code: '',
    message: '문제가 지속된다면 관리자에게 문의해 주세요!'
  });

  const updatedViewCountRef = useRef<boolean>(false);

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
    (data: {
      storageId: number;
      storageBoardId: number;
      type: 0 | 1;
      shouldBeHandledByGlobalErrorHandler?: boolean;
    }) => putNonMemberStorageBoardRecommend(data.storageId, data.storageBoardId, data.type),
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

          setErrorMessage({
            title: getErrorMessageByCode(data.code),
            code: '',
            message: '다른 글도 한번 살펴보시는 건 어때요?'
          });

          setOpen(true);
        } else {
          setOpen(true);
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
        type: dataType,
        shouldBeHandledByGlobalErrorHandler: false
      });
    }
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!updatedViewCountRef.current && storageBoardId && storage && storage.id) {
      updatedViewCountRef.current = true;
      mutate({ storageId: storage.id, storageBoardId });
    }
  }, [mutate, storage, storageBoardId]);

  return (
    <>
      <Flexbox direction="vertical" gap={8}>
        <Typography fontSize="22px" fontWeight={700} lineHeight="28px">
          {subject}
        </Typography>
        <Flexbox justifyContent="space-between">
          <Flexbox gap={6}>
            <RatioImage
              width={24}
              height={24}
              src={(user || {}).avatarUrl || ''}
              alt="User Avatar Img"
              round="50%"
              defaultIcon="user"
              defaultIconWidth={12}
              defaultIconHeight={12}
            />
            <UserInfo>
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                {nickname || user?.nickname}
              </Typography>
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                {dayjs(createdAt).fromNow()}
              </Typography>
            </UserInfo>
          </Flexbox>
          <Flexbox gap={12}>
            <Flexbox gap={4} alignment="center">
              <Icon
                name="ThumbsUpOutlined"
                width={15}
                height={15}
                color={palette.text[type].text1}
              />
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                {thumbUp.toLocaleString()}
              </Typography>
            </Flexbox>
            <Flexbox gap={4} alignment="center">
              <Icon
                name="ThumbsDownOutlined"
                width={15}
                height={15}
                color={palette.text[type].text1}
              />
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                {thumbDown.toLocaleString()}
              </Typography>
            </Flexbox>
            <Flexbox gap={4} alignment="center">
              <Icon
                name="CommentOutlined"
                width={15}
                height={15}
                color={palette.text[type].text1}
              />
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                {commentTotalCount.toLocaleString()}
              </Typography>
            </Flexbox>
            <Flexbox gap={4} alignment="center">
              <Icon name="ViewOutlined" width={15} height={15} color={palette.text[type].text1} />
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
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
          backgroundColor: palette.box.stroked.normal
        }}
      />
      <Content dangerouslySetInnerHTML={{ __html: content }} />
      <Box customStyle={{ margin: '30px 0', textAlign: 'center' }}>
        <Button
          size="small"
          startIcon={
            <Icon name="ThumbsUpFilled" width={15} height={15} color={palette.primary.main} />
          }
          customStyle={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            fontWeight: 700,
            color: palette.primary.main
          }}
          data-type={0}
          onClick={handleClickRecommend}
        >
          {thumbUp.toLocaleString()}
        </Button>
        <Button
          size="small"
          startIcon={
            <Icon
              name="ThumbsDownOutlined"
              width={15}
              height={15}
              color={palette.text[type].text1}
            />
          }
          customStyle={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            color: palette.text[type].text1
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
          backgroundColor: palette.box.stroked.normal
        }}
      />
      <MessageDialog open={open} onClose={handleClose} {...errorMessage} />
    </>
  );
}

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  & > div:after {
    content: '';
    display: inline-block;
    width: 2px;
    height: 2px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: ${({ theme: { type, palette } }) => palette.text[type].text1};
    vertical-align: middle;
  }
  & > div:last-child:after {
    display: none;
  }
`;

const Content = styled.article`
  position: relative;

  img,
  video,
  embed,
  iframe {
    border-radius: 8px;
  }
`;

export default StorageBoardContent;
