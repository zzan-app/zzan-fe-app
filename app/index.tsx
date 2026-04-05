import { useAuthStore } from "@/domains/auth/store";
import { Redirect } from "expo-router";

export default function Index() {
  const { accessToken } = useAuthStore();
  return <Redirect href={accessToken ? "/map" : "/login"} />;
}
