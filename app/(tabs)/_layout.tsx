import { Tabs } from "expo-router";

const activeTintColor = "#2f6f5e";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: activeTintColor,
      }}
    >
      <Tabs.Screen
        name="capture"
        options={{
          title: "Capture",
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "Upcoming",
        }}
      />
      <Tabs.Screen
        name="spaces"
        options={{
          title: "Spaces",
        }}
      />
    </Tabs>
  );
}
