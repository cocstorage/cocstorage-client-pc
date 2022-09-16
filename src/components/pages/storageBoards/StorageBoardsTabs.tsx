import { useRef } from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import styled, { CSSObject } from '@emotion/styled';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';
import { storageBoardsParamsStateFamily } from '@recoil/storageBoards/atoms';

import { Box, Button, Flexbox, Icon, Image, Tab, Tabs, useTheme } from 'cocstorage-ui';

import useScrollTrigger from '@hooks/useScrollTrigger';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardsTabs() {
  const { query } = useRouter();
  const { path } = query;

  const {
    theme: {
      breakpoints: { xl }
    }
  } = useTheme();

  const [{ params }, setParams] = useRecoilState(storageBoardsParamsStateFamily(String(path)));

  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const tabsRef = useRef<HTMLDivElement>(null);

  const { triggered } = useScrollTrigger({ trigger: true, ref: tabsRef });

  const { data: { avatarUrl } = {} } = useQuery(queryKeys.storages.storageById(String(path)), () =>
    fetchStorage(String(path))
  );

  const handleChange = (value: number | string) => {
    setParams((prevParams) => ({
      path: prevParams.path,
      params: {
        ...prevParams.params,
        page: 1,
        orderBy: String(value)
      }
    }));
  };

  const handleClick = () =>
    setCommonFeedbackDialogState({
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    });

  return (
    <>
      <Wrapper triggered={triggered}>
        <Flexbox
          justifyContent="space-between"
          alignment="center"
          customStyle={{ width: '100%', maxWidth: xl - 40, margin: 'auto' }}
        >
          <Flexbox gap={30} alignment="center">
            {triggered && (
              <Image
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
          {triggered && (
            <Button
              variant="accent"
              size="pico"
              startIcon={<Icon name="WriteOutlined" width={15} height={15} />}
              iconOnly
              onClick={handleClick}
              customStyle={{
                height: 'fit-content',
                padding: 5
              }}
            />
          )}
        </Flexbox>
      </Wrapper>
      {triggered && (
        <Box customStyle={{ height: tabsRef.current ? tabsRef.current?.clientHeight : 40 }} />
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
  padding: 0 54px;
  border-bottom: 1px solid ${({ theme: { palette } }) => palette.box.stroked.normal};
  background-color: ${({ theme: { palette } }) => palette.background.bg};

  ${({ triggered }): CSSObject =>
    triggered
      ? {
          position: 'fixed',
          top: 0,
          left: 0,
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
