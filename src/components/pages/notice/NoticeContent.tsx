import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { Avatar, Box, Flexbox, Typography, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { putNoticeViewCount } from '@api/v1/notices';
import useNotice from '@hooks/query/useNotice';

function NoticeContent() {
  const { query: { id = 0 } = {} } = useRouter();
  const {
    theme: {
      mode,
      palette: { text, box }
    }
  } = useTheme();

  const updatedViewCountRef = useRef(false);

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
            />
            <UserInfo>
              <Typography variant="s1" color={text[mode].text1}>
                {user?.nickname}
              </Typography>
              <Typography variant="s1" color={text[mode].text1}>
                {dayjs(createdAt).fromNow()}
              </Typography>
            </UserInfo>
          </Flexbox>
          <Flexbox gap={12}>
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
      <Content
        component="article"
        lineHeight="main"
        dangerouslySetInnerHTML={{ __html: content }}
      />
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

const Content = styled(Typography)`
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
