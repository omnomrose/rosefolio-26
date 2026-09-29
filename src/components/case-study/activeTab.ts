"use client";

import { useSyncExternalStore } from "react";

/*
 * Active tab for tabbed case studies. The URL hash holds the tab id (#packaging),
 * so tabs are linkable and the back button steps between them.
 */
const EVENT = "case-study:tab";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

const getHash = () => decodeURIComponent(window.location.hash.slice(1));

/** The active tab id; falls back to the first tab for an empty or unknown hash. */
export function useActiveTab(tabIds: string[]) {
  const hash = useSyncExternalStore(subscribe, getHash, () => "");
  return tabIds.includes(hash) ? hash : tabIds[0];
}

export function setActiveTab(id: string) {
  if (getHash() === id) return;
  window.history.pushState(null, "", `#${id}`);
  window.dispatchEvent(new Event(EVENT));
}
