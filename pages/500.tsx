import Head from 'next/head';
import { useRouter } from 'next/router';

import { Box, useTheme } from 'cocstorage-ui';

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
      <Box
        component="main"
        customStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Message
          title="알 수 없는 오류가 발생했어요."
          message="요청을 처리하지 못했어요.<br />잠시 후에 다시 시도해 주세요!"
          buttonText="홈으로"
          onClose={handleClose}
        />
      </Box>
    </>
  );
}

export default Custom500;
