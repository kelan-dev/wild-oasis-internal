import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { settings, error, isLoading } = useSettings();

  const { minBookingLength, maxBookingLength, maxGuests, breakfastPrice } =
    settings || {};

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  function handleUpdate(e, field) {
    const value = e.target.value;
    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuests}
          onBlur={(e) => handleUpdate(e, "maxGuests")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
