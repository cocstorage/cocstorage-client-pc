import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { NoticeContent, NoticeHead } from '@components/pages/notice';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Footer, Header } from '@components/UI/molecules';
import { CommentForm, CommentList } from '@components/UI/organisms';

import { fetchNotice } from '@api/v1/notices';

import queryKeys from '@constants/queryKeys';

function Notice() {
  return (
    <>
      <NoticeHead />
      <GeneralTemplate header={<Header scrollFixedTrigger />} footer={<Footer />}>
        <NoticeContent />
        <CommentList type="notice" />
        <CommentForm type="notice" customStyle={{ margin: '35px 0 50px 0' }} />
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  try {
    const id = Number(query.id);
    const queryClient = new QueryClient();

    await queryClient.fetchQuery(queryKeys.notices.noticeById(id), () => fetchNotice(id));

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

export default Notice;
