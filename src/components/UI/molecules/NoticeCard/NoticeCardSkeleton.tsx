import { Flexbox, Skeleton } from 'cocstorage-ui';

function NoticeCardSkeleton() {
  return (
    <Flexbox gap={14}>
      <Skeleton width={82} height={61.5} round={6} disableAspectRatio />
      <Flexbox direction="vertical" justifyContent="space-between">
        <Skeleton width="100%" maxWidth={200} height={17.5} round={6} disableAspectRatio />
        <Flexbox gap={12}>
          <Skeleton width={30} height={16} round={6} disableAspectRatio />
          <Skeleton width={30} height={16} round={6} disableAspectRatio />
          <Skeleton width={30} height={16} round={6} disableAspectRatio />
          <Skeleton width={50} height={16} round={6} disableAspectRatio />
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
}

export default NoticeCardSkeleton;
