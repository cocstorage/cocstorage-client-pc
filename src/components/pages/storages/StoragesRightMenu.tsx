import { SideAccordion, StorageCard } from '@components/UI/molecules';

function StoragesRightMenu() {
  return (
    <SideAccordion title="즐겨찾는 게시판">
      <StorageCard
        src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
        name="인터넷 방송"
      />
      <StorageCard
        src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
        name="스트리머"
      />
      <StorageCard
        src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
        name="인터넷 방송"
      />
      <StorageCard
        src="https://static.cocstorage.com/images/zksw76puo6l255o5sabljom0gw8l"
        name="스트리머"
      />
      <StorageCard
        src="https://static.cocstorage.com/images/xt868xt2w6i50bf4x98xdsbfado3"
        name="인터넷 방송"
      />
    </SideAccordion>
  );
}

export default StoragesRightMenu;
