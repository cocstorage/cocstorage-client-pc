import { ChangeEvent, useState } from 'react';

import styled from '@emotion/styled';

import { Button, Flexbox, Icon, TextBar, useTheme } from 'cocstorage-ui';

function CommentForm() {
  const {
    theme: {
      palette: { box }
    }
  } = useTheme();

  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <Flexbox
      gap={20}
      customStyle={{
        flexGrow: 1
      }}
    >
      <Flexbox gap={8} direction="vertical" justifyContent="space-between">
        <TextBar
          size="small"
          value={value}
          onChange={handleChange}
          customStyle={{
            borderColor: box.stroked.normal
          }}
        />
        <TextBar
          type="password"
          size="small"
          value={value}
          onChange={handleChange}
          customStyle={{
            borderColor: box.stroked.normal
          }}
        />
      </Flexbox>
      <CommentBar>
        <CommentTextArea placeholder="내용을 입력해주세요.">CommentTextArea</CommentTextArea>
        <Button
          startIcon={<Icon name="SendFilled" width={18} height={18} />}
          customStyle={{
            margin: '17px 12px 17px 0'
          }}
          disabled
        >
          작성
        </Button>
      </CommentBar>
    </Flexbox>
  );
}

const CommentBar = styled.div`
  flex-grow: 1;
  display: flex;
  max-height: 80px;
  border: 1px solid ${({ theme: { palette } }) => palette.box.stroked.normal};
  border-radius: 10px;
  overflow: hidden;
`;

const CommentTextArea = styled.textarea`
  flex-grow: 1;
  padding: 12px;
  border: none;
  resize: none;
  outline: 0;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme: { type, palette } }) => palette.text[type].main};

  &::placeholder {
    color: ${({ theme: { type, palette } }) => palette.text[type].text1};
  }
`;

export default CommentForm;
