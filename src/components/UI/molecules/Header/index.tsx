import React, { useState, useRef, ChangeEvent, HTMLAttributes } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useTheme, Typography, TextBar, Icon, Tag, Flexbox, Box, Hidden } from 'cocstorage-ui';

import MessageDialog from '@components/UI/organisms/MessageDialog';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { StyledHeader, HeaderInner, Logo } from './Header.styles';

interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {
  scrollFixedTrigger?: boolean;
}

function Header({ scrollFixedTrigger = false, ...props }: HeaderProps) {
  const router = useRouter();

  const {
    theme,
    theme: { type, palette }
  } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [message] = useState<{
    title: string;
    code: string;
    message: string;
  }>({
    title: '준비 중인 기능이에요.',
    code: '',
    message: '조금만 기다려 주세요!'
  });

  const [value, setValue] = useState<string>('');

  const headerRef = useRef<HTMLHeadElement | null>(null);

  const { scrollFixed } = useScrollTrigger({ trigger: scrollFixedTrigger, ref: headerRef });

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value);

  return (
    <>
      <StyledHeader ref={headerRef} theme={theme} scrollFixed={scrollFixed} {...props}>
        <HeaderInner theme={theme} scrollFixed={scrollFixed}>
          <Link href="/">
            <a>
              <Flexbox component="button" gap={8}>
                <Logo
                  width={34}
                  height={24}
                  src="https://static.cocstorage.com/assets/logo.png"
                  alt="Logo Img"
                />
                <Hidden lgHidden>
                  <Typography fontSize="18px">
                    <strong>개념글’</strong>저장소
                  </Typography>
                </Hidden>
              </Flexbox>
            </a>
          </Link>
          <Box
            component="button"
            onClick={handleOpen}
            customStyle={{
              minWidth: 280
            }}
          >
            <TextBar
              fullWidth
              startIcon={<Icon name="SearchOutlined" width={20} height={20} />}
              size="small"
              value={value}
              onChange={handleChange}
              placeholder="검색"
              customStyle={{
                backgroundColor: palette.box.filled.normal,
                borderColor: 'transparent'
              }}
              disabled
            />
          </Box>
          <Flexbox gap={20}>
            <Flexbox gap={10}>
              <Link href="/">
                <a>
                  <Tag
                    color={router.pathname === '/' ? 'semiAccent' : 'transparent'}
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
                </a>
              </Link>
              <Link href="/storages">
                <a>
                  <Tag
                    color={router.pathname.includes('/storages') ? 'semiAccent' : 'transparent'}
                    startIcon={<Icon name="CommunityFilled" width={16} />}
                    customStyle={{
                      height: 32,
                      cursor: 'pointer'
                    }}
                  >
                    <Hidden lgHidden>게시판</Hidden>
                  </Tag>
                </a>
              </Link>
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
              onClick={handleOpen}
            >
              <Hidden lgHidden>로그인</Hidden>
            </Tag>
          </Flexbox>
        </HeaderInner>
      </StyledHeader>
      {scrollFixed && (
        <Box customStyle={{ height: headerRef.current ? headerRef.current?.clientHeight : 70 }} />
      )}
      <MessageDialog open={open} {...message} onClose={handleClose} />
    </>
  );
}

export default Header;
