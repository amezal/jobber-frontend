import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Page } from "@jobber/components/Page";
import { Spinner } from "@jobber/components/Spinner";
import { DescriptionList } from "@jobber/components/DescriptionList";
import { strFormatDate } from "@jobber/components/FormatDate";
import { Divider } from "@jobber/components/Divider";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Button } from "@jobber/components/Button";
import { showToast } from "@jobber/components/Toast";
import EmptyStateCard from "components/EmptyStateCard";
import { getJob, patchJob } from "services";
import { Job } from "types";
import {
  Body,
  Cell,
  Footer,
  Header,
  Row,
  Table,
} from "@jobber/components/Table";
import styles from "./Job.module.scss";
import secondsToHm from "utils/secondsToHm";

function Home() {
  const [job, setJob] = useState<Job | null>(null);
  const [oldJob, setOldJob] = useState<Job | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [isFetchingJob, setIsFetchingJob] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setIsFetchingJob(true);
        const { data } = await getJob(id!);
        setJob(data.job);
        setIsFetchingJob(false);
      } catch (error) {
        setIsFetchingJob(false);
        navigate("/auth");
      }
    })();
  }, []);

  const handleEditButtonClick = () => {
    setEditing(true);
    setOldJob(job);
  };
  const handleSaveButtonClick = async () => {
    setSaving(true);
    const { status } = await patchJob(job!);
    if (status === 200) {
      showToast({ message: "Saved!", variation: "success" });
    } else {
      showToast({
        message: "There was an error while saving",
        variation: "info",
      });
    }
    setSaving(false);
    setEditing(false);
  };
  const handleCancelButtonClick = () => {
    setEditing(false);
    setJob(oldJob);
  };
  return (
    <Page title="" width="fill">
      {isFetchingJob ? (
        <Spinner size="small" />
      ) : job ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <form style={{ maxWidth: "700px" }}>
            <Heading level={1}>#{job.jobNumber}</Heading>
            <Heading level={1}>
              <input
                className={styles.input}
                disabled={!editing}
                value={job.title}
                onChange={(event) => {
                  setJob({ ...job, title: event.target.value });
                }}
              />
            </Heading>
            <Divider />
            <br />
            <Heading level={2}>Instructions</Heading>
            <Text>
              <textarea
                className={styles.textarea}
                disabled={!editing}
                value={job.instructions}
                onChange={(event) => {
                  setJob({ ...job, instructions: event.target.value });
                }}
              />
            </Text>
            <br />
            <Heading level={2}>Details</Heading>
            <Heading level={3}>Client: {job.client.name}</Heading>
            <div style={{ width: "350px", marginBottom: "50px" }}>
              <DescriptionList
                data={[
                  ["Start", strFormatDate(new Date(job.startAt))],
                  ["End", strFormatDate(new Date(job.endAt))],
                ]}
              />
            </div>
          </form>
          {job.timeSheetEntries!.length > 0 && (
            <>
              <Heading level={2}>Timesheet</Heading>
              <Table>
                <Header>
                  <Cell>Worker</Cell>
                  <Cell>Start</Cell>
                  <Cell>End</Cell>
                  <Cell>Total (hours)</Cell>
                </Header>
                <Body>
                  {job.timeSheetEntries!.map(
                    ({ startAt, endAt, finalDuration, user }, i) => (
                      <Row key={i}>
                        <Cell>{user.name.full}</Cell>
                        <Cell>{new Date(startAt).toLocaleString()}</Cell>
                        <Cell>{new Date(endAt).toLocaleString()}</Cell>
                        <Cell>{secondsToHm(finalDuration)}</Cell>
                      </Row>
                    ),
                  )}
                </Body>
                <Footer>
                  <Cell />
                  <Cell />
                  <Cell>Total</Cell>
                  <Cell>
                    {secondsToHm(
                      job.timeSheetEntries!.reduce(
                        (acc, val) => acc + val.finalDuration,
                        0,
                      ),
                    )}
                  </Cell>
                </Footer>
              </Table>
              <br />
            </>
          )}
          <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
            {!editing ? (
              <Button
                fullWidth
                size="large"
                label="Edit"
                icon="edit"
                variation="learning"
                onClick={handleEditButtonClick}
              ></Button>
            ) : (
              <>
                <Button
                  fullWidth
                  size="large"
                  label="Save"
                  icon="checkmark"
                  onClick={handleSaveButtonClick}
                  loading={saving}
                ></Button>
                <Button
                  fullWidth
                  size="large"
                  label="Cancel"
                  icon="cross"
                  variation="subtle"
                  onClick={handleCancelButtonClick}
                ></Button>
              </>
            )}
          </div>
        </div>
      ) : (
        <EmptyStateCard />
      )}
    </Page>
  );
}

export default Home;
