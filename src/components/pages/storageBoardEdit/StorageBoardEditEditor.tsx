import { ChangeEvent } from 'react';

import { useRouter } from 'next/router';

import { Editor, EditorContent } from 'cocstorage-ui-editor';

import styled, { CSSObject } from '@emotion/styled';

import { useRecoilState } from 'recoil';

import {
  storageBoardEditEditorContentsState,
  storageBoardEditSubjectState
} from '@recoil/pages/storageBoardEdit/atoms';

import { Flexbox } from 'cocstorage-ui';

import useStorage from '@hooks/query/useStorage';

import { postNonMemberStorageBoardImage } from '@api/v1/storage-boards';

function StorageBoardEditEditor() {
  const { query } = useRouter();

  const [subject, setSubjectState] = useRecoilState(storageBoardEditSubjectState);
  const [editorContents, setEditorContentsState] = useRecoilState(
    storageBoardEditEditorContentsState
  );

  const { data: { id = 0 } = {} } = useStorage(String(query.path), {
    enabled: !!query.path
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSubjectState(event.currentTarget.value);

  const handleChangeContent = (newEditorContents: EditorContent[]) =>
    setEditorContentsState(newEditorContents);

  const handleUploadImage = async (file: File | null) => {
    if (file) {
      const { imageUrl } = await postNonMemberStorageBoardImage(id, Number(query.id), file);
      return imageUrl;
    }
    return '';
  };

  return (
    <Flexbox direction="vertical" customStyle={{ height: '100%', padding: '0 20px' }}>
      <Input
        onChange={handleChange}
        value={subject}
        placeholder="제목을 입력해 주세요."
        autoFocus
      />
      <Editor
        onChange={handleChangeContent}
        onUploadImage={handleUploadImage}
        initEditorContents={editorContents}
        fullScreen
        hideLine
        customStyle={{
          marginTop: 20
        }}
        contentCustomStyle={{
          lineHeight: 1.75
        }}
      />
    </Flexbox>
  );
}

const Input = styled.input`
  width: 100%;
  margin-left: 8px;
  border: none;
  outline: 0;
  background: none;
  ${({
    theme: {
      typography: { h1 }
    }
  }): CSSObject => ({
    fontSize: h1.size,
    fontWeight: h1.weight.bold,
    letterSpacing: h1.letterSpacing
  })}
  color: ${({
    theme: {
      mode,
      palette: { text }
    }
  }) => text[mode].main};

  &::placeholder {
    color: ${({
      theme: {
        mode,
        palette: { text }
      }
    }) => text[mode].text1};
  }
`;

export default StorageBoardEditEditor;
