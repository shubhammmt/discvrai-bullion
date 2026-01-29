import { OrderExecutionFailureScreen } from "@/components/bullion/OrderExecutionFailureScreen";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function OrderFailurePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get parameters from URL or use defaults for demo
  const metal = (searchParams.get("metal") as "gold" | "silver") || "gold";
  const transactionType = (searchParams.get("type") as "buy" | "sell") || "buy";
  const amount = Number(searchParams.get("amount")) || 5000;
  const referenceId = searchParams.get("ref") || "TXN" + Date.now().toString().slice(-8);

  return (
    <OrderExecutionFailureScreen
      metal={metal}
      transactionType={transactionType}
      amount={amount}
      referenceId={referenceId}
      onTrackRefund={() => {
        toast.info("Opening refund tracker...");
      }}
      onRetry={() => {
        navigate(`/bullion/${transactionType}`);
      }}
      onContactSupport={() => {
        toast.info("Opening support chat...");
      }}
      onBack={() => navigate("/bullion")}
    />
  );
}
