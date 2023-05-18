import { useRouter } from 'next/router';

import Editor, { EditorContent } from '@cocstorage/ui-editor';

import { useRecoilState } from 'recoil';

import { storageBoardEditEditorContentsState } from '@recoil/pages/storageBoardEdit/atoms';

import useStorage from '@hooks/query/useStorage';

import { postNonMemberStorageBoardImage } from '@api/v1/storage-boards';

function StorageBoardEditEditor() {
  const { query } = useRouter();

  const [editorContents, setEditorContentsState] = useRecoilState(
    storageBoardEditEditorContentsState
  );

  const { data: { id = 0 } = {} } = useStorage(String(query.path), {
    enabled: !!query.path
  });

  const handleChange = (newEditorContents: EditorContent[]) =>
    setEditorContentsState(newEditorContents);

  const handleUploadImage = async (file: File | null) => {
    if (file) {
      const { imageUrl } = await postNonMemberStorageBoardImage(id, Number(query.id), file);
      return imageUrl;
    }
    return '';
  };

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
        lineHeight: 1.75
      }}
    />
  );
}

export default StorageBoardEditEditor;
