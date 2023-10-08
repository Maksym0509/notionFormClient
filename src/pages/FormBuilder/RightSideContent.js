import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import { ReactFormBuilder } from "react-form-builder2";
import { items } from "../../helper/toolbarItems";
import { useSelector } from "react-redux";
import convertNotionToElements from "../../helper/convertNotionToElements";

const RightSideContent = () => {
  const { tables } = useSelector((state) => state.form);
  const [selectedTable, setSelectedTable] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedTable")) || null;
  });

  const data = convertNotionToElements(tables, selectedTable);
  return (
    <React.Fragment>
      <Card className="mt-4" id="alerts">
        <CardBody className="p-4">
          <ReactFormBuilder data={data} toolbarItems={items} />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default RightSideContent;
