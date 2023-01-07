import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';

import { useRecoilValue, useResetRecoilState } from 'recoil';

import {
  storageBoardEditEditorContentsState,
  storageBoardEditNicknameState,
  storageBoardEditPasswordState,
  storageBoardEditSubjectState
} from '@recoil/pages/storageBoardEdit/atoms';

import { Button, Flexbox, Icon, useTheme } from 'cocstorage-ui';

import useStorage from '@hooks/query/useStorage';

import { PutStorageBoardData, putNonMemberStorageBoard } from '@api/v1/storage-boards';

function StorageBoardEditFooter() {
  const router = useRouter();
  const { path, id } = router.query;

  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  const nickname = useRecoilValue(storageBoardEditNicknameState);
  const password = useRecoilValue(storageBoardEditPasswordState);
  const subject = useRecoilValue(storageBoardEditSubjectState);
  const editorContents = useRecoilValue(storageBoardEditEditorContentsState);
  const resetNickname = useResetRecoilState(storageBoardEditNicknameState);
  const resetPassword = useResetRecoilState(storageBoardEditPasswordState);
  const resetSubject = useResetRecoilState(storageBoardEditSubjectState);
  const resetEditorContents = useResetRecoilState(storageBoardEditEditorContentsState);

  const { data: { id: storageId = 0 } = {} } = useStorage(String(path), {
    enabled: !!path
  });

  const { mutate, isLoading } = useMutation(
    ({
      storageId: newStorageId,
      id: newId,
      data
    }: {
      storageId: number;
      id: number;
      data: PutStorageBoardData;
    }) => putNonMemberStorageBoard(newStorageId, newId, data),
    {
      onSuccess: ({ id: storageBoardId }) => {
        router.push(`/storages/${path}/${storageBoardId}`).then(() => {
          resetNickname();
          resetPassword();
          resetSubject();
          resetEditorContents();
        });
      }
    }
  );

  const handleClickBack = () => router.back();

  const handleClick = () => {
    mutate({
      storageId,
      id: Number(id),
      data: {
        nickname,
        password,
        subject,
        content_json: JSON.stringify(editorContents),
        description: editorContents
          .map(({ children }) =>
            children.filter(({ tag }) => tag === '#text').map(({ content }) => content)
          )
          .filter((contents) => contents.length)
          .join(' ')
      }
    });
  };

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
        startIcon={<Icon name="WriteOutlined" width={18} height={18} />}
        onClick={handleClick}
        disabled={!nickname || !password || !subject || !editorContents.length || isLoading}
      >
        완료
      </Button>
    </Flexbox>
  );
}

export default StorageBoardEditFooter;
