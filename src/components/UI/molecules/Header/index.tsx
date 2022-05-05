import React, { useState, useCallback, useRef, ChangeEvent, HTMLAttributes } from 'react';

import { useTheme, Typography, TextBar, Icon, Tag, Flexbox, Box, Hidden } from 'cocstorage-ui';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { StyledHeader, HeaderInner, Logo } from './Header.styles';

interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {
  scrollFixedTrigger?: boolean;
}

function Header({ scrollFixedTrigger, ...props }: HeaderProps) {
  const {
    theme,
    theme: { type, palette }
  } = useTheme();
  const [value, setValue] = useState<string>('');

  const headerRef = useRef<HTMLHeadElement | null>(null);

  const { scrollFixed } = useScrollTrigger({ trigger: scrollFixedTrigger, ref: headerRef });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value),
    []
  );

  return (
    <>
      <StyledHeader ref={headerRef} theme={theme} scrollFixed={scrollFixed} {...props}>
        <HeaderInner theme={theme} scrollFixed={scrollFixed}>
          <Flexbox gap={8}>
            <Logo
              width={34}
              height={24}
              src={`https://${process.env.IMAGE_DOMAIN}/assets/logo.png`}
              alt="Logo Img"
            />
            <Hidden lgHidden>
              <Typography fontSize="18px">
                <strong>개념글’</strong>저장소
              </Typography>
            </Hidden>
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
                customStyle={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 32,
                  cursor: 'pointer'
                }}
              >
                <Hidden lgHidden>홈</Hidden>
              </Tag>
              <Tag
                color="transparent"
                startIcon={<Icon name="CommunityFilled" width={16} />}
                customStyle={{
                  height: 32,
                  padding: 0,
                  cursor: 'pointer'
                }}
              >
                <Hidden lgHidden>게시판</Hidden>
              </Tag>
            </Flexbox>
            <Tag
              color="transparent"
              startIcon={<Icon name="LoginOutlined" width={16} />}
              customStyle={{
                height: 32,
                padding: 0,
                color: palette.text[type].main,
                '& svg path': {
                  fill: palette.text[type].main
                },
                cursor: 'pointer'
              }}
            >
              <Hidden lgHidden>로그인</Hidden>
            </Tag>
          </Flexbox>
        </HeaderInner>
      </StyledHeader>
      {scrollFixed && (
        <Box customStyle={{ height: headerRef.current ? headerRef.current?.clientHeight : 70 }} />
      )}
    </>
  );
}

export default Header;
