import Link from 'next/link';

import { SideAccordion, StorageCard } from '@components/UI/molecules';

function SitePopularStorageList() {
  return (
    <SideAccordion title="인기 게시판">
      <Link href="/storages/ibroadcast">
        <a>
          <StorageCard
            src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
            name="인터넷 방송"
          />
        </a>
      </Link>
      <Link href="/storages/streamer">
        <a>
          <StorageCard
            src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
            name="스트리머"
          />
        </a>
      </Link>
      <Link href="/storages/baseball">
        <a>
          <StorageCard
            src="https://static.cocstorage.com/images/uvx4jiy4ur5hm0t0vpbqb3lw1qq9"
            name="야구"
          />
        </a>
      </Link>
      <Link href="/storages/hotissue">
        <a>
          <StorageCard
            src="https://static.cocstorage.com/images/on6nrgp7utess2qf3lyj8ry921tm"
            name="핫이슈"
          />
        </a>
      </Link>
      <Link href="/storages/bitcoins">
        <a>
          <StorageCard
            src="https://static.cocstorage.com/images/58l159jwcs71iwkdx0kh4reg5ra6"
            name="비트코인"
          />
        </a>
      </Link>
    </SideAccordion>
  );
}

export default SitePopularStorageList;
