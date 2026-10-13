import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/streamz/legal";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/privacy")({ head: () => pageMeta("Privacy policy template", "Editable StreamZ privacy policy draft. This template must be replaced with verified actual practices and reviewed before publication.", "/privacy"), component: Privacy });
function Privacy() { return <LegalPage type="privacy" />; }
