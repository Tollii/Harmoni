import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import ContractService from "../../service/contracts";
export default (props: any) => {
  useEffect(() => {
    ContractService.getContract(props.user, props.event).then((res: any) => {
      console.log(res);
    });
  });
  return (
    <Card style={{ width: "80%" }}>
      <CardContent>
        <h1>Test</h1>
      </CardContent>
    </Card>
  );
};
