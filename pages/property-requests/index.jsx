import PageWrapper from 'widgets/PageWrapper';
import TableHeader from 'widgets/TableHeader/TableHeader';

const Page = () => (
  <PageWrapper title="DigiRent - Property Requests" pageName="property-requests">
    <img src="/images/main-left-bg.svg" className="left-main-background" alt="left bg" />
    <img src="/images/main-right-bg.svg" className="right-main-background" alt="right bg" />
    <div className="container">
      <h3 className="main-title">PROPERTIES REQUESTS</h3>

      <TableHeader />

      <div className="main-box mt-5"></div>
    </div>
  </PageWrapper>
);

export default Page;
