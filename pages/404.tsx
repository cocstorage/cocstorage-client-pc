import { useRouter } from 'next/router';

import { Box } from 'cocstorage-ui';

import Message from '@components/UI/molecules/Message';

function Custom404() {
  const router = useRouter();

  const handleClose = () => router.push('/');

  return (
    <Box
      customStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
      }}
    >
      <Message
        title="페이지를 찾을 수 없어요."
        message="찾으시는 항목이 삭제되었거나,<br /> 잘못된 주소가 입력되었을 수 있어요."
        buttonText="홈으로"
        onClose={handleClose}
      />
    </Box>
  );
}

export default Custom404;