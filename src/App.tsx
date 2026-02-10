import { useState, useEffect } from 'react';
import { useWebsiteGenerator } from './hooks/useWebsiteGenerator';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ChatPanel, Message } from './components/chat/ChatPanel';
import { PreviewPanel } from './components/preview/PreviewPanel';
import { getWebsiteUrl, listWebsites } from './lib/api';
import { BackendWebsite } from './components/WebsiteGallery';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const { state, generate, reset } = useWebsiteGenerator();
  const [messages, setMessages] = useState<Message[]>([]);
  const [generatedWebsiteUrl, setGeneratedWebsiteUrl] = useState<string | null>(null);
  const [history, setHistory] = useState<BackendWebsite[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [lastProcessedStep, setLastProcessedStep] = useState<string>('');

  // Initial load
  useEffect(() => {
    fetchHistory();
    // Add welcome message
    setMessages([{
      id: 'welcome',
      role: 'ai',
      content: "Hello! I'm your AI website building assistant. Describe the website you want to create, and I'll build it for you in real-time.",
      timestamp: new Date()
    }]);
  }, []);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    const websites = await listWebsites();
    setHistory(websites);
    setIsLoadingHistory(false);
  };

  // Sync state transitions to chat messages
  useEffect(() => {
    // 1. Handle step changes (System messages)
    if (state.currentStep && state.currentStep !== lastProcessedStep && state.isGenerating && !state.needsInput) {
      const stepMessages: Record<string, string> = {
        business_gathering: '🔍 Understanding your requirements...',
        planning: '📋 Planning website structure...',
        image_description: '🎨 Designing custom image prompts...',
        image_generation: '🖼️ Generating AI images with DALL-E...',
        html_generation: '💻 Creating high-quality HTML & CSS...',
        file_storage: '💾 Saving your website files...'
      };

      if (stepMessages[state.currentStep]) {
        // Mark previous pending system messages as success
        setMessages(prev => prev.map(msg =>
          msg.role === 'system' && msg.status === 'pending' ? { ...msg, status: 'success' } : msg
        ));

        addMessage('system', stepMessages[state.currentStep], 'pending');
      }
      setLastProcessedStep(state.currentStep);
    }

    // 2. Handle AI questions
    if (state.needsInput && state.questions.length > 0) {
      // Also mark current pending system message as success if we're paused for input
      setMessages(prev => prev.map(msg =>
        msg.role === 'system' && msg.status === 'pending' ? { ...msg, status: 'success' } : msg
      ));

      const lastMessage = messages[messages.length - 1];
      const questionsText = state.questions.join('\n');

      // Only add if not already the last message
      if (lastMessage?.content !== questionsText) {
        addMessage('ai', "I need a few more details to create the perfect website for you:\n\n" + state.questions.map((q, i) => `${i + 1}. ${q}`).join('\n'), undefined, state.businessPlan || undefined);
      }
    }

    // 3. Handle completion
    if (state.result && !state.isGenerating) {
      // Mark any remaining pending system messages as success
      setMessages(prev => prev.map(msg =>
        msg.role === 'system' && msg.status === 'pending' ? { ...msg, status: 'success' } : msg
      ));

      const url = getWebsiteUrl(state.result.folder_path);
      setGeneratedWebsiteUrl(url);
      addMessage('system', '✓ Website generated successfully!', 'success');
      addMessage('ai', `Your website is ready! I've created ${Object.keys(state.result.pages).length} pages including ${Object.keys(state.result.pages).join(', ')}. You can see the live preview on the right.`, undefined, state.result.business_plan);
      fetchHistory();
    }

    // 4. Handle errors
    if (state.error) {
      addMessage('system', '✗ Generation failed', 'error');
      addMessage('ai', `I encountered an error: ${state.error}. Please try again or refine your description.`);
    }
  }, [state.currentStep, state.isGenerating, state.needsInput, state.result, state.error]);

  const addMessage = (role: Message['role'], content: string, status?: Message['status'], businessPlan?: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      role,
      content,
      businessPlan,
      status,
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = async (content: string) => {
    // Add user message to UI
    addMessage('human', content);

    // Clear previous result preview if starting fresh
    if (!state.threadId) {
      setGeneratedWebsiteUrl(null);
    }

    // Trigger generation
    if (state.needsInput) {
      await generate('', content);
    } else {
      await generate(content);
    }
  };

  const handleNewChat = () => {
    reset();
    setGeneratedWebsiteUrl(null);
    setLastProcessedStep('');
    setMessages([{
      id: 'welcome-' + Date.now(),
      role: 'ai',
      content: "Fresh start! What kind of website should we build now?",
      timestamp: new Date()
    }]);
  };

  return (
    <ThemeProvider>
      <DashboardLayout
        onNewChat={handleNewChat}
        projectName={state.result?.folder_path ? state.result.folder_path.split(/[\\/]/).pop() : "New Project"}
      >
        {/* Container with two columns */}
        <div className="flex w-full h-full">
          {/* Left column: Chat interface */}
          <div className="w-full lg:w-[450px] xl:w-[500px] h-full flex-shrink-0">
            <ChatPanel
              messages={messages}
              onSendMessage={handleSendMessage}
              onReset={handleNewChat}
              isGenerating={state.isGenerating}
              businessPlan={state.businessPlan || (state.result?.business_plan)}
              placeholder={state.needsInput ? "Answer the questions above..." : undefined}
            />
          </div>

          {/* Right column: Preview & Results */}
          <div className="flex-1 h-full hidden lg:block">
            <PreviewPanel
              url={generatedWebsiteUrl}
              history={history}
              isLoadingHistory={isLoadingHistory}
              pages={state.result ? Object.keys(state.result.pages) : []}
            />
          </div>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default App;

