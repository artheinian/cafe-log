import LoginScreen from "./screens/LoginScreen";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
      < LoginScreen onLogin={() => alert("works")} />
    </ div >
  );
}