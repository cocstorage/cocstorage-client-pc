import { HTMLAttributes } from 'react';

import { Badge, Icon, Tag, Typography } from 'cocstorage-ui';

import { IssueKeyword } from '@dto/issue-keywords';

import { Keyword, StyledIssueKeywordCard } from './IssueKeywordCard.styles';

interface IssueKeywordCardProps extends HTMLAttributes<HTMLDivElement> {
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
        variant={isTopTier ? 'accent' : 'semiAccent'}
        customStyle={{
          display: 'flex',
          justifyContent: 'center',
          width: 24,
          height: 24,
          lineHeight: '24px'
        }}
      >
        {number}
      </Tag>
      <Keyword>
        <Typography fontWeight="bold">{keyword}</Typography>
      </Keyword>
      {isNew && <Badge severity="warning">NEW</Badge>}
      {isUp && <Badge severity="success" startIcon={<Icon name="ArrowDropUpSpecify_12_12" />} />}
      {isDown && <Badge severity="error" startIcon={<Icon name="ArrowDropDownSpecify_12_12" />} />}
    </StyledIssueKeywordCard>
  );
}

export default IssueKeywordCard;
