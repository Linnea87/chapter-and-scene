import { BookX } from "lucide-react";
import StatusMessage from "../../components/ui/feedback/StatusMessage/StatusMessage";

// ===== Not found page =====
// Shown by the router for every URL that does not match a route.

const NotFoundPage = () => (
  <div className="container">
    <StatusMessage
      icon={BookX}
      titleAs="h1"
      title="This chapter is missing"
      message="The page you're looking for doesn't exist."
      actionLabel="Back to Explore"
      actionTo="/explore"
    />
  </div>
);

export default NotFoundPage;