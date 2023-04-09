import { Box, Flexbox, Skeleton } from '@cocstorage/ui';

function IssueKeywordCardSkeleton() {
  return (
    <Flexbox gap={8} alignment="center" justifyContent="space-between">
      <Skeleton width={20} height={18} disableAspectRatio round={4} />
      <Box customStyle={{ flexGrow: 1, textAlign: 'left' }}>
        <Skeleton width="100%" maxWidth={55} height={18} round={6} disableAspectRatio />
      </Box>
      <Skeleton width={21} height={16} disableAspectRatio round={4} />
    </Flexbox>
  );
}

export default IssueKeywordCardSkeleton;
