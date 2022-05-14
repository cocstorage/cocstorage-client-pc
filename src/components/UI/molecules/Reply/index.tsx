import { memo } from 'react';

import { Avatar, Button, Flexbox, Icon, Typography, useTheme } from 'cocstorage-ui';

function Reply() {
  const {
    theme: {
      type,
      palette: { text }
    }
  } = useTheme();

  return (
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
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <Flexbox alignment="center">
        <Button
          color="transparent"
          size="pico"
          startIcon={<Icon name="MoreMenuOutlined" width={15} height={15} />}
          iconOnly
        />
      </Flexbox>
    </Flexbox>
  );
}

export default memo(Reply);
