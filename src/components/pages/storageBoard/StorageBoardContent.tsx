import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import { Avatar, Box, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import dayjs from 'dayjs';

import useStorage from '@hooks/react-query/useStorage';
import useStorageBoard from '@hooks/react-query/useStorageBoard';

function StorageBoardContent() {
  const { query: { path = '', id = 0 } = {} } = useRouter();
  const {
    theme: { type, palette }
  } = useTheme();

  const { data: { id: storageId } = {} } = useStorage(path as string);

  const { data: storageBoard } = useStorageBoard(storageId as number, id as string);

  return (
    <>
      <Flexbox direction="vertical" gap={8}>
        <Typography fontSize="22px" fontWeight={700} lineHeight="28px">
          {storageBoard?.subject}
        </Typography>
        <Flexbox justifyContent="space-between">
          <Flexbox gap={6}>
            {storageBoard?.isMember && storageBoard.user?.avatarUrl && (
              <Avatar
                width={24}
                height={24}
                src={storageBoard.user?.avatarUrl}
                alt="User Avatar Img"
              />
            )}
            <UserInfo>
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                {storageBoard?.nickname || storageBoard?.user?.nickname}
              </Typography>
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                {dayjs(storageBoard?.createdAt).fromNow()}
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
                {storageBoard?.thumbUp.toLocaleString()}
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
                {storageBoard?.thumbDown.toLocaleString()}
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
                {storageBoard?.commentTotalCount.toLocaleString()}
              </Typography>
            </Flexbox>
            <Flexbox gap={4} alignment="center">
              <Icon name="ViewOutlined" width={15} height={15} color={palette.text[type].text1} />
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                {storageBoard?.viewCount.toLocaleString()}
              </Typography>
            </Flexbox>
            <Button
              variant="transparent"
              size="pico"
              startIcon={<Icon name="MoreMenuOutlined" width={15} height={15} />}
              iconOnly
            />
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
      <Content dangerouslySetInnerHTML={{ __html: storageBoard?.content || '' }} />
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
        >
          {storageBoard?.thumbUp.toLocaleString()}
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
        >
          {storageBoard?.thumbDown.toLocaleString()}
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
  video {
    border-radius: 8px;
  }
`;

export default StorageBoardContent;
