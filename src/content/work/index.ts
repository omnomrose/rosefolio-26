import type { CaseStudyPage } from "./types";
import * as whether from "./whether";
import * as mitchieMatcha from "./mitchie-matcha";
import * as arGlassesRetail from "./ar-glasses-retail";

// Registry of case study pages, keyed by route slug (/work/[slug]).
export const caseStudyPages: Record<string, CaseStudyPage> = {
  whether: { meta: whether.meta, Body: whether.Body },
  "mitchie-matcha": { meta: mitchieMatcha.meta, Body: mitchieMatcha.Body },
  "ar-glasses-retail": { meta: arGlassesRetail.meta, Body: arGlassesRetail.Body },
};
