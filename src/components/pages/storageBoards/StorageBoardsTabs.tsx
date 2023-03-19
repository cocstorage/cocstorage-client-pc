import { useRef } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import styled, { CSSObject } from '@emotion/styled';

import { useRecoilState } from 'recoil';

import { storageBoardsParamsStateFamily } from '@recoil/pages/storageBoards/atoms';

import { Avatar, Box, Button, Flexbox, Icon, Tab, Tabs, useTheme } from 'cocstorage-ui';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardsTabs() {
  const router = useRouter();
  const { path } = router.query;

  const {
    theme: {
      breakpoints: { xl }
    }
  } = useTheme();

  const [{ params }, setParams] = useRecoilState(storageBoardsParamsStateFamily(String(path)));

  const tabsRef = useRef<HTMLDivElement>(null);

  const { triggered } = useScrollTrigger({ trigger: true, ref: tabsRef });

  const { data: { avatarUrl } = {} } = useQuery(queryKeys.storages.storageById(String(path)), () =>
    fetchStorage(String(path))
  );

  const handleChange = (value: number | string) =>
    setParams((prevParams) => ({
      path: prevParams.path,
      params: {
        ...prevParams.params,
        page: 1,
        orderBy: String(value)
      }
    }));

  const handleClick = () => router.push(`/storages/${path}/post`);

  return (
    <>
      <Wrapper triggered={triggered}>
        <Flexbox
          justifyContent="space-between"
          alignment="center"
          customStyle={{ width: '100%', maxWidth: xl - 40, margin: 'auto' }}
        >
          <Flexbox
            gap={30}
            alignment="center"
            customStyle={{
              flexGrow: 1
            }}
          >
            {triggered && (
              <Avatar
                width={24}
                height={24}
                round={6}
                src={avatarUrl || ''}
                alt="Storage Logo Img"
              />
            )}
            <Tabs
              ref={tabsRef}
              fullWidth
              onChange={handleChange}
              value={params.orderBy || 'latest'}
              hideLine={triggered}
            >
              <Tab text="최신" value="latest" />
              <Tab text="베스트" value="popular" />
              <Tab text="워스트" value="worst" />
            </Tabs>
          </Flexbox>
          {triggered && (
            <Button
              variant="accent"
              size="pico"
              startIcon={<Icon name="WriteFilled" />}
              iconOnly
              onClick={handleClick}
            />
          )}
        </Flexbox>
      </Wrapper>
      {triggered && (
        <Box
          customStyle={{
            minHeight: tabsRef.current ? tabsRef.current?.clientHeight : 41
          }}
        />
      )}
    </>
  );
}

const Wrapper = styled.section<{
  triggered: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;

  ${({
    theme: {
      palette: { box }
    },
    triggered
  }): CSSObject =>
    triggered
      ? {
          borderBottom: `1px solid ${box.stroked.normal}`
        }
      : {}};

  background-color: ${({
    theme: {
      palette: { background }
    }
  }) => background.bg};

  ${({ triggered }): CSSObject =>
    triggered
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          marginTop: 0,
          padding: '0 20px',
          zIndex: 2,
          animation: 'slideDown .2s forwards'
        }
      : {}}

  @keyframes slideDown {
    from {
      transform: translateY(-40px);
    }

    to {
      transform: translateY(0);
    }
  }
`;

export default StorageBoardsTabs;
