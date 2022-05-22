import { ChangeEvent, HTMLAttributes, useMemo, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Box, Flexbox, Hidden, Icon, Tag, TextBar, Typography, useTheme } from 'cocstorage-ui';

import RatioImage from '@components/UI/atoms/RatioImage';
import SystemMenu from '@components/UI/molecules/SystemMenu';
import MessageDialog from '@components/UI/organisms/MessageDialog';

import { useStorageData } from '@hooks/react-query/useStorage';
import useScrollTrigger from '@hooks/useScrollTrigger';

import { HeaderInner, Logo, StyledHeader } from './Header.styles';

interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {
  scrollFixedTrigger?: boolean;
}

function Header({ scrollFixedTrigger = false, ...props }: HeaderProps) {
  const router = useRouter();

  const {
    theme: { type, palette }
  } = useTheme();

  const { avatarUrl = '', name = '' } = useStorageData(router.query.path as string) || {};

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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const isHome = useMemo(
    () => router.pathname === '/' || router.pathname === '/best' || router.pathname === '/worst',
    [router.pathname]
  );
  const isStorages = useMemo(() => router.pathname.includes('/storages'), [router.pathname]);
  const isBoardDetail = useMemo(
    () => router.pathname === '/storages/[path]/[id]',
    [router.pathname]
  );

  const headerRef = useRef<HTMLHeadElement | null>(null);
  const tagRef = useRef<HTMLDivElement | null>(null);

  const { scrollFixed } = useScrollTrigger({ trigger: scrollFixedTrigger, ref: headerRef });

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value);

  const handleOpenMenu = () => setMenuOpen(true);

  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <>
      <StyledHeader ref={headerRef} scrollFixed={scrollFixed} {...props}>
        <HeaderInner scrollFixed={scrollFixed}>
          <Link href="/">
            <a>
              {!isBoardDetail && (
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
              )}
              {isBoardDetail && (
                <Flexbox gap={14} alignment="center">
                  <Logo
                    width={34}
                    height={24}
                    src="https://static.cocstorage.com/assets/logo.png"
                    alt="Logo Img"
                  />
                  <Box
                    customStyle={{
                      width: 1,
                      height: 16,
                      backgroundColor: palette.box.stroked.normal
                    }}
                  />
                  <Flexbox gap={10} alignment="center">
                    <RatioImage
                      width={24}
                      height={24}
                      round={4}
                      src={avatarUrl || ''}
                      alt="Storage Logo Img"
                    />
                    <Typography fontSize="16px" fontWeight={700} lineHeight="20px">
                      {name}
                    </Typography>
                  </Flexbox>
                </Flexbox>
              )}
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
                    variant={isHome ? 'semiAccent' : 'transparent'}
                    startIcon={<Icon name={isHome ? 'HomeFilled' : 'HomeOutlined'} width={16} />}
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
                    variant={isStorages ? 'semiAccent' : 'transparent'}
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
              ref={tagRef}
              variant="transparent"
              startIcon={<Icon name="SettingOutlined" width={16} />}
              customStyle={{
                height: 32,
                padding: 0,
                color: palette.text[type].main,
                '& svg path': {
                  fill: palette.text[type].main
                },
                cursor: 'pointer'
              }}
              onClick={handleOpenMenu}
            >
              <Hidden lgHidden>설정</Hidden>
            </Tag>
            <SystemMenu open={menuOpen} anchorRef={tagRef} onClose={handleCloseMenu} />
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
