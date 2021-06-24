/* eslint-disable implicit-arrow-linebreak */
import Button from 'components/Button/index';
import FieldError from 'components/FieldError/FieldError';
import { usePropertyApplications } from 'hooks/usePropertyApplications';
import { useMe } from 'hooks/useMe';
import { useToasts } from 'react-toast-notifications';
import { request, role, toastTypes } from 'shared/types';
import PropertiesDetailsAmenities from 'widgets/_PagePropertiesDetails/PropertiesDetailsAmenities';
import PropertiesDetailsDescription from 'widgets/_PagePropertiesDetails/PropertiesDetailsDescription';
import PropertiesDetailsImages from 'widgets/_PagePropertiesDetails/PropertiesDetailsImages';
import PropertiesDetailsLandlord from 'widgets/_PagePropertiesDetails/PropertiesDetailsLandlord';
import PropertiesDetailsName from 'widgets/_PagePropertiesDetails/PropertiesDetailsName';
import PropertiesDetailsQuantities from 'widgets/_PagePropertiesDetails/PropertiesDetailsQuantities';

const PropertiesDetailsMain = ({ property }) => {
  // CUSTOM HOOKS
  const { addToast } = useToasts();
  const { me } = useMe();
  const { apply, status, errors } = usePropertyApplications();

  // METHODS
  const onApply = () => {
    apply(
      { propertyId: property.id },
      {
        onSuccess: () => addToast('Successfully applied for the property.', toastTypes.SUCCESS),
        onError: () =>
          addToast('An error occurred while applying for a property.', toastTypes.ERROR),
      },
    );
  };

  return (
    <div className="container max-width property-detail mt-3 mt-md-5">
      <div className="row">
        <div className="col-12 mb-10">
          <PropertiesDetailsImages images={property.images} />

          <PropertiesDetailsDescription property={property} />
        </div>

        <div className="col-12">
          <PropertiesDetailsName property={property} />

          <PropertiesDetailsQuantities property={property} />

          <PropertiesDetailsAmenities property={property} />

          {me?.role === role.TENANT && (
            <Button
              className="btn-apply min-width d-block mx-auto"
              onClick={onApply}
              loading={status === request.REQUESTING}
            >
              APPLY
            </Button>
          )}

          {!!errors?.length && (
            <div className="mt-1">
              {errors?.map((error) => (
                <FieldError error={error} center />
              ))}
            </div>
          )}

          <PropertiesDetailsLandlord landlord={property.landlord} />
        </div>
      </div>
    </div>
  );
};

export default PropertiesDetailsMain;
