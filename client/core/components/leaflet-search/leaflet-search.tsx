import { FC } from "react";
import { SelectInput } from "components/common/select-input";
import { useForm } from "react-hook-form";
import { Button } from "components/common/button";
import { TextInput } from "../common/text-input";

type FieldValues = {
  levels: Array<string>;
  subjects: Array<string>;
  asdf: string;
};

const mockOpts = [
  {
    label: "L1234",
    value: "1234",
  },
  {
    label: "L1re223434",
    value: "12341234",
  },
  {
    label: "L1223wer434",
    value: "1234x1234",
  },
  {
    label: "L12er23434",
    value: "123431234",
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
    <form style={{ width: "300px" }} onSubmit={handleSubmit(onSubmit)}>
      <SelectInput isMulti name="levels" options={mockOpts} control={control} />
      <TextInput htmlType={"text"} register={register("asdf")} label={"AAAa"} />
      <Button type={"submit"}>Submit</Button>
    </form>
  );
};
