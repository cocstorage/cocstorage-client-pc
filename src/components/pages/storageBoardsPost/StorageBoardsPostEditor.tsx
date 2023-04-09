import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { Editor, EditorContent } from '@cocstorage/ui-editor';
import { useMutation } from '@tanstack/react-query';

import { useRecoilState } from 'recoil';

import {
  storageBoardsPostDraftIdState,
  storageBoardsPostEditorContentsState
} from '@recoil/pages/storageBoardsPost/atoms';

import useStorage from '@hooks/query/useStorage';

import {
  postNonMemberStorageBoardDraft,
  postNonMemberStorageBoardImage
} from '@api/v1/storage-boards';

function StorageBoardsPostEditor() {
  const { query } = useRouter();

  const [draftId, setDraftIdState] = useRecoilState(storageBoardsPostDraftIdState);
  const [editorContents, setEditorContentsState] = useRecoilState(
    storageBoardsPostEditorContentsState
  );

  const { data: { id = 0 } = {}, isLoading } = useStorage(String(query.path), {
    enabled: !!query.path
  });

  const { mutate } = useMutation((storageId: number) => postNonMemberStorageBoardDraft(storageId), {
    onSuccess: ({ id: newDraftId }) => setDraftIdState(newDraftId)
  });

  const handleChange = (newEditorContents: EditorContent[]) =>
    setEditorContentsState(newEditorContents);

  const handleUploadImage = async (file: File | null) => {
    if (file) {
      const { imageUrl } = await postNonMemberStorageBoardImage(id, draftId, file);
      return imageUrl;
    }
    return '';
  };

  useEffect(() => {
    if (!isLoading && !draftId) {
      mutate(id);
    }
  }, [isLoading, id, mutate, draftId]);

  return (
    <Editor
      fullScreen
      hideLine
      initEditorContents={editorContents}
      onChange={handleChange}
      onUploadImage={handleUploadImage}
      customStyle={{
        marginTop: 20,
        padding: '0 20px',
        overflow: 'hidden'
      }}
      contentCustomStyle={{
        lineHeight: 1.75,
        overflowY: 'auto'
      }}
    />
  );
}

export default StorageBoardsPostEditor;
