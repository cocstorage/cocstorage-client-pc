import { useState } from 'react';

import { useRouter } from 'next/router';

import { Avatar, Button, Flexbox, Tab, Tabs, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import styled, { CSSObject } from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';

import { fetchStorage } from '@api/v1/storages';
import queryKeys from '@constants/queryKeys';
import useScrollTrigger from '@hooks/useScrollTrigger';
import { storageBoardsParamsStateFamily } from '@recoil/pages/storageBoards/atoms';

function StorageBoardsTabs() {
  const router = useRouter();
  const { path } = router.query;

  const {
    theme: {
      breakpoints: { xl }
    }
  } = useTheme();

  const [{ params }, setParams] = useRecoilState(storageBoardsParamsStateFamily(String(path)));

  const [tabsRef, setTabsRef] = useState<HTMLDivElement>();

  const { triggered } = useScrollTrigger({ trigger: true, ref: tabsRef });

  const { data: { avatarUrl } = {} } = useQuery(queryKeys.storages.storageById(String(path)), () =>
    fetchStorage(String(path))
  );

  const handleTabsRef = (ref?: HTMLDivElement | null) => {
    if (!tabsRef && ref) {
      setTabsRef(ref);
    }
  };

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
      <div ref={handleTabsRef} />
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
    </>
  );
}

const Wrapper = styled.section<{
  triggered: boolean;
}>`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  z-index: 1;

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
`;

export default StorageBoardsTabs;
