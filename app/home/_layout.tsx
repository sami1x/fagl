import { Stack } from "expo-router";
import { Tabs, Redirect } from "expo-router";
import { auth } from "@/config/firebaseConfig";

export default function Layout() {
  if (!auth?.currentUser || !auth?.currentUser?.emailVerified) {
    return <Redirect href="/" />;
  }
  return <Stack />;
}
