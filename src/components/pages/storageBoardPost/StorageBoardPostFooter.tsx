import { useRouter } from 'next/router';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  storageBoardPostDialogOpenState,
  storageBoardPostDraftIdState,
  storageBoardPostEditorContentsState,
  storageBoardPostSubjectState
} from '@recoil/pages/storageBoardPost/atoms';

import { Button, Flexbox, Icon, useTheme } from 'cocstorage-ui';

function StorageBoardPostFooter() {
  const router = useRouter();

  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  const draftId = useRecoilValue(storageBoardPostDraftIdState);
  const subject = useRecoilValue(storageBoardPostSubjectState);
  const editorContents = useRecoilValue(storageBoardPostEditorContentsState);
  const setOpenState = useSetRecoilState(storageBoardPostDialogOpenState);

  const handleClick = () => setOpenState(true);

  const handleClickBack = () => router.back();

  return (
    <Flexbox
      justifyContent="space-between"
      customStyle={{
        padding: 20,
        borderTop: `1px solid ${box.filled.normal}`
      }}
    >
      <Button
        variant="transparent"
        startIcon={<Icon name="ArrowLeftOutlined" />}
        onClick={handleClickBack}
      >
        뒤로가기
      </Button>
      <Button
        variant="accent"
        startIcon={<Icon name="SendFilled" width={18} height={18} />}
        onClick={handleClick}
        disabled={!draftId || !subject || !editorContents.length}
      >
        등록
      </Button>
    </Flexbox>
  );
}

export default StorageBoardPostFooter;
