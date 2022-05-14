import { Avatar, Box, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import Reply from '@components/UI/molecules/Reply';
import CommentForm from '@components/UI/organisms/CommentForm';

function Comment() {
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  return (
    <>
      <Flexbox gap={10}>
        <Avatar
          width={30}
          height={30}
          src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
          alt="User Avatar"
        />
        <Flexbox gap={8} direction="vertical" customStyle={{ flexGrow: 1 }}>
          <div>
            <Typography fontSize="12px" fontWeight={700} lineHeight="15px">
              사용자
            </Typography>
            <Typography lineHeight="18px" customStyle={{ marginTop: 4 }}>
              내용입니다.
            </Typography>
          </div>
          <Flexbox direction="vertical" gap={11}>
            <Flexbox gap={12} alignment="center">
              <Typography
                fontSize="12px"
                lineHeight="15px"
                customStyle={{
                  color: text[type].text1
                }}
              >
                22분전
              </Typography>
              <Typography
                fontSize="12px"
                lineHeight="15px"
                customStyle={{ cursor: 'pointer', color: text[type].text1 }}
              >
                답글달기
              </Typography>
            </Flexbox>
            <Flexbox gap={10} alignment="center">
              <Box customStyle={{ width: 24, height: 1, backgroundColor: text[type].text3 }} />
              <Typography
                fontSize="12px"
                lineHeight="15px"
                customStyle={{
                  color: text[type].text1,
                  cursor: 'pointer'
                }}
              >
                답글 7개
              </Typography>
            </Flexbox>
          </Flexbox>
        </Flexbox>
        <Flexbox alignment="center">
          <Button
            variant="transparent"
            size="pico"
            startIcon={<Icon name="MoreMenuOutlined" width={15} height={15} />}
            iconOnly
          />
        </Flexbox>
      </Flexbox>
      <Flexbox gap={18} direction="vertical" customStyle={{ marginTop: 15 }}>
        <Flexbox
          gap={10}
          customStyle={{
            '&:before': {
              display: 'block',
              content: '""',
              width: 8,
              height: 8,
              marginTop: 10,
              borderLeft: '1px solid',
              borderBottom: '1px solid',
              borderColor: text[type].text3
            }
          }}
        >
          <CommentForm />
        </Flexbox>
        <Reply />
      </Flexbox>
    </>
  );
}

export default Comment;
