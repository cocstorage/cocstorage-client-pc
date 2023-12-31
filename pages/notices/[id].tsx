import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from '@tanstack/react-query';

import { fetchNotice } from '@api/v1/notices';
import { NoticeContent, NoticeHead } from '@components/pages/notice';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Footer, Header } from '@components/UI/molecules';
import { CommentForm, CommentList } from '@components/UI/organisms';
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

export async function getServerSideProps({ req, res, query }: GetServerSidePropsContext) {
  const isGoBack = req.cookies.isGoBack ? JSON.parse(req.cookies.isGoBack) : false;
  if (isGoBack) {
    res.setHeader('Set-Cookie', 'isGoBack=false;path=/');

    return {
      props: {}
    };
  }

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
