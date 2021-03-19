import AutoFillField from 'components/AutoFillField/index';
import InputDatePicker from 'components/InputDatePicker/index';

const HomeLanding = () => (
  <div className="landing">
    <p className="title">
      RENTING DONE <span className="alt">DIGITALLY</span>
    </p>

    <div className="input-fields">
      <AutoFillField height="45px" width="250px" placeholder="Where will you go?" icon="icon-map-marker-primary" />
      <InputDatePicker classNames="mx-md-3" placeholder="Move-in date" icon="icon-calendar-gray" />
      <InputDatePicker classNames="mr-md-3" placeholder="Move-out date" icon="icon-calendar-gray" />
      <button className="button min-width">SEARCH</button>
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

export default HomeLanding;
