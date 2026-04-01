export default function HomeScreen({ user }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#f8f3ed",
        padding: 40,
        boxSizing: "border-box",
      }}
    >
      <h1>Home Screen</h1>
      <p>Welcome, {user?.displayName || user?.username}!</p>
    </div>
  );
}