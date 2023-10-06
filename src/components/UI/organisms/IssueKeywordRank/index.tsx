import { CustomStyle, Flexbox, useTheme } from '@cocstorage/ui';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

import { fetchIssueKeywordRank } from '@api/v1/issue-keywords';
import { Footer, IssueKeywordCard, SideAccordion } from '@components/UI/molecules';
import IssueKeywordCardSkeleton from '@components/UI/molecules/IssueKeywordCard/IssueKeywordCardSkeleton';
import Message from '@components/UI/molecules/Message';
import queryKeys from '@constants/queryKeys';
import { commonFeedbackDialogState } from '@recoil/common/atoms';

interface IssueKeywordRankProps {
  compact?: boolean;
  customStyle?: CustomStyle;
}

function IssueKeywordRank({ compact = true, customStyle }: IssueKeywordRankProps) {
  const {
    theme: {
      palette: { background }
    }
  } = useTheme();

  const setCommonFeedbackDialogState = useSetRecoilState(commonFeedbackDialogState);

  const { data: { ranks = [] } = {}, isLoading } = useQuery(
    queryKeys.issueKeywords.issueKeywordRank,
    fetchIssueKeywordRank
  );

  const handleClick = () =>
    setCommonFeedbackDialogState({
      open: true,
      title: '준비 중인 기능이에요!',
      message: '조금만 기다려주세요!'
    });

  if (!compact) {
    return (
      <Flexbox
        direction="vertical"
        gap={20}
        customStyle={{
          padding: 20,
          backgroundColor: background.fg1,
          borderRadius: 8
        }}
      >
        <SideAccordion
          title="지금 막 뜨고 있어요!"
          disableToggle
          customStyle={{
            gap: 20
          }}
          listCustomStyle={{
            gap: 16
          }}
        >
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
      </Flexbox>
    );
  }

  return (
    <Flexbox direction="vertical" gap={20} customStyle={customStyle}>
      <SideAccordion
        title="지금 막 뜨고 있어요!"
        disableToggle
        customStyle={{
          gap: 20
        }}
        listCustomStyle={{
          gap: 16
        }}
      >
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
