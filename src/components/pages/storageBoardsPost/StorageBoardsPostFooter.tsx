import { useRouter } from 'next/router';

import { Button, Flexbox, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  storageBoardsPostDialogOpenState,
  storageBoardsPostDraftIdState,
  storageBoardsPostEditorContentsState,
  storageBoardsPostSubjectState
} from '@recoil/pages/storageBoardsPost/atoms';

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
        size="big"
        startIcon={<Icon name="ArrowLeftOutlined" />}
        onClick={handleClickBack}
      >
        뒤로가기
      </Button>
      <Button
        variant="accent"
        size="big"
        startIcon={<Icon name="SendFilled" />}
        onClick={handleClick}
        disabled={!draftId || !subject || !editorContents.length}
      >
        등록
      </Button>
    </Flexbox>
  );
}

export default StorageBoardsPostFooter;
