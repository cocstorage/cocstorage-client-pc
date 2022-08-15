import { useState } from 'react';

import { useQuery } from 'react-query';

import { Flexbox } from 'cocstorage-ui';

import { Footer, IssueKeywordCard, SideAccordion } from '@components/UI/molecules';
import IssueKeywordCardSkeleton from '@components/UI/molecules/IssueKeywordCard/IssueKeywordCardSkeleton';
import Message from '@components/UI/molecules/Message';
import MessageDialog from '@components/UI/organisms/MessageDialog';

import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';

import queryKeys from '@constants/react-query';

function IssueKeywordRank() {
  const [open, setOpen] = useState<boolean>(false);
  const [message] = useState<{
    title: string;
    code: string;
    message: string;
  }>({
    title: '준비 중인 기능이에요.',
    code: '',
    message: '조금만 기다려주세요!'
  });

  const { data: { ranks = [] } = {}, isLoading } = useQuery(
    queryKeys.issueKeywords.issueKeywordRank,
    fetchIssueKeywordRank
  );

  const handleClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Flexbox direction="vertical" gap={20}>
        <SideAccordion title="지금 막 뜨고 있어요!" disableToggle>
          {isLoading &&
            Array.from({ length: 10 }).map((_, index) => (
              <IssueKeywordCardSkeleton
                // eslint-disable-next-line react/no-array-index-key
                key={`issue-keyword-skeleton-${index}`}
              />
            ))}
          {!isLoading &&
            ranks.map((issueKeyword) => (
              <IssueKeywordCard
                key={`issue-keyword-${issueKeyword.keywordId}`}
                issueKeyword={issueKeyword}
                isTopTier={issueKeyword.number <= 3}
                onClick={handleClick}
              />
            ))}
          {!isLoading && !ranks.length && (
            <Message title="이슈 수집 중..." message="잠시만 기다려 주세요!" hideButton />
          )}
        </SideAccordion>
        <Footer />
      </Flexbox>
      <MessageDialog open={open} {...message} onClose={handleClose} />
    </>
  );
}

export default IssueKeywordRank;
