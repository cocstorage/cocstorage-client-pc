import { Box, Dialog } from '@cocstorage/ui';
import { useRecoilState } from 'recoil';

import Message from '@components/UI/molecules/Message';
import { commonFeedbackDialogState } from '@recoil/common/atoms';

function FeedbackDialog() {
  const [{ open, title, code, message }, setCommonFeedbackDialogState] =
    useRecoilState(commonFeedbackDialogState);

  const handleClose = () =>
    setCommonFeedbackDialogState((prevState) => ({
      ...prevState,
      open: false
    }));

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box customStyle={{ padding: 16 }}>
        <Message title={title} code={code} message={message} onClose={handleClose} />
      </Box>
    </Dialog>
  );
}

export default FeedbackDialog;
