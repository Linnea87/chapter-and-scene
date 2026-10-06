import { Clapperboard } from "lucide-react";
import StatusMessage from "../../common/StatusMessage/StatusMessage";

// ===== Title not found =====
// Shown on a detail page when TMDb has no movie or series with the id in the URL.
// The back link comes from DetailLayout, so no action is needed here.

const TitleNotFound = () => (
  <StatusMessage
    icon={Clapperboard}
    titleAs="h1"
    title="Scene not found"
    message="We couldn't find this title. The link may be wrong or the title may have been removed."
  />
);

export default TitleNotFound;
