import { Page } from "@jobber/components/Page";
import { Spinner } from "@jobber/components/Spinner";
import { Text } from "@jobber/components/Text";
import JobsTable from "components/JobsTable/JobsTable";
import EmptyStateCard from "components/EmptyStateCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "services";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [isFetchingJobs, setIsFetchingJobs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setIsFetchingJobs(true);
        const { data } = await getJobs();
        setJobs(data.jobs);
        setIsFetchingJobs(false);
      } catch (error) {
        setIsFetchingJobs(false);
        navigate("/auth");
      }
    })();
  }, []);
  return (
    <Page title="👋  Jobber demo app" width="fill">
      <div style={{ maxWidth: "854px" }}>
        <Text size="large">
          To customize it and turn it into something you can call your own,
          explore{" "}
          <a href="https://atlantis.getjobber.com/">Atlantis design system</a>,
          and our{" "}
          <a href="https://developer.getjobber.com/docs/">GraphQL API docs</a>.
          Turn that dream into a reality.
        </Text>
        <br />
        <Text size="large">
          Below you can see a list of the Jobs in the connected Jobber account .
          Check out to see the GraphQL query that was used to retrieve this
          Client info.
        </Text>
      </div>
      {isFetchingJobs ? (
        <Spinner size="small" />
      ) : jobs.length > 0 ? (
        <JobsTable jobs={jobs} />
      ) : (
        <EmptyStateCard />
      )}
    </Page>
  );
}

export default Home;
