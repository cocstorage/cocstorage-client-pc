import { Box, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

import Comment from '@components/UI/organisms/Comment';

function CommentList() {
  const {
    theme: { palette }
  } = useTheme();

  return (
    <>
      <Flexbox gap={4}>
        <Icon name="CommentOutlined" width={20} height={20} />
        <Flexbox gap={6}>
          <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
            댓글
          </Typography>
          <Typography
            fontSize="16px"
            fontWeight={700}
            lineHeight="20px"
            customStyle={{
              color: palette.primary.main
            }}
          >
            72
          </Typography>
        </Flexbox>
      </Flexbox>
      <Box customStyle={{ marginTop: 24 }}>
        <Comment />
      </Box>
    </>
  );
}

export default CommentList;
