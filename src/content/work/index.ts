import type { CaseStudyPage } from "./types";
import * as whether from "./whether";

// Registry of case study pages, keyed by route slug (/work/[slug]).
export const caseStudyPages: Record<string, CaseStudyPage> = {
  whether: { meta: whether.meta, Body: whether.Body },
};
