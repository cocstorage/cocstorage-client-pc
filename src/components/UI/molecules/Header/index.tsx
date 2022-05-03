import React, { useState, useCallback, memo, ChangeEvent } from 'react';

import { useTheme, Typography, TextBar, Icon, Tag } from 'cocstorage-ui';

import { Wrapper, StyledHeader, LogoWrapper, Logo, Tags, TagsInner } from './Header.styles';

function Header() {
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
    <Wrapper>
      <StyledHeader theme={theme}>
        <LogoWrapper>
          <Logo
            width={34}
            height={24}
            src="https://static.cocstorage.com/assets/logo.png"
            alt="Logo Img"
          />
          <Typography fontSize="18px">
            <strong>개념글’</strong>저장소
          </Typography>
        </LogoWrapper>
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
        <Tags>
          <TagsInner>
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
          </TagsInner>
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
        </Tags>
      </StyledHeader>
    </Wrapper>
  );
}

export default memo(Header);
