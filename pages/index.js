import useSWR from 'swr';
import Head from 'next/head';
import Map from '../components/Map'
import ReactTooltip from "react-tooltip";
import { useState } from "react";

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Index() {
  const { data, error } = useSWR('/api/randomQuote', fetcher);
  // The following line has optional chaining, added in Next.js v9.1.5,
  // is the same as `data && data.author`
  const author = data?.author;
  let quote = data?.quote;

  if (!data) quote = 'Loading...';
  if (error) quote = 'Failed to fetch the quote.';
  const [content, setContent] = useState("");  

  return (
    <div>
      <Head>
        <title>Where do we go?</title>
        <link href="/static/styles.css" rel="stylesheet" />
      </Head>
      <main className="center">
        <Map setTooltipContent={setContent} />
        <div> {process.browser && <ReactTooltip>{content}</ReactTooltip>}</div>
      </main>
    </div>
  );
}