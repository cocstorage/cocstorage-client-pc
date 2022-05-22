import { QueryClient, dehydrate } from 'react-query';

import { noticesParamsDefault } from '@recoil/notices/atoms';

import { Flexbox, Typography } from 'cocstorage-ui';

import NoticesGrid from '@components/pages/notices/NoticesGrid';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Footer, Header } from '@components/UI/molecules';

import { fetchNotices } from '@api/v1/notices';

import queryKeys from '@constants/react-query';

function Notices() {
  return (
    <GeneralTemplate header={<Header scrollFixedTrigger />} footer={<Footer />}>
      <Flexbox gap={20} direction="vertical">
        <Typography fontSize="24px" fontWeight={700} lineHeight="30px">
          새로운 소식
        </Typography>
        <NoticesGrid />
      </Flexbox>
    </GeneralTemplate>
  );
}

export async function getServerSideProps() {
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
