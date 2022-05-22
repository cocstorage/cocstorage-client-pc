import { Alert, Icon } from 'cocstorage-ui';

function BestNoticeAlert() {
  return (
    <Alert severity="normal" icon={<Icon name="BulbOutlined" />}>
      좀 더 편하게 보실 수 있도록 준비하고 있어요. 불편하시겠지만 조금만 기다려주세요!
    </Alert>
  );
}

export default BestNoticeAlert;
