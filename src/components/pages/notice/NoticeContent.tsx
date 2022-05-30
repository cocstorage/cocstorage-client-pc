import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { useMutation } from 'react-query';

import styled from '@emotion/styled';

import { Avatar, Box, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import dayjs from 'dayjs';

import useNotice from '@hooks/react-query/useNotice';

import { putNoticeViewCount } from '@api/v1/notices';

function NoticeContent() {
  const { query: { id = 0 } = {} } = useRouter();
  const {
    theme: { type, palette }
  } = useTheme();

  const updatedViewCountRef = useRef<boolean>(false);

  const {
    data: { user, subject = '', content = '', commentTotalCount = 0, viewCount = 0, createdAt } = {}
  } = useNotice(Number(id));

  const { mutate } = useMutation((data: { id: number }) => putNoticeViewCount(data.id), {
    onSuccess: () => {
      updatedViewCountRef.current = false;
    }
  });

  useEffect(() => {
    if (!updatedViewCountRef.current && id) {
      updatedViewCountRef.current = true;
      mutate({ id: Number(id) });
    }
  }, [mutate, id]);

  return (
    <>
      <Flexbox direction="vertical" gap={8}>
        <Typography fontSize="22px" fontWeight={700} lineHeight="28px">
          {subject}
        </Typography>
        <Flexbox justifyContent="space-between">
          <Flexbox gap={6}>
            <Avatar
              width={24}
              height={24}
              src={(user || {}).avatarUrl || ''}
              alt="User Avatar Img"
            />
            <UserInfo>
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                {user?.nickname}
              </Typography>
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                {dayjs(createdAt).fromNow()}
              </Typography>
            </UserInfo>
          </Flexbox>
          <Flexbox gap={12}>
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
      <Box
        customStyle={{
          margin: '20px 0',
          width: '100%',
          height: 1,
          backgroundColor: palette.box.stroked.normal
        }}
      />
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
    max-width: 100%;
    border-radius: 8px;
  }
`;

export default NoticeContent;
