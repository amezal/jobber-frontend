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
          This is a demo app made by&nbsp;
          <a href="https://amezal.com"> Armando Meza </a>
          leveraging Jobber's API.
        </Text>
        <br />
        <Text size="large">
          Made with React, based on the&nbsp;
          <a href="https://github.com/GetJobber/Jobber-AppTemplate-React">
            Jobber's React App Template
          </a>
          &nbsp;with a Ruby on Rails backend based on&nbsp;
          <a href="https://github.com/GetJobber/Jobber-AppTemplate-RailsAPI/tree/main?tab=readme-ov-file">
            Jobber's Rails API Template{" "}
          </a>
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
