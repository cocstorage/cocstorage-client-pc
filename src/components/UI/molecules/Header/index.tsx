import { ChangeEvent, HTMLAttributes, useMemo, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useQuery } from 'react-query';

import { Box, Flexbox, Hidden, Icon, Tag, TextBar, Typography, useTheme } from 'cocstorage-ui';

import { RatioImage } from '@components/UI/atoms';
import MessageDialog from '@components/UI/organisms/MessageDialog';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/react-query';

import { HeaderInner, Logo, StyledHeader } from './Header.styles';

interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {
  scrollFixedTrigger?: boolean;
}

function Header({ scrollFixedTrigger = false, ...props }: HeaderProps) {
  const router = useRouter();

  const {
    theme: { type, palette }
  } = useTheme();

  const { data: { avatarUrl = '', name = '' } = {} } = useQuery(
    queryKeys.storages.storageById(router.query.path as string),
    () => fetchStorage(router.query.path as string),
    {
      enabled: JSON.stringify(router.query) !== '{}' && router.pathname === '/storages/[path]/[id]'
    }
  );

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

  const isHome = useMemo(() => router.pathname === '/', [router.pathname]);
  const isStorages = useMemo(() => router.pathname.includes('/storages'), [router.pathname]);
  const isBoardDetail = useMemo(
    () => router.pathname === '/storages/[path]/[id]',
    [router.pathname]
  );

  const headerRef = useRef<HTMLHeadElement | null>(null);

  const { scrollFixed } = useScrollTrigger({ trigger: scrollFixedTrigger, ref: headerRef });

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value);

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
              variant="transparent"
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
