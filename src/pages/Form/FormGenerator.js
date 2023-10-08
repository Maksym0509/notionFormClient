import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formReset, save } from "../../redux/Form/formSlice";
import { ReactFormGenerator } from "react-form-builder2";
import LoadingButton from "../../components/LoadingButton";
import fileUpload from "../../helper/fileUpload";
import { toast } from "react-toastify";

const FormGenerator = () => {
  const dispatch = useDispatch();
  const { isSuccess, isError, message, formData, selectedTable } = useSelector(
    (state) => state.form
  );

  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false);

  useEffect(() => {
    setIsSubmitBtnLoading(false);
    if (isError) {
      toast.error(message);
    } else if (isSuccess) {
      if (message === "submitted") {
        toast.success("Successfully submitted!");
      }
    }
    dispatch(formReset());
  }, [isSuccess, isError]);

  const onSubmit = (data) => {
    setIsSubmitBtnLoading(true);

    const newData = formData.reduce((map, obj) => {
      map[obj.id] = obj;
      return map;
    }, {});

    const promises = data.map(async (obj) => {
      if (newData[obj.id]) {
        if (
          newData[obj.id].element === "Camera" ||
          newData[obj.id].element === "FileUpload"
        ) {
          const imgSrc =
            obj.value !== null ? await fileUpload(obj.value) : null;

          if (imgSrc) {
            return {
              ...obj,
              value: imgSrc,
              label: newData[obj.id].label?.trim(),
            };
          }
        } else {
          return {
            ...obj,
            label: newData[obj.id].label?.trim(),
          };
        }
      }
    });

    Promise.all(promises).then((results) => {
      results = results.filter(function (element) {
        return element !== undefined;
      });
      dispatch(save({ formData: results, table: selectedTable }));
    });
  };

  return (
    <React.Fragment>
      <div>
        {formData ? (
          <ReactFormGenerator
            action_name="Submit"
            form_action="/"
            form_method="POST"
            onSubmit={onSubmit}
            submitButton={
              <LoadingButton
                disabled={isSubmitBtnLoading}
                className={"btn btn-primary submitBtn"}
                isLoading={isSubmitBtnLoading}
                title={"Submit"}
              />
            }
            data={formData}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default FormGenerator;
