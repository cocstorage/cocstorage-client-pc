import { GetServerSidePropsContext } from 'next';

import { QueryClient, dehydrate } from 'react-query';

import { Alert, Icon } from 'cocstorage-ui';

import { NoticeHead } from '@components/pages/notice';
import NoticeContent from '@components/pages/notice/NoticeContent';
import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Footer, Header } from '@components/UI/molecules';

import { fetchNotice } from '@api/v1/notices';

import queryKeys from '@constants/react-query';

function Notice() {
  return (
    <>
      <NoticeHead />
      <GeneralTemplate header={<Header scrollFixedTrigger />} footer={<Footer />}>
        <NoticeContent />
        <Alert icon={<Icon name="BulbOutlined" />}>
          새로운 소식의 댓글/답글 기능은 준비 중이에요. 조금만 기다려 주세요!
        </Alert>
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
