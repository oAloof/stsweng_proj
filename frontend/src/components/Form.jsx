import { useForm, Controller } from "react-hook-form";
import TitleInput from "./TitleInput";
import TextEditor from "./TextEditor";
import DatePicker from "./DatePicker";
import TimeStamp from "./TimeStamp";
import SubLabel from "./Category/SubLabel/SubLabelInput";
import Category from "./Category/CategoryInput";
import Difficulty from "./DifficultyInput";

export default function Form() {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => console.log(data);
  // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="flex">
        <div className="m-5">
          <div className="flex space-x-4">
            <TimeStamp />

            <Controller
              name="dueDate"
              control={control}
              defaultValue={null} // Set default value to null
              render={({ field }) => (
                <DatePicker onChange={field.onChange} value={field.value} />
              )} // Pass the field object to MyDatePicker component
            />
          </div>

          <div>
            <Controller
              render={({ field }) => (
                <TitleInput onChange={field.onChange} value={field.value} />
              )}
              name="Title"
              control={control}
              defaultValue=""
            />

            <Controller
              render={({ field }) => (
                <TextEditor onChange={field.onChange} value={field.value} />
              )}
              name="Description"
              control={control}
              defaultValue=""
            />
          </div>
        </div>

        <div>
          <Category />

          <SubLabel />

          <Difficulty />
        </div>
      </div>

      <input type="submit" />
    </form>
  );
}
