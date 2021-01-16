import SearchTenantForm from './widgets/SearchTenantForm';

const TenantsLanding = ({ onSubmit }) => (
  <div className="landing">
    <div className="content">
      <div className="left">
        <div className="title">TENANTS</div>
        <div className="subtitle">LIST</div>
      </div>

      <div className="right">
        <SearchTenantForm onSubmit={onSubmit} />
      </div>
    </div>

    <div className="scroll-down">
      <div className="white-space" />
      <div className="scroll-down-wrapper">
        <img src="/images/scroll-down-space.svg" className="scroll-down-space" alt="icon space" />
        <img src="/images/icon/icon-caret-down-white.svg" className="scroll-down" alt="icon" />
      </div>
      <div className="white-space" />
    </div>
  </div>
);

export default TenantsLanding;
