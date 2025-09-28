"use client";
import { Octokit } from "octokit";
import { useState, useEffect } from "react";
import PullRequestCard from "@/components/OpenPRCard";
import sample from "./samplePR.json";

const ClosedPRsPage: React.FC = () => {
  const [closedPRs, setClosedPRs] = useState<any[]>(sample);

  // useEffect(() => {
  //   const fetchClosedPRs = async () => {
  //     const result = await getClosedPRsResult();
  //     setClosedPRs(result);
  //   };
  //   fetchClosedPRs();
  // }, []);

  return (
    <div className="m-8 mx-4 p-1 border border-gray-300">
      <h1>Closed Pull Requests</h1>

      {closedPRs.length === 0 && <p>No closed pull requests found.</p>}

      <ul>
        {closedPRs.map((pr) => (
          <PullRequestCard key={pr.id} pr={pr} />
        ))}
      </ul>
    </div>
  );
};

const getClosedPRsResult = async () => {
  const octokit = new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN });
  const response = await octokit.request(
    "GET /repos/{org}/{team_slug}/pulls/",
    {
      org: process.env.NEXT_PUBLIC_GITHUB_ORG,
      team_slug: process.env.NEXT_PUBLIC_GITHUB_REPO_NAME,
      state: "closed",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
  console.log(JSON.stringify(response.data, null, 2));
  return response.data;
};

export default ClosedPRsPage;
