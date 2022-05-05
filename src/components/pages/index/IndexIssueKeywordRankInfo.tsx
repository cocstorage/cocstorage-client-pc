import React from 'react';
import { useQuery } from 'react-query';

import { Flexbox, Box } from 'cocstorage-ui';

import { Footer, IssueKeywordCard, SideAccordion } from '@components/UI/molecules';

import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';
import queryKeys from '@constants/react-query';

function IndexIssueKeywordRankInfo() {
  const { data: { ranks = [] } = {} } = useQuery(
    queryKeys.issueKeywords.issueKeywordRank,
    fetchIssueKeywordRank
  );

  return (
    <Box customStyle={{ minWidth: 183, whiteSpace: 'nowrap' }}>
      <Flexbox direction="vertical" gap={20} customStyle={{ position: 'fixed' }}>
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
    </Box>
  );
}

export default IndexIssueKeywordRankInfo;
