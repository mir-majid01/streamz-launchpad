import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/streamz/legal";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/terms")({ head: () => pageMeta("Terms of use template", "Editable StreamZ terms of use draft. This template requires accurate app-specific details and legal review before publication.", "/terms"), component: Terms });
function Terms() { return <LegalPage type="terms" />; }
