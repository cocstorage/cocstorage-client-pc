import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import styled, { CSSObject } from '@emotion/styled';

import { useQuery } from 'react-query';

import { useRecoilState } from 'recoil';
import { storageBoardParamsState } from '@recoil/storageBoards/atoms';

import { useTheme, Tabs, Tab, Box } from 'cocstorage-ui';

import { RatioImage } from '@components/UI/atoms';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { fetchStorage } from '@api/v1/storages';
import queryKeys from '@constants/react-query';

function StorageBoardsTabs() {
  const { query } = useRouter();

  const { theme } = useTheme();

  const [params, setParams] = useRecoilState(storageBoardParamsState);

  const tabsRef = useRef<HTMLDivElement | null>(null);

  const { scrollFixed } = useScrollTrigger({ trigger: true, ref: tabsRef });

  const { data: { avatarUrl } = {} } = useQuery(
    queryKeys.storages.storageById(query.path as string),
    () => fetchStorage(query.path as string)
  );

  const handleChange = (value: number | string) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: 1,
      orderBy: String(value)
    }));
  };

  return (
    <>
      <Wrapper theme={theme} scrollFixed={scrollFixed}>
        {scrollFixed && (
          <RatioImage
            width={24}
            height={24}
            round={6}
            src={avatarUrl || ''}
            alt="Storage Logo Img"
          />
        )}
        <Tabs ref={tabsRef} onChange={handleChange} value={params.orderBy || 'latest'}>
          <Tab text="최신" value="latest" />
          <Tab text="베스트" value="popular" />
          <Tab text="워스트" value="worst" />
        </Tabs>
      </Wrapper>
      {scrollFixed && (
        <Box customStyle={{ height: tabsRef.current ? tabsRef.current?.clientHeight : 40 }} />
      )}
    </>
  );
}

const Wrapper = styled.div<{
  scrollFixed: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 30px;
  width: 100%;
  border-bottom: 1px solid transparent;
  background-color: ${({ theme: { palette } }) => palette.background.bg};

  ${({ theme: { palette }, scrollFixed }): CSSObject =>
    scrollFixed
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          padding: '0 20px',
          borderColor: palette.box.stroked.normal,
          zIndex: 1,
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
