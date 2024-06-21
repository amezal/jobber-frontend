import { Body, Cell, Header, Row, Table } from "@jobber/components/Table";
import { Job } from "types";

type Props = {
  jobs: Array<Job>;
};

const JobsTable = ({ jobs }: Props) => {
  return (
    <Table>
      <Header>
        <Cell>Job</Cell>
      </Header>
      <Body>
        {jobs.map(({ id, title }) => (
          <Row key={id}>
            <Cell>{title}</Cell>
          </Row>
        ))}
      </Body>
    </Table>
  );
};

export default JobsTable;
