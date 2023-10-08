import { v4 as uuidv4 } from "uuid";

const convertNotionToElements = (tables, selectedTable) => {
  const data = [];
  const table = tables.results.find((item) => item.id === selectedTable.value);

  for (const [key, value] of Object.entries(table.properties)) {
    switch (value.type) {
      case "url":
        const url = {
          id: uuidv4(),
          element: "HyperLink",
          text: "Web site",
          static: true,
          required: false,
          bold: false,
          italic: false,
          content: value.name,
          href: "http://www.example.com",
          canHavePageBreakBefore: true,
          canHaveAlternateForm: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canPopulateFromApi: true,
          label: value.name,
        };
        data.push(url);
        break;
      case "checkbox":
        const checkbox = {
          id: uuidv4(),
          element: "Checkboxes",
          text: "Checkbox",
          required: false,
          canHaveAnswer: false,
          canHavePageBreakBefore: false,
          canHaveAlternateForm: false,
          canHaveDisplayHorizontal: false,
          canHaveOptionCorrect: false,
          canHaveOptionValue: false,
          canPopulateFromApi: false,
          field_name: "checkbox_" + uuidv4(),
          label: value.name,
          options: [
            {
              value: "true",
              text: "",
              key: "checkboxes_option_" + uuidv4(),
            },
          ],
        };
        data.push(checkbox);
        break;
      case "phone_number":
        const phone_number = {
          id: uuidv4(),
          element: "PhoneNumber",
          text: "Phone Number",
          required: false,
          canHaveAnswer: true,
          canHavePageBreakBefore: true,
          canHaveAlternateForm: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canPopulateFromApi: true,
          field_name: "phone_input_" + uuidv4(),
          label: value.name,
        };
        data.push(phone_number);
        break;
      case "email":
        const email = {
          id: uuidv4(),
          element: "EmailInput",
          text: "Email",
          required: false,
          canHaveAnswer: true,
          canHavePageBreakBefore: true,
          canHaveAlternateForm: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canPopulateFromApi: true,
          field_name: "email_input_" + uuidv4(),
          label: value.name,
        };
        data.push(email);
        break;
      case "status":
        const status = {
          id: uuidv4(),
          element: "Dropdown",
          text: "Dropdown",
          required: false,
          canHaveAnswer: true,
          canHavePageBreakBefore: true,
          canHaveAlternateForm: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canPopulateFromApi: true,
          field_name: "status_" + uuidv4(),
          label: value.name,
          options: [
            {
              value: "Not started",
              text: "Not started",
              key: "dropdown_option_" + uuidv4(),
            },
            {
              value: "In progress",
              text: "In progress",
              key: "dropdown_option_" + uuidv4(),
            },
            {
              value: "Done",
              text: "Done",
              key: "dropdown_option_" + uuidv4(),
            },
          ],
        };
        data.push(status);
        break;
      case "date":
        const date = {
          id: uuidv4(),
          element: "DatePicker",
          text: "Date",
          required: false,
          readOnly: false,
          defaultToday: false,
          canHavePageBreakBefore: true,
          canHaveAlternateForm: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canPopulateFromApi: true,
          dateFormat: "MM/dd/yyyy",
          timeFormat: "hh:mm aa",
          showTimeSelect: false,
          showTimeSelectOnly: false,
          showTimeInput: false,
          field_name: "date_picker_" + uuidv4(),
          label: value.name,
        };
        data.push(date);
        break;
      case "files":
        const files = {
          id: uuidv4(),
          element: "FileUpload",
          text: "File Upload",
          required: false,
          canHavePageBreakBefore: true,
          canHaveAlternateForm: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canPopulateFromApi: true,
          field_name: "file_upload_" + uuidv4(),
          label: value.name,
        };
        data.push(files);
        break;
      case "number":
        const number = {
          id: uuidv4(),
          element: "NumberInput",
          text: "Number Input",
          required: false,
          canHaveAnswer: true,
          canHavePageBreakBefore: true,
          canHaveAlternateForm: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canPopulateFromApi: true,
          field_name: "number_input_" + uuidv4(),
          label: value.name,
        };
        data.push(number);
        break;
      case "select":
        const select = {
          id: uuidv4(),
          element: "Dropdown",
          text: "Dropdown",
          required: false,
          canHaveAnswer: true,
          canHavePageBreakBefore: true,
          canHaveAlternateForm: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canPopulateFromApi: true,
          field_name: "dropdown_" + uuidv4(),
          label: value.name,
          options: [
            {
              value: "place_holder_option_1",
              text: "Place holder option 1",
              key: "dropdown_option_" + uuidv4(),
            },
            {
              value: "place_holder_option_2",
              text: "Place holder option 2",
              key: "dropdown_option_" + uuidv4(),
            },
            {
              value: "place_holder_option_3",
              text: "Place holder option 3",
              key: "dropdown_option_" + uuidv4(),
            },
          ],
        };
        data.push(select);
        break;
      case "multi_select":
        const multiSelect = {
          id: uuidv4(),
          element: "Checkboxes",
          text: "Checkboxes",
          required: false,
          canHaveAnswer: true,
          canHavePageBreakBefore: true,
          canHaveAlternateForm: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canPopulateFromApi: true,
          field_name: "checkboxes_" + uuidv4(),
          label: value.name,
          options: [
            {
              value: "place_holder_option_1",
              text: "Place holder option 1",
              key: "checkboxes_option_" + uuidv4(),
            },
            {
              value: "place_holder_option_2",
              text: "Place holder option 2",
              key: "checkboxes_option_" + uuidv4(),
            },
            {
              value: "place_holder_option_3",
              text: "Place holder option 3",
              key: "checkboxes_option_" + uuidv4(),
            },
          ],
        };
        data.push(multiSelect);
        break;
      default:
        const text = {
          id: uuidv4(),
          element: "TextInput",
          text: "Text Input",
          required: false,
          canHaveAnswer: true,
          canHavePageBreakBefore: true,
          canHaveAlternateForm: true,
          canHaveDisplayHorizontal: true,
          canHaveOptionCorrect: true,
          canHaveOptionValue: true,
          canPopulateFromApi: true,
          field_name: "text_input_" + uuidv4(),
          label: value.name,
        };
        data.push(text);
        break;
    }
  }

  return data;
};

export default convertNotionToElements;
