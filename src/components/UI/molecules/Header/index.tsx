import {
  ChangeEvent,
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  commonFeedbackDialogState,
  commonOnBoardingDefault,
  commonOnBoardingState
} from '@recoil/common/atoms';

import {
  Avatar,
  Box,
  Flexbox,
  Hidden,
  Icon,
  Image,
  Spotlight,
  Tag,
  TextBar,
  Tooltip,
  Typography,
  useTheme
} from 'cocstorage-ui';

import SystemMenu from '@components/UI/molecules/SystemMenu';

import { useStorageData } from '@hooks/query/useStorage';
import useScrollTrigger from '@hooks/useScrollTrigger';

import { HeaderInner, StyledHeader } from './Header.styles';

interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {
  scrollFixedTrigger?: boolean;
}

function Header({ scrollFixedTrigger = false, ...props }: HeaderProps) {
  const router = useRouter();
  const { query } = router;

  const [{ theme: { done = false } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const {
    theme: {
      mode,
      breakpoints,
      palette: { text, box }
    }
  } = useTheme();

  const { path, avatarUrl = '', name = '' } = useStorageData(String(query.path)) || {};

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [left, setLeft] = useState(0);
  const [triangleLeft, setTriangleLeft] = useState(0);
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

  const handleClose = () =>
    setCommonOnBoardingState((prevState) => ({
      ...prevState,
      theme: {
        ...commonOnBoardingDefault.theme,
        step: 1,
        done: commonOnBoardingDefault.theme.lastStep === 1
      }
    }));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value);

  const handleOpenMenu = () => {
    handleClose();
    setMenuOpen(true);
  };

  const handleCloseMenu = () => setMenuOpen(false);

  const handleResize = useCallback(() => {
    if (tagRef.current) {
      const { clientWidth } = tagRef.current;
      // TODO 추후 UI 라이브러리 내 Hook 작성
      const lgHidden = window.matchMedia(`(max-width: ${breakpoints.lg}px)`).matches;
      setLeft(clientWidth - (lgHidden ? 189 : 199));
      setTriangleLeft((lgHidden ? 189 : 209) - clientWidth);
    }
  }, [breakpoints.lg]);

  useEffect(() => {
    if (tagRef.current) {
      const { clientWidth } = tagRef.current;
      const lgHidden = window.matchMedia(`(max-width: ${breakpoints.lg}px)`).matches;
      setLeft(clientWidth - (lgHidden ? 189 : 199));
      setTriangleLeft((lgHidden ? 189 : 209) - clientWidth);
    }
  }, [breakpoints.lg]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (!done) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [done]);

  return (
    <>
      <StyledHeader ref={headerRef} triggered={triggered} {...props}>
        <HeaderInner triggered={triggered}>
          {!isStorageBoardDetail && (
            <Link href="/">
              <Flexbox component="button" gap={8} alignment="center">
                <Image
                  width={34}
                  height={25.5}
                  src={`https://${process.env.IMAGE_DOMAIN}/assets/logo.png`}
                  alt="Logo Img"
                  disableAspectRatio
                  disableBackgroundColor
                />
                <Hidden lgHidden>
                  <Typography
                    variant="h3"
                    customStyle={{
                      '& > strong': {
                        fontWeight: 700
                      }
                    }}
                  >
                    <strong>개념글’</strong>저장소
                  </Typography>
                </Hidden>
              </Flexbox>
            </Link>
          )}
          {isStorageBoardDetail && (
            <Link href={`/storages/${path}`}>
              <Flexbox gap={14} alignment="center">
                <Image
                  width={34}
                  height={25.5}
                  src={`https://${process.env.IMAGE_DOMAIN}/assets/logo.png`}
                  alt="Logo Img"
                  disableAspectRatio
                  disableBackgroundColor
                />
                <Box
                  customStyle={{
                    width: 1,
                    height: 16,
                    backgroundColor: box.stroked.normal
                  }}
                />
                <Flexbox gap={10} alignment="center">
                  <Avatar
                    width={24}
                    height={24}
                    round={4}
                    src={avatarUrl || ''}
                    alt="Storage Logo Img"
                  />
                  <Typography variant="h4" fontWeight="bold">
                    {name}
                  </Typography>
                </Flexbox>
              </Flexbox>
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
              </Link>
              <Link href="/storages">
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
              </Link>
            </Flexbox>
            <Tag
              ref={tagRef}
              variant="transparent"
              startIcon={<Icon name="UserOutlined" width={16} height={16} />}
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
              <Hidden lgHidden>마이</Hidden>
            </Tag>
            <SystemMenu open={menuOpen} anchorRef={tagRef} onClose={handleCloseMenu} />
            <Spotlight open={open} onClose={handleClose} targetRef={tagRef} round={8}>
              <Tooltip
                open={open}
                onClose={handleClose}
                content="여기서 다크 모드를 설정하실 수 있어요!"
                centered={false}
                left={left}
                triangleLeft={triangleLeft}
                disableOnClose
              >
                <Tag
                  variant="transparent"
                  startIcon={<Icon name="UserOutlined" width={16} height={16} />}
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
                  <Hidden lgHidden>마이</Hidden>
                </Tag>
              </Tooltip>
            </Spotlight>
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
