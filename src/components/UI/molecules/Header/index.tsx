import { ChangeEvent, HTMLAttributes, useMemo, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';

import {
  Box,
  Flexbox,
  Hidden,
  Icon,
  Image,
  Tag,
  TextBar,
  Typography,
  useTheme
} from 'cocstorage-ui';

import SystemMenu from '@components/UI/molecules/SystemMenu';

import { useStorageData } from '@hooks/query/useStorage';
import useScrollTrigger from '@hooks/useScrollTrigger';

import { HeaderInner, Logo, StyledHeader } from './Header.styles';

interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {
  scrollFixedTrigger?: boolean;
}

function Header({ scrollFixedTrigger = false, ...props }: HeaderProps) {
  const router = useRouter();
  const { query } = router;

  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const {
    theme: {
      mode,
      palette: { text, box }
    }
  } = useTheme();

  const { path, avatarUrl = '', name = '' } = useStorageData(String(query.path)) || {};

  const [value, setValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = useMemo(
    () => router.pathname === '/' || router.pathname === '/best' || router.pathname === '/worst',
    [router.pathname]
  );
  const isStorages = useMemo(() => router.pathname.includes('/storages'), [router.pathname]);
  const isStorageBoardDetail = useMemo(
    () => router.pathname === '/storages/[path]/[id]',
    [router.pathname]
  );

  const headerRef = useRef<HTMLHeadElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  const { triggered } = useScrollTrigger({ trigger: scrollFixedTrigger, ref: headerRef });

  const handleClick = () =>
    setCommonFeedbackDialogState({
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value);

  const handleOpenMenu = () => setMenuOpen(true);

  const handleCloseMenu = () => setMenuOpen(false);

  return (
    <>
      <StyledHeader ref={headerRef} triggered={triggered} {...props}>
        <HeaderInner triggered={triggered}>
          {!isStorageBoardDetail && (
            <Link href="/">
              <a>
                <Flexbox component="button" gap={8} alignment="center">
                  <Logo
                    width={34}
                    height={24}
                    src={`https://${process.env.IMAGE_DOMAIN}/assets/logo.png`}
                    alt="Logo Img"
                  />
                  <Hidden lgHidden>
                    <Flexbox>
                      <Typography variant="h3" fontWeight="bold">
                        개념글’
                      </Typography>
                      <Typography variant="h3">저장소</Typography>
                    </Flexbox>
                  </Hidden>
                </Flexbox>
              </a>
            </Link>
          )}
          {isStorageBoardDetail && (
            <Link href={`/storages/${path}`}>
              <a>
                <Flexbox gap={14} alignment="center">
                  <Logo
                    width={34}
                    height={24}
                    src={`https://${process.env.IMAGE_DOMAIN}/assets/logo.png`}
                    alt="Logo Img"
                  />
                  <Box
                    customStyle={{
                      width: 1,
                      height: 16,
                      backgroundColor: box.stroked.normal
                    }}
                  />
                  <Flexbox gap={10} alignment="center">
                    <Image
                      width={24}
                      height={24}
                      round={4}
                      src={avatarUrl || ''}
                      alt="Storage Logo Img"
                      disableAspectRatio
                    />
                    <Typography variant="h4" fontWeight="bold">
                      {name}
                    </Typography>
                  </Flexbox>
                </Flexbox>
              </a>
            </Link>
          )}
          <Box
            component="button"
            onClick={handleClick}
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
                backgroundColor: box.filled.normal,
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
                    startIcon={
                      <Icon name={isHome ? 'HomeFilled' : 'HomeOutlined'} width={16} height={16} />
                    }
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
                    startIcon={<Icon name="CommunityFilled" width={16} height={16} />}
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
              startIcon={<Icon name="SettingOutlined" width={16} height={16} />}
              customStyle={{
                height: 32,
                padding: 0,
                color: text[mode].main,
                '& svg path': {
                  fill: text[mode].main
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
      {triggered && (
        <Box customStyle={{ height: headerRef.current ? headerRef.current?.clientHeight : 70 }} />
      )}
    </>
  );
}

export default Header;
