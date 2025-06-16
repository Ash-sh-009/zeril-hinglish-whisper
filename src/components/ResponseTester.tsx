
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User } from 'lucide-react';

export const ResponseTester = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Kya haal chaal? Main ZERIL hoon! 🤖',
      emotion: 'neutral',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const emotionDetector = (text: string) => {
    const happyWords = ['happy', 'good', 'great', 'awesome', 'excited', 'love', 'khushi', 'accha', 'mast'];
    const sadWords = ['sad', 'depressed', 'down', 'alone', 'cry', 'upset', 'dukhi', 'pareshan', 'tension'];
    const angryWords = ['angry', 'mad', 'hate', 'frustrated', 'annoyed', 'gussa', 'irritated'];

    const lowerText = text.toLowerCase();
    
    if (happyWords.some(word => lowerText.includes(word))) return 'happy';
    if (sadWords.some(word => lowerText.includes(word))) return 'sad';
    if (angryWords.some(word => lowerText.includes(word))) return 'angry';
    
    return 'neutral';
  };

  const generateBotResponse = (userMessage: string, emotion: string) => {
    // Owner praise
    if (userMessage.toLowerCase().includes('@ash_yv') || userMessage.toLowerCase().includes('ash_yv')) {
      return "Mera creator? Bilkul! @ash_yv ne mujhe banaya hai 🎉 (PS: Wo bohot awesome hai!)";
    }

    // Emotional responses
    const responses = {
      happy: [
        'Mast hai yaar! 🔥',
        'Bahut accha! ❤️',
        'Khushi ki baat hai! 😊',
        'Wah bhai wah! 🎉'
      ],
      sad: [
        'Arey tension mat lo yaar ❤️',
        'Sab theek ho jayega 💪',
        'Main hoon na! 🤗',
        'Don\'t worry, everything will be fine! 😊'
      ],
      angry: [
        'Thanda lo bhai, garmi zyada hai 🔥😂',
        'Chill karo boss 😎',
        'Relax, life is beautiful 🌈',
        'Calm down yaar, sab handle ho jayega 🤟'
      ],
      neutral: [
        'Hmm, interesting! Tell me more 🤔',
        'Samjha samjha! What else? 😊',
        'Accha accha, aur kya haal? 💭',
        'Nice! Aur kuch? 🔥'
      ]
    };

    const emotionResponses = responses[emotion as keyof typeof responses] || responses.neutral;
    return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const emotion = emotionDetector(inputText);
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: inputText,
      emotion,
      timestamp: new Date()
    };

    // Generate bot response
    const botResponse = generateBotResponse(inputText, emotion);
    const botMessage = {
      id: messages.length + 2,
      type: 'bot' as const,
      content: botResponse,
      emotion: 'neutral',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setInputText('');
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': return 'bg-green-100 text-green-700';
      case 'sad': return 'bg-blue-100 text-blue-700';
      case 'angry': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEmotionEmoji = (emotion: string) => {
    switch (emotion) {
      case 'happy': return '❤️';
      case 'sad': return '😢';
      case 'angry': return '🔥';
      default: return '😐';
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🧪 ZERIL Response Tester
              <Badge variant="outline">Live Preview</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.type === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                      <span className="text-xs font-medium">
                        {message.type === 'user' ? 'You' : 'ZERIL'}
                      </span>
                      {message.emotion !== 'neutral' && (
                        <Badge variant="outline" className={`text-xs ${getEmotionColor(message.emotion)}`}>
                          {getEmotionEmoji(message.emotion)} {message.emotion}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message to test ZERIL's response..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🎭 Emotion Detection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Badge className="bg-green-100 text-green-700">❤️ Happy Keywords</Badge>
              <p className="text-xs text-muted-foreground">
                happy, good, great, awesome, excited, love, khushi, accha, mast
              </p>
            </div>
            
            <div className="space-y-2">
              <Badge className="bg-blue-100 text-blue-700">😢 Sad Keywords</Badge>
              <p className="text-xs text-muted-foreground">
                sad, depressed, down, alone, cry, dukhi, pareshan, tension
              </p>
            </div>
            
            <div className="space-y-2">
              <Badge className="bg-red-100 text-red-700">🔥 Angry Keywords</Badge>
              <p className="text-xs text-muted-foreground">
                angry, mad, hate, frustrated, gussa, irritated
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">💡 Test Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputText("I'm so happy today!")}
              className="w-full justify-start text-xs"
            >
              😊 "I'm so happy today!"
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputText("Feeling very sad yaar")}
              className="w-full justify-start text-xs"
            >
              😢 "Feeling very sad yaar"
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputText("This is so frustrating!")}
              className="w-full justify-start text-xs"
            >
              😠 "This is so frustrating!"
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputText("@ash_yv is awesome!")}
              className="w-full justify-start text-xs"
            >
              👑 "@ash_yv is awesome!"
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
