import { KYCFailureScreen } from "@/components/bullion/KYCFailureScreen";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function KYCFailurePage() {
  const navigate = useNavigate();

  return (
    <KYCFailureScreen
      onLoginWithMobile={() => {
        toast.info("Redirecting to mobile login...");
        // In production, this would redirect to the mobile auth flow
      }}
      onContactSupport={() => {
        toast.info("Opening support chat...");
      }}
      onBack={() => navigate("/bullion")}
    />
  );
}
