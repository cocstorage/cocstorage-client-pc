import { useQuery } from '@tanstack/react-query';

import { useSetRecoilState } from 'recoil';

import { commonFeedbackDialogState } from '@recoil/common/atoms';

import { CustomStyle, Flexbox } from 'cocstorage-ui';

import { Footer, IssueKeywordCard, SideAccordion } from '@components/UI/molecules';
import IssueKeywordCardSkeleton from '@components/UI/molecules/IssueKeywordCard/IssueKeywordCardSkeleton';
import Message from '@components/UI/molecules/Message';

import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';

import queryKeys from '@constants/queryKeys';

interface IssueKeywordRankProps {
  customStyle?: CustomStyle;
}

function IssueKeywordRank({ customStyle }: IssueKeywordRankProps) {
  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const { data: { ranks = [] } = {}, isLoading } = useQuery(
    queryKeys.issueKeywords.issueKeywordRank,
    fetchIssueKeywordRank
  );

  const handleClick = () =>
    setCommonFeedbackDialogState((prevState) => ({
      ...prevState,
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    }));

  return (
    <Flexbox direction="vertical" gap={20} customStyle={customStyle}>
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
  );
}

export default IssueKeywordRank;
