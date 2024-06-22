import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Page } from "@jobber/components/Page";
import { Spinner } from "@jobber/components/Spinner";
import { DescriptionList } from "@jobber/components/DescriptionList";
import { strFormatDate } from "@jobber/components/FormatDate";
import { Divider } from "@jobber/components/Divider";
import EmptyStateCard from "components/EmptyStateCard";
import { getJob } from "services";
import { Job } from "types";

function Home() {
  const [job, setJob] = useState<Job | null>(null);
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
  return (
    <Page title={job ? `${job?.title} - #${job?.jobNumber}` : ""} width="fill">
      {isFetchingJob ? (
        <Spinner size="small" />
      ) : job ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>Details</h1>
          <h3>Client: {job.client.name}</h3>
          <div style={{ width: "350px", marginBottom: "50px" }}>
            <DescriptionList
              data={[
                ["Start", strFormatDate(new Date(job.startAt))],
                ["End", strFormatDate(new Date(job.endAt))],
              ]}
            />
          </div>
        </div>
      ) : (
        <EmptyStateCard />
      )}
    </Page>
  );
}

export default Home;
