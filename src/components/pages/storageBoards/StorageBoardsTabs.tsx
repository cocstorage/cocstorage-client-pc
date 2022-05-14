import { useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from 'react-query';

import styled, { CSSObject } from '@emotion/styled';

import { useRecoilState } from 'recoil';

import { storageBoardsParamsState } from '@recoil/boards/atoms';

import { Box, Button, Flexbox, Icon, Tab, Tabs } from 'cocstorage-ui';

import { RatioImage } from '@components/UI/atoms';
import { MessageDialog } from '@components/UI/organisms';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/react-query';

function StorageBoardsTabs() {
  const { query } = useRouter();

  const [params, setParams] = useRecoilState(storageBoardsParamsState);

  const [open, setOpen] = useState<boolean>(false);

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

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Wrapper scrollFixed={scrollFixed}>
        <Flexbox gap={30} alignment="center">
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
        </Flexbox>
        {scrollFixed && (
          <Button
            variant="accent"
            size="pico"
            startIcon={<Icon name="WriteOutlined" width={15} height={15} />}
            iconOnly
            onClick={handleClick}
            customStyle={{
              padding: 5
            }}
          />
        )}
      </Wrapper>
      {scrollFixed && (
        <Box customStyle={{ height: tabsRef.current ? tabsRef.current?.clientHeight : 40 }} />
      )}
      <MessageDialog
        open={open}
        title="준비 중인 기능이에요."
        message="조금만 기다려 주세요!"
        onClose={handleClose}
      />
    </>
  );
}

const Wrapper = styled.div<{
  scrollFixed: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 54px;
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.box.stroked.normal};
  background-color: ${({ theme: { palette } }) => palette.background.bg};

  ${({ scrollFixed }): CSSObject =>
    scrollFixed
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
          padding: '0 20px',
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
