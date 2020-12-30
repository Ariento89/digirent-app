/* eslint-disable jsx-a11y/label-has-associated-control */
import AccountBankDetails from 'widgets/_PageAccount/AccountBankDetails';
import AccountCopyId from 'widgets/_PageAccount/AccountCopyId';
import AccountDescription from 'widgets/_PageAccount/AccountDescription';
import AccountGeneral from 'widgets/_PageAccount/AccountGeneral';
import AccountLookingFor from 'widgets/_PageAccount/AccountLookingFor';
import AccountPassword from 'widgets/_PageAccount/AccountPassword';
import AccountProfile from 'widgets/_PageAccount/AccountProfile';
import AccountProofOfEnrolment from 'widgets/_PageAccount/AccountProofOfEnrolment';
import AccountProofOfIncome from 'widgets/_PageAccount/AccountProofOfIncome';
import AccountSocialMedia from 'widgets/_PageAccount/AccountSocialMedia';

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
      <AccountLookingFor />
      <AccountBankDetails />
      <AccountCopyId />
      <AccountProofOfIncome />
      <AccountProofOfEnrolment />
    </div>
  </div>
);

export default Page;
