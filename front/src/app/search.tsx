"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearchNext } from "react-instantsearch-nextjs";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export function Search() {
  return (
    <InstantSearchNext indexName="bestbuy" searchClient={searchClient}>
      {/* ##################################
          Your instantsearch code goes here.
          ################################## */}
    </InstantSearchNext>
  );
}
