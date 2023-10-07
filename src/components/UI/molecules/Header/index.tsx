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

import {
  Avatar,
  Box,
  Button,
  Flexbox,
  Image,
  Spotlight,
  TextBar,
  Tooltip,
  Typography,
  useTheme
} from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import { useRecoilState, useSetRecoilState } from 'recoil';

import SystemMenu from '@components/UI/molecules/SystemMenu';
import { useStorageData } from '@hooks/query/useStorage';
import useScrollTrigger from '@hooks/useScrollTrigger';
import {
  commonFeedbackDialogState,
  commonOnBoardingDefault,
  commonOnBoardingState
} from '@recoil/common/atoms';

import { HeaderInner, StyledHeader } from './Header.styles';

interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {
  scrollFixedTrigger?: boolean;
}

function Header({ scrollFixedTrigger = false, ...props }: HeaderProps) {
  const router = useRouter();
  const { query } = router;

  const [left, setLeft] = useState(0);
  const [triangleLeft, setTriangleLeft] = useState(0);

  const [{ theme: { done = false } = {} }, setCommonOnBoardingState] =
    useRecoilState(commonOnBoardingState);
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const {
    theme: {
      palette: { box },
      breakpoints
    }
  } = useTheme();

  const { path, avatarUrl = '', name = '' } = useStorageData(String(query.path)) || {};

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [lgHidden, setLgHidden] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const isStorageBoardDetail = useMemo(
    () => router.pathname === '/storages/[path]/[id]',
    [router.pathname]
  );

  const headerRef = useRef<HTMLHeadElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    // TODO 추후 UI 라이브러리 내 Hook 작성
    const newLgHidden = window.matchMedia(`(max-width: ${breakpoints.lg}px)`).matches;
    setLgHidden(newLgHidden);
    if (buttonRef.current) {
      const { clientWidth } = buttonRef.current;
      setLeft(clientWidth - 192);
      setTriangleLeft(219 - clientWidth);
    }
  }, [breakpoints]);

  useEffect(() => {
    if (!done) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [done]);

  useEffect(() => {
    const newLgHidden = window.matchMedia(`(max-width: ${breakpoints.lg}px)`).matches;
    setLgHidden(newLgHidden);
    if (buttonRef.current) {
      const { clientWidth } = buttonRef.current;
      setLeft(clientWidth - 192);
      setTriangleLeft(219 - clientWidth);
    }
  }, [breakpoints]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <>
      <StyledHeader ref={headerRef} triggered={triggered} {...props}>
        <HeaderInner triggered={triggered}>
          {!isStorageBoardDetail && (
            <Link href="/">
              <Flexbox component="button" gap={8} alignment="center">
                {/* TODO Fallback 컴포넌트 렌더링 시 width 측정이 정상적이지 않은 문제 수정 */}
                <Image
                  width={34}
                  height={25.5}
                  src={`https://${process.env.IMAGE_DOMAIN}/assets/logo.png`}
                  alt="Logo Img"
                  disableAspectRatio
                  disableBackgroundColor
                />
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
                    fallback={{
                      name: 'ImageOutlined',
                      width: 20,
                      height: 20
                    }}
                  />
                  <Typography variant="h4" fontWeight="bold">
                    {name}
                  </Typography>
                </Flexbox>
              </Flexbox>
            </Link>
          )}
          <Flexbox
            onClick={handleClick}
            justifyContent={lgHidden ? 'flex-start' : 'center'}
            customStyle={{
              flexGrow: 1
            }}
          >
            <TextBar
              variant="fill"
              startIcon={<Icon name="SearchOutlined" />}
              value={value}
              onChange={handleChange}
              placeholder="검색"
              disabled
              customStyle={{
                minWidth: 260
              }}
            />
          </Flexbox>
          <Flexbox>
            <Flexbox gap={8}>
              <Link href="/">
                <Button startIcon={<Icon name="HomeOutlined" />}>홈</Button>
              </Link>
              <Link href="/storages">
                <Button startIcon={<Icon name="ListOutlined" />}>게시판</Button>
              </Link>
              <Button
                ref={buttonRef}
                startIcon={<Icon name="UserOutlined" />}
                onClick={handleOpenMenu}
              >
                마이
              </Button>
            </Flexbox>
            <SystemMenu open={menuOpen} anchorRef={buttonRef} onClose={handleCloseMenu} />
            <Spotlight open={open} onClose={handleClose} targetRef={buttonRef} round={8}>
              <Tooltip
                open={open}
                onClose={handleClose}
                content="여기서 다크 모드를 설정하실 수 있어요!"
                centered={false}
                left={left}
                triangleLeft={triangleLeft}
                disableOnClose
              >
                <Button startIcon={<Icon name="UserOutlined" />} onClick={handleOpenMenu}>
                  마이
                </Button>
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
