import { CustomStyle } from 'cocstorage-ui';

import { SideAccordion, StorageCard } from '@components/UI/molecules';

interface SidePopularStorageListProps {
  customStyle?: CustomStyle;
}

function SidePopularStorageListProps({ customStyle }: SidePopularStorageListProps) {
  return (
    <SideAccordion title="인기 게시판" css={customStyle}>
      <StorageCard
        src={`https://${process.env.IMAGE_DOMAIN}/images/xt868xt2w6i50bf4x98xdsbfado3`}
        path="ibroadcast"
        name="인터넷 방송"
      />
      <StorageCard
        src={`https://${process.env.IMAGE_DOMAIN}/images/zksw76puo6l255o5sabljom0gw8l`}
        path="streamer"
        name="스트리머"
      />
      <StorageCard
        src={`https://${process.env.IMAGE_DOMAIN}/images/uvx4jiy4ur5hm0t0vpbqb3lw1qq9`}
        path="baseball"
        name="야구"
      />
      <StorageCard
        src={`https://${process.env.IMAGE_DOMAIN}/images/on6nrgp7utess2qf3lyj8ry921tm`}
        path="hotissue"
        name="핫이슈"
      />
      <StorageCard
        src={`https://${process.env.IMAGE_DOMAIN}/images/58l159jwcs71iwkdx0kh4reg5ra6`}
        path="bitcoins"
        name="비트코인"
      />
    </SideAccordion>
  );
}

export default SidePopularStorageListProps;
