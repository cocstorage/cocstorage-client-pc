import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import {
  StorageBoardPostDialog,
  StorageBoardPostEditor,
  StorageBoardPostFooter,
  StorageBoardPostHeader
} from '@components/pages/storageBoardPost';
import WideFlexibleTemplate from '@components/templeates/WideFlexibleTemplate';

import { fetchStorage } from '@api/v1/storages';

import queryKeys from '@constants/queryKeys';

function StorageBoardPost() {
  return (
    <WideFlexibleTemplate header={<StorageBoardPostHeader />} footer={<StorageBoardPostFooter />}>
      <StorageBoardPostEditor />
      <StorageBoardPostDialog />
    </WideFlexibleTemplate>
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

export default StorageBoardPost;
