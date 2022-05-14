import Image from 'next/image';

import styled from '@emotion/styled';

import { Avatar, Box, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

function StorageBoardContent() {
  const {
    theme: { type, palette }
  } = useTheme();

  return (
    <>
      <Flexbox direction="vertical" gap={8}>
        <Typography fontSize="22px" fontWeight={700} lineHeight="28px">
          호나우두 vs 호날두 축구 기량 평가는 이것만 보면 종결 남 ㅋㅋ
        </Typography>
        <Flexbox justifyContent="space-between">
          <Flexbox gap={6}>
            <Avatar
              width={24}
              height={24}
              src="https://static.cocstorage.com/assets/thumbnail.png"
              alt="User Avatar Img"
            />
            <UserInfo>
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                사용자
              </Typography>
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                22분 전
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
                4955
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
                1000
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
                20
              </Typography>
            </Flexbox>
            <Flexbox gap={4} alignment="center">
              <Icon name="ViewOutlined" width={15} height={15} color={palette.text[type].text1} />
              <Typography fontSize="12px" lineHeight="15px" color={palette.text[type].text1}>
                588
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
      <Content>
        <div>
          <Image
            width={587}
            height={404}
            src="https://static.cocstorage.com/assets/test.png"
            alt="Test Img"
            quality={100}
          />
        </div>
        이거 하나만 봐도 눈이 달려있지 않은 넘이 아닌 이상 한 눈에 호나우두가 축구 더 잘하는 선수인
        걸 알 수 있음 ㅋㅋ
        <div>
          <Image
            width={587}
            height={404}
            src="https://static.cocstorage.com/assets/test.png"
            alt="Test Img"
          />
        </div>
      </Content>
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
          4933
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
          1333
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
  img {
    border-radius: 8px;
  }
`;

export default StorageBoardContent;
