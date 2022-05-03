import React, { HTMLAttributes, memo } from 'react';

import { Flexbox, GenericComponentProps } from 'cocstorage-ui';

import { SideAccordion, StorageCard } from '@components/UI/molecules';

type IndexPopularStoragesProps = Omit<
  GenericComponentProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'customStyle'
>;

function IndexPopularStorages({ componentRef }: IndexPopularStoragesProps) {
  return (
    <Flexbox
      componentRef={componentRef}
      direction="vertical"
      gap={30}
      customStyle={{ minWidth: 183 }}
    >
      <SideAccordion title="인기 게시판">
        <StorageCard
          src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
          name="인터넷 방송"
        />
        <StorageCard
          src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
          name="스트리머"
        />
      </SideAccordion>
    </Flexbox>
  );
}

export default memo(IndexPopularStorages);
