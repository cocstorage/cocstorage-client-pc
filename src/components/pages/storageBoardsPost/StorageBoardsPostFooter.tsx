import { useRouter } from 'next/router';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  storageBoardsPostDialogOpenState,
  storageBoardsPostDraftIdState,
  storageBoardsPostEditorContentsState,
  storageBoardsPostSubjectState
} from '@recoil/pages/storageBoardsPost/atoms';

import { Button, Flexbox, Icon, useTheme } from 'cocstorage-ui';

function StorageBoardsPostFooter() {
  const router = useRouter();

  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  const draftId = useRecoilValue(storageBoardsPostDraftIdState);
  const subject = useRecoilValue(storageBoardsPostSubjectState);
  const editorContents = useRecoilValue(storageBoardsPostEditorContentsState);
  const setOpenState = useSetRecoilState(storageBoardsPostDialogOpenState);

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

export default StorageBoardsPostFooter;
