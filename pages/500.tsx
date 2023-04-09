import Head from 'next/head';
import { useRouter } from 'next/router';

import { Flexbox, useTheme } from '@cocstorage/ui';

import WideFlexibleTemplate from '@components/templeates/WideFlexibleTemplate';
import Message from '@components/UI/molecules/Message';

function Custom500() {
  const router = useRouter();

  const {
    theme: {
      palette: { background }
    }
  } = useTheme();

  const handleClose = () => router.push('/');

  return (
    <>
      <Head>
        <meta name="theme-color" content={background.bg} />
      </Head>
      <WideFlexibleTemplate>
        <Flexbox
          alignment="center"
          justifyContent="center"
          customStyle={{
            flex: 1
          }}
        >
          <Message
            title="알 수 없는 오류가 발생했어요."
            message="요청을 처리하지 못했어요.<br />잠시 후에 다시 시도해 주세요!"
            buttonText="홈으로"
            onClose={handleClose}
          />
        </Flexbox>
      </WideFlexibleTemplate>
    </>
  );
}

export default Custom500;
