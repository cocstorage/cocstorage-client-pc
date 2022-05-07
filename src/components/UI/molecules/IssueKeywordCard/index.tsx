import React, { memo, ButtonHTMLAttributes } from 'react';

import { Tag, Typography, Badge, Icon } from 'cocstorage-ui';

import { IssueKeyword } from '@dto/issue-keywords';

import { StyledIssueKeywordCard, Keyword } from './IssueKeywordCard.styles';

interface IssueKeywordCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  issueKeyword: IssueKeyword;
  isTopTier?: boolean;
}

function IssueKeywordCard({
  issueKeyword: { number, keyword, isNew, isUp, isDown },
  isTopTier = false,
  ...props
}: IssueKeywordCardProps) {
  return (
    <StyledIssueKeywordCard {...props}>
      <Tag
        color={isTopTier ? 'accent' : 'semiAccent'}
        customStyle={{
          display: 'flex',
          justifyContent: 'center',
          width: 24,
          height: 24
        }}
      >
        {number}
      </Tag>
      <Keyword>
        <Typography component="div" fontWeight={700} lineHeight="18px">
          {keyword}
        </Typography>
      </Keyword>
      {isNew && <Badge severity="warning">NEW</Badge>}
      {isUp && <Badge severity="success" startIcon={<Icon name="ArrowDropUpSpecify_12_12" />} />}
      {isDown && <Badge severity="error" startIcon={<Icon name="ArrowDropDownSpecify_12_12" />} />}
    </StyledIssueKeywordCard>
  );
}

export default memo(IssueKeywordCard);
