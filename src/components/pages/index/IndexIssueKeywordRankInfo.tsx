import React, { memo, HTMLAttributes } from 'react';

import { Flexbox, GenericComponentProps } from 'cocstorage-ui';

import { Footer, IssueKeywordCard, SideAccordion } from '@components/UI/molecules';
import { IssueKeyword } from '@dto/issue-keywords';

interface IssueKeywordRankInfoProps
  extends Omit<
    GenericComponentProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'customStyle'
  > {
  ranks: IssueKeyword[];
}

function IndexIssueKeywordRankInfo({ componentRef, ranks }: IssueKeywordRankInfoProps) {
  return (
    <Flexbox
      componentRef={componentRef}
      direction="vertical"
      gap={20}
      customStyle={{ minWidth: 183 }}
    >
      <SideAccordion title="지금 막 뜨고 있어요!">
        {ranks.map((issueKeyword) => (
          <IssueKeywordCard
            key={`issue-keyword-${issueKeyword.keywordId}`}
            issueKeyword={issueKeyword}
            isTopTier={issueKeyword.number <= 3}
          />
        ))}
      </SideAccordion>
      <Footer />
    </Flexbox>
  );
}

export default memo(IndexIssueKeywordRankInfo);
