import AccountBankDetails from 'widgets/PageAccount/AccountBankDetails';
import AccountCopyId from 'widgets/PageAccount/AccountCopyId';
import AccountDescription from 'widgets/PageAccount/AccountDescription';
import AccountGeneral from 'widgets/PageAccount/AccountGeneral';
import AccountPassword from 'widgets/PageAccount/AccountPassword';
import AccountProfile from 'widgets/PageAccount/AccountProfile';
import AccountSocialMedia from 'widgets/PageAccount/AccountSocialMedia';

const Page = () => (
  <div className="row mt-5">
    <div className="col-12 col-lg-5 col-xl-4">
      <AccountProfile />
    </div>
    <div className="col-12 col-lg-7 col-xl-8 mt-5 mt-lg-0">
      <div className="main-box">
        <AccountSocialMedia />
        <AccountGeneral />
        <AccountPassword />
      </div>

      <AccountDescription />
      <AccountBankDetails />
      <AccountCopyId />
    </div>
  </div>
);

export default Page;
