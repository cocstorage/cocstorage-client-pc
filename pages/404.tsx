import Head from 'next/head';
import { useRouter } from 'next/router';

import { Flexbox, useTheme } from 'cocstorage-ui';

import WideFlexibleTemplate from '@components/templeates/WideFlexibleTemplate';
import Message from '@components/UI/molecules/Message';

function Custom404() {
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
            title="페이지를 찾을 수 없어요."
            message="찾으시는 항목이 삭제되었거나,<br /> 잘못된 주소가 입력되었을 수 있어요."
            buttonText="홈으로"
            onClose={handleClose}
          />
        </Flexbox>
      </WideFlexibleTemplate>
    </>
  );
}

export default Custom404;
