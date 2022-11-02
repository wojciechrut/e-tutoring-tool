import { FC } from "react";
import { SelectInput } from "components/common/select-input";
import { useForm } from "react-hook-form";
import { Button } from "components/common/button";

type FieldValues = {
  levels: Array<string>;
  subjects: Array<string>;
};

const mockOpts = [
  {
    label: "L1234",
    value: "1234",
  },
  {
    label: "L1223434",
    value: "12341234",
  },
];

export const LeafletSearch: FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectInput name="levels" options={mockOpts} control={control} />
      <Button type={"submit"}>Submit</Button>
    </form>
  );
};
