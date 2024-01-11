import AuthNavigation from "./AuthNavigation";
import { LoadingProvider } from "./LoadingContext";

export default function App() {
  return (
    <LoadingProvider>
      <AuthNavigation />
    </LoadingProvider>
  );
}
