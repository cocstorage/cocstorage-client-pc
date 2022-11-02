import { GetServerSidePropsContext } from 'next';

import Link from 'next/link';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { storageBoardsParamsDefault } from '@recoil/pages/storageBoards/atoms';

import { Alert, Flexbox, Icon } from 'cocstorage-ui';

import {
  StorageBoardsHead,
  StorageBoardsIntro,
  StorageBoardsNoticeDialog,
  StorageBoardsTabs
} from '@components/pages/storageBoards';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Footer, GoogleAdSense, Header } from '@components/UI/molecules';
import StorageBoardGrid from '@components/UI/organisms/StorageBoardGrid';

import { fetchStorageBoards } from '@api/v1/storage-boards';
import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoards() {
  return (
    <>
      <StorageBoardsHead />
      <GeneralTemplate header={<Header scrollFixedTrigger={false} />} footer={<Footer />}>
        <Flexbox gap={20} direction="vertical">
          <StorageBoardsIntro />
          <StorageBoardsTabs />
          <Link href="/notices/173">
            <Alert severity="info" icon={<Icon name="PinOutlined" width={16} height={16} />}>
              개념글 저장소 유사앱 관련 주의 안내
            </Alert>
          </Link>
          <StorageBoardGrid />
          <GoogleAdSense
            html={
              '<ins class="adsbygoogle"\n' +
              '     style="display:block"\n' +
              '     data-ad-client="ca-pub-5809905264951057"\n' +
              '     data-ad-slot="2500107460"\n' +
              '     data-ad-format="auto"\n' +
              '     data-full-width-responsive="true"></ins>'
            }
          />
        </Flexbox>
      </GeneralTemplate>
      <StorageBoardsNoticeDialog />
    </>
  );
}

export async function getServerSideProps({ req, res, query }: GetServerSidePropsContext) {
  const isGoBack = req.cookies.isGoBack ? JSON.parse(req.cookies.isGoBack) : false;
  if (isGoBack) {
    res.setHeader('Set-Cookie', 'isGoBack=false;path=/');

    return {
      props: {}
    };
  }

  try {
    const queryClient = new QueryClient();
    const path = String(query.path);

    await queryClient.fetchQuery(queryKeys.storages.storageById(path), () => fetchStorage(path));
    await queryClient.fetchQuery(
      queryKeys.storageBoards.storageBoardsByIdWithParams(path, storageBoardsParamsDefault),
      () => fetchStorageBoards(path, storageBoardsParamsDefault)
    );

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
}

export default StorageBoards;
