import { ChangeEvent } from 'react';

import styled, { CSSObject } from '@emotion/styled';
import { useRecoilState } from 'recoil';

import { storageBoardsPostSubjectState } from '@recoil/pages/storageBoardsPost/atoms';

function StorageBoardsPostSubjectInput() {
  const [subject, setSubjectState] = useRecoilState(storageBoardsPostSubjectState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSubjectState(event.currentTarget.value);

  return (
    <Input
      onChange={handleChange}
      value={subject}
      placeholder="제목을 입력해 주세요."
      autoFocus
      maxLength={150}
    />
  );
}

const Input = styled.input`
  width: 100%;
  padding: 0 28px;
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

export default StorageBoardsPostSubjectInput;
