import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  ChangeEvent,
  HTMLAttributes
} from 'react';

import { useTheme, Typography, TextBar, Icon, Tag, Flexbox, Box } from 'cocstorage-ui';

import { StyledHeader, HeaderInner, Logo } from './Header.styles';

interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {
  scrollFixedTrigger?: boolean;
}

function Header({ scrollFixedTrigger, ...props }: HeaderProps) {
  const {
    theme,
    theme: { type, palette }
  } = useTheme();

  const [scrollFixed, setScrollFixed] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const headerRef = useRef<HTMLHeadElement | null>(null);

  const handleScroll = useCallback(() => {
    if (!headerRef.current) return;

    const { top = 0 } = headerRef.current?.getBoundingClientRect() || {};
    const { scrollY } = window;
    const { scrollTop } = document.documentElement;

    if (top + scrollY < scrollTop && !scrollFixed) {
      setScrollFixed(true);
    } else if (scrollTop <= 0 && scrollFixed) {
      setScrollFixed(false);
    }
  }, [scrollFixed]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value),
    []
  );

  useEffect(() => {
    if (scrollFixedTrigger) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollFixedTrigger) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollFixedTrigger, handleScroll]);

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
      {scrollFixed && (
        <Box customStyle={{ height: headerRef.current ? headerRef.current?.clientHeight : 73 }} />
      )}
    </>
  );
}

export default Header;
