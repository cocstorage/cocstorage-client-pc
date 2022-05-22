import GeneralTemplate from '@components/templeates/GeneralTemplate';
import { Footer, Header } from '@components/UI/molecules';

function Notice() {
  return (
    <GeneralTemplate header={<Header />} footer={<Footer />}>
      Notice
    </GeneralTemplate>
  );
}

export default Notice;
