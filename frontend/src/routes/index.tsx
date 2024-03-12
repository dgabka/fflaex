import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Homepage,
});

function Homepage() {
  return <div>Homepage!</div>;
}
