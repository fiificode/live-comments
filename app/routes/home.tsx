import { useState } from "react";
import { useNavigate } from "react-router";
import TopicList from "../components/features/topics/TopicList";
import AuthGate from "../components/features/auth/AuthGate";
import useStore from "../store/useStore";
import TabBar from "~/components/layout/TabBar";
import Header from "~/components/layout/Header";

export default function Home() {
  const navigate = useNavigate();
  const signIn = useStore((s) => s.signIn);
  const [pendingTopicId, setPendingTopicId] = useState<string | null>(null);

  function handleAuthRequired(topicId: string) {
    setPendingTopicId(topicId);
  }

  function handleAuth(e?: React.FormEvent) {
    e?.preventDefault();
    signIn();
    
    if (pendingTopicId) {
      setTimeout(() => {
        navigate(`/thread/${pendingTopicId}`);
        setPendingTopicId(null);
      }, 100);
    }
  }

  function handleDismiss() {
    setPendingTopicId(null);
  }

  return (
    <div className="animate-page-in">
      <Header />
      <TabBar />
      <TopicList onAuthRequired={handleAuthRequired} />
      {pendingTopicId && (
        <AuthGate onAuth={handleAuth} onDismiss={handleDismiss} />
      )}
    </div>
  );
}
