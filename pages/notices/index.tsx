import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { noticesParamsDefault } from '@recoil/pages/notices/atoms';

import { Flexbox, Typography } from 'cocstorage-ui';

import { NoticesGrid, NoticesHead } from '@components/pages/notices';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Footer, Header } from '@components/UI/molecules';

import { fetchNotices } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function Notices() {
  return (
    <>
      <NoticesHead />
      <GeneralTemplate header={<Header scrollFixedTrigger />} footer={<Footer />}>
        <Flexbox gap={20} direction="vertical">
          <Typography variant="h1" fontWeight="bold">
            새로운 소식
          </Typography>
          <NoticesGrid />
        </Flexbox>
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const isGoBack = req.cookies.isGoBack ? JSON.parse(req.cookies.isGoBack) : false;
  if (isGoBack) {
    res.setHeader('Set-Cookie', 'isGoBack=false;path=/');

    return {
      props: {}
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryKeys.notices.noticesWithParams(noticesParamsDefault), () =>
    fetchNotices(noticesParamsDefault)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
}

export default Notices;
