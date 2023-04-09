import { HTMLAttributes } from 'react';

import { Badge, Tag, Typography, useTheme } from '@cocstorage/ui';
import Icon from '@cocstorage/ui-icons';

import { IssueKeyword } from '@dto/issue-keywords';

import { StyledIssueKeywordCard } from './IssueKeywordCard.styles';

interface IssueKeywordCardProps extends HTMLAttributes<HTMLDivElement> {
  issueKeyword: IssueKeyword;
  isTopTier?: boolean;
}

function IssueKeywordCard({
  issueKeyword: { number, keyword, isNew, isUp, isDown },
  isTopTier = false,
  ...props
}: IssueKeywordCardProps) {
  const {
    theme: {
      typography: { s1 }
    }
  } = useTheme();
  return (
    <StyledIssueKeywordCard {...props}>
      <Tag
        variant={isTopTier ? 'accent' : 'semiAccent'}
        customStyle={{
          display: 'flex',
          justifyContent: 'center',
          width: 20,
          height: 18,
          borderRadius: 4,
          fontSize: s1.size,
          lineHeight: s1.lineHeight.default
        }}
      >
        {number}
      </Tag>
      <Typography
        fontWeight="medium"
        customStyle={{
          flex: 1,
          textAlign: 'left'
        }}
      >
        {keyword}
      </Typography>
      {isNew && <Badge severity="warning">NEW</Badge>}
      {isUp && <Badge severity="success" icon={<Icon name="ArrowDropUpFilled" />} iconOnly />}
      {isDown && <Badge severity="error" icon={<Icon name="ArrowDropDownFilled" />} iconOnly />}
    </StyledIssueKeywordCard>
  );
}

export default IssueKeywordCard;
