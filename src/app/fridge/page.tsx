import type { Metadata } from "next";
import FridgeCanvas from "@/components/fridge/FridgeCanvas";

export const metadata: Metadata = {
  title: "fridge | rose nguyen",
};

/* Fridge / playground: a ring of other works and interests (content from Figma 973:1594, centre 1226:289). */
export default function Fridge() {
  return (
    <>
      <FridgeCanvas />
    </>
  );
}
