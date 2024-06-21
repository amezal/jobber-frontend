import Routes from "components/Routes";
import { server } from "mocks/server";
import { rest } from "msw";
import { render, screen } from "utils/tests";
import Home from "./Home";

describe("Home page", () => {
  test("Home page shows congratulating message", async () => {
    render(<Home />);
    expect(
      screen.getByText(/CONGRATS ON BUILDING A JOBBER APP/i),
    ).toBeVisible();
    expect(
      await screen.findByText(/Paint Jane Doe's House/i),
    ).toBeInTheDocument();
  });

  test("Home page shows job's table when jobs returned from the api", async () => {
    render(<Home />);
    expect(
      await screen.findByText(/Paint Jane Doe's House/i),
    ).toBeInTheDocument();
  });

  test("Home page shows empty state card when there's no jobs returned from the api", async () => {
    server.use(
      rest.get("http://localhost:4000/jobs", (req, res, ctx) => {
        return res(ctx.json({ jobs: [] }));
      }),
    );
    render(<Home />);
    expect(await screen.findByTestId("empty-card-state")).toBeInTheDocument();
  });

  test("Redirects to /auth if jobs api call fails", async () => {
    server.use(
      rest.get("http://localhost:4000/jobs", (req, res, ctx) => {
        return res(ctx.status(403));
      }),
    );

    render(<Routes />, {
      user: { accountName: "Capsule Corp." },
      router: { initialEntries: [{ pathname: "/home" }] },
    });

    expect(
      await screen.findByText(/Authentication in progress/i),
    ).toBeInTheDocument();
  });
});
