import { GetServerSidePropsContext } from 'next';

import { useRouter } from 'next/router';

import { QueryClient, dehydrate } from 'react-query';

import { NoticeContent, NoticeHead } from '@components/pages/notice';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Footer, Header } from '@components/UI/molecules';
import { CommentForm, CommentList } from '@components/UI/organisms';

import { fetchNotice } from '@api/v1/notices';

import queryKeys from '@constants/react-query';

function Notice() {
  const {
    query: { id = 0 }
  } = useRouter();
  return (
    <>
      <NoticeHead />
      <GeneralTemplate header={<Header scrollFixedTrigger />} footer={<Footer />}>
        <NoticeContent />
        {id && (
          <>
            <CommentList type="notice" id={Number(id)} />
            <CommentForm type="notice" id={Number(id)} customStyle={{ margin: '35px 0 50px 0' }} />
          </>
        )}
      </GeneralTemplate>
    </>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  try {
    const id = Number(query.id);
    const queryClient = new QueryClient();

    const notice = await fetchNotice(id);

    queryClient.setQueryData(queryKeys.notices.noticeById(id), notice);

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

export default Notice;
