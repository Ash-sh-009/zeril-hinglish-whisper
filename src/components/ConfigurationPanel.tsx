
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Save, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ConfigurationPanel = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    botName: 'ZERIL',
    ownerTag: '@ash_yv',
    hinglishRatio: [60],
    personality: 'playful-sarcastic',
    activeTriggers: {
      directTag: true,
      nameMention: true,
      commands: true
    },
    emotionalResponses: {
      happy: 'Mast hai yaar! 🔥',
      sad: 'Arey tension mat lo yaar ❤️',
      angry: 'Thanda lo bhai, garmi zyada hai 🔥😂'
    }
  });

  const handleSave = () => {
    toast({
      title: "Configuration Saved! ✨",
      description: "ZERIL's personality has been updated successfully.",
    });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎭 Personality Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="botName">Bot Name</Label>
            <Input 
              id="botName" 
              value={config.botName}
              onChange={(e) => setConfig({...config, botName: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner">Owner Tag</Label>
            <Input 
              id="owner" 
              value={config.ownerTag}
              onChange={(e) => setConfig({...config, ownerTag: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Hinglish Ratio: {config.hinglishRatio[0]}%</Label>
            <Slider
              value={config.hinglishRatio}
              onValueChange={(value) => setConfig({...config, hinglishRatio: value})}
              max={100}
              step={10}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground">
              Higher = More Hinglish, Lower = More English
            </div>
          </div>

          <div className="space-y-3">
            <Label>Activation Triggers</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="directTag">Direct Tag (@zerilll_bot)</Label>
                <Switch
                  id="directTag"
                  checked={config.activeTriggers.directTag}
                  onCheckedChange={(checked) => 
                    setConfig({
                      ...config, 
                      activeTriggers: {...config.activeTriggers, directTag: checked}
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="nameMention">Name Mention (ZERIL)</Label>
                <Switch
                  id="nameMention"
                  checked={config.activeTriggers.nameMention}
                  onCheckedChange={(checked) => 
                    setConfig({
                      ...config, 
                      activeTriggers: {...config.activeTriggers, nameMention: checked}
                    })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💭 Emotional Responses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="happy">Happy Response ❤️</Label>
            <Textarea 
              id="happy"
              value={config.emotionalResponses.happy}
              onChange={(e) => setConfig({
                ...config, 
                emotionalResponses: {...config.emotionalResponses, happy: e.target.value}
              })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sad">Sad Response 😢</Label>
            <Textarea 
              id="sad"
              value={config.emotionalResponses.sad}
              onChange={(e) => setConfig({
                ...config, 
                emotionalResponses: {...config.emotionalResponses, sad: e.target.value}
              })}
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="angry">Angry Response 🔥</Label>
            <Textarea 
              id="angry"
              value={config.emotionalResponses.angry}
              onChange={(e) => setConfig({
                ...config, 
                emotionalResponses: {...config.emotionalResponses, angry: e.target.value}
              })}
              rows={2}
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex gap-2 mb-3">
              <Badge variant="outline">🤖 AI Models</Badge>
              <Badge variant="outline">🌍 Multi-language</Badge>
              <Badge variant="outline">🎯 Context-aware</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              ZERIL uses advanced sentiment analysis and language detection to provide contextually appropriate responses in Hinglish.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="md:col-span-2">
        <div className="flex gap-4">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Configuration
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Reset to Default
          </Button>
        </div>
      </div>
    </div>
  );
};
