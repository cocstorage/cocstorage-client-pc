import React, { useState, useCallback, memo, ChangeEvent, HTMLAttributes } from 'react';

import { useTheme, Typography, TextBar, Icon, Tag, Flexbox, Box } from 'cocstorage-ui';

import { StyledHeader, HeaderInner, Logo } from './Header.styles';

export interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  fixed?: boolean;
}

function Header({ fixed = false, ...props }: HeaderProps) {
  const {
    theme,
    theme: { type, palette }
  } = useTheme();
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value),
    []
  );

  return (
    <>
      <StyledHeader theme={theme} fixed={fixed} {...props}>
        <HeaderInner theme={theme}>
          <Flexbox gap={8}>
            <Logo
              width={34}
              height={24}
              src={`https://${process.env.IMAGE_DOMAIN}/assets/logo.png`}
              alt="Logo Img"
            />
            <Typography fontSize="18px">
              <strong>개념글’</strong>저장소
            </Typography>
          </Flexbox>
          <TextBar
            fullWidth
            startIcon={<Icon name="SearchOutlined" width={20} height={20} />}
            size="small"
            value={value}
            onChange={handleChange}
            placeholder="검색"
            customStyle={{
              maxWidth: 280,
              backgroundColor: palette.box.filled.normal,
              borderColor: 'transparent'
            }}
          />
          <Flexbox gap={20}>
            <Flexbox gap={10}>
              <Tag
                color="semiAccent"
                startIcon={<Icon name="HomeFilled" width={16} />}
                text="홈"
                customStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 26,
                  cursor: 'pointer'
                }}
              />
              <Tag
                color="transparent"
                startIcon={<Icon name="CommunityFilled" width={16} />}
                text="게시판"
                customStyle={{
                  height: 26,
                  padding: 0,
                  cursor: 'pointer'
                }}
              />
            </Flexbox>
            <Tag
              color="transparent"
              startIcon={<Icon name="LoginOutlined" width={16} />}
              text="로그인"
              customStyle={{
                height: 26,
                padding: 0,
                color: palette.text[type].main,
                '& svg path': {
                  fill: palette.text[type].main
                },
                cursor: 'pointer'
              }}
            />
          </Flexbox>
        </HeaderInner>
      </StyledHeader>
      {fixed && <Box customStyle={{ height: 73 }} />}
    </>
  );
}

export default memo(Header);
