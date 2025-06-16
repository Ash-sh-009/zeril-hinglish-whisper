
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Brain } from 'lucide-react';

export const BotHeader = () => {
  return (
    <Card className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white border-0 shadow-2xl">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold">ZERIL</h1>
                <p className="text-xl opacity-90">Hinglish Telegram Bot Queen 👑</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Heart className="w-3 h-3 mr-1" />
                Emotionally Intelligent
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Zap className="w-3 h-3 mr-1" />
                Sarcastic & Fun
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Brain className="w-3 h-3 mr-1" />
                Hinglish Expert
              </Badge>
            </div>

            <p className="text-lg opacity-90">
              Created by <span className="font-semibold">@ash_yv</span> • 
              Speaks fluent Hinglish • Mood-aware responses
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="text-right space-y-2">
              <div className="text-sm opacity-75">Bot Status</div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold">Ready to Deploy</span>
              </div>
              <div className="text-sm opacity-75 mt-4">
                Token: 8048986424:AAE37... 🔐<br/>
                HF Key: hf_varcbMWVBBE... 🤗
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
