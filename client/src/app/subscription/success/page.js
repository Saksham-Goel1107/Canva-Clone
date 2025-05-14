import { Suspense } from "react";
import SubscriptionSuccess from "./SubscriptionSuccess";

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscriptionSuccess />
    </Suspense>
  );
}
