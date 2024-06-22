import { Body, Cell, Header, Row, Table } from "@jobber/components/Table";
import FormatDate from "./FormatDate";
import { Job } from "types";

type Props = {
  jobs: Array<Job>;
};

const JobsTable = ({ jobs }: Props) => {
  return (
    <Table>
      <Header>
        <Cell>#</Cell>
        <Cell>Job</Cell>
        <Cell>Client</Cell>
        <Cell>Starts</Cell>
        <Cell>Ends</Cell>
      </Header>
      <Body>
        {jobs.map(({ id, jobNumber, title, client, startAt, endAt }) => (
          <Row key={id}>
            <Cell>{jobNumber}</Cell>
            <Cell>{title}</Cell>
            <Cell>{client.name}</Cell>
            <Cell>
              <FormatDate date={startAt} />
            </Cell>
            <Cell>
              <FormatDate date={endAt} showColor />
            </Cell>
          </Row>
        ))}
      </Body>
    </Table>
  );
};

export default JobsTable;
