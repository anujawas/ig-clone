import { AuthProvider } from "./AuthContext";
import AuthNavigation from "./AuthNavigation";
import { LoadingProvider } from "./LoadingContext";

export default function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <AuthNavigation />
      </LoadingProvider>
    </AuthProvider>
  );
}
