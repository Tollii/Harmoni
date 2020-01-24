import React, { useState, useEffect } from "react";
import ContractService from "../../service/contracts";
import FileService from "../../service/files";
import ContractCard from "./ContractCard";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

export default function Contract(props: any){
  const uploadContract = (userId: number, file: any) => {
    return Promise.resolve(
      FileService.postContracts(file, userId, props.match.params.eventId)
    );
  };

  const deleteContract = (userId: number, file: any) => {
    return Promise.resolve(
      FileService.postContracts(file, userId, props.match.params.eventId)
    );
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    ContractService.getContractsByEvent(props.match.params.eventId).then(
      (res: any) => {
        setUsers(res);
      }
    );
  }, [props.match.params.eventId]);

  return (
    <div>
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <Button>Back</Button>
      </Link>
      {users.map((user: any, index: number) => (
        <ContractCard
          user={user}
          index={index}
          eventId={props.match.params.eventId}
          deleteContract={deleteContract}
          uploadContract={uploadContract}
        />
      ))}
    </div>
  );
};
