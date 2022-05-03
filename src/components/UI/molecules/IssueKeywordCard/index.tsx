import React, { memo, HTMLAttributes } from 'react';

import { Tag, Typography, Badge, Icon, GenericComponentProps } from 'cocstorage-ui';

import { IssueKeyword } from '@dto/issue-keywords';

import { StyledIssueKeywordCard, Keyword } from './IssueKeywordCard.styles';

interface IssueKeywordCardProps
  extends Omit<
    GenericComponentProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'customStyle'
  > {
  issueKeyword: IssueKeyword;
  isTopTier?: boolean;
}

function IssueKeywordCard({
  componentRef,
  issueKeyword: { number, keyword, isNew, isUp, isDown },
  isTopTier = false,
  ...props
}: IssueKeywordCardProps) {
  return (
    <StyledIssueKeywordCard ref={componentRef} {...props}>
      <Tag
        color={isTopTier ? 'accent' : 'semiAccent'}
        text={String(number)}
        customStyle={{
          display: 'flex',
          justifyContent: 'center',
          width: 24,
          height: 24
        }}
      />
      <Keyword>
        <Typography component="div" fontWeight={700} lineHeight="18px">
          {keyword}
        </Typography>
      </Keyword>
      {isNew && <Badge severity="warning">NEW</Badge>}
      {isUp && (
        <Badge
          severity="success"
          startIcon={
            <Icon
              name="PolyGon_12_12"
              customStyle={{
                transform: 'rotate(180deg)'
              }}
            />
          }
        />
      )}
      {isDown && <Badge severity="error" startIcon={<Icon name="PolyGon_12_12" />} />}
    </StyledIssueKeywordCard>
  );
}

export default memo(IssueKeywordCard);
