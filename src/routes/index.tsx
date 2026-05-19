import { createFileRoute } from "@tanstack/react-router";
import { Deck } from "@/components/Deck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kerry's Table — Nutrition Coaching Presentation" },
      { name: "description", content: "A cinematic, interactive presentation on nutrition coaching by Kerry's Table." },
      { property: "og:title", content: "Kerry's Table — Nutrition Coaching" },
      { property: "og:description", content: "To better health — an interactive nutrition keynote." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Deck />;
}
