
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, ExternalLink, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DeploymentGuide = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied! 📋",
      description: "Code copied to clipboard",
    });
  };

  const deployToRender = () => {
    window.open('https://render.com/deploy?repo=https://github.com/YOUR_USERNAME/ZERIL-Bot', '_blank');
    toast({
      title: "🚀 Deploying to Render",
      description: "Opening Render deployment page...",
    });
  };

  return (
    <div className="space-y-6">
      <Alert className="border-green-200 bg-green-50">
        <Zap className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>✨ Auto-Deploy Ready:</strong> Your ZERIL bot will automatically start working once deployed! 
          All features included: Hinglish chat, emotion detection, and AI responses.
        </AlertDescription>
      </Alert>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Telegram bots cannot be deployed on Vercel as they require persistent connections. 
          Use Render (Free), Railway, or Heroku instead.
        </AlertDescription>
      </Alert>

      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            🚀 One-Click Deploy to Render (FREE)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-2">Quick Setup (2 minutes):</h4>
            <ol className="text-sm space-y-2 list-decimal list-inside">
              <li>Push all files from the "Files" tab to your GitHub repository</li>
              <li>Click the "Deploy to Render" button below</li>
              <li>Connect your GitHub repo in Render</li>
              <li>Environment variables are already configured!</li>
              <li>Your ZERIL bot will be live in 3-5 minutes! 🎉</li>
            </ol>
          </div>

          <div className="flex gap-3">
            <Button onClick={deployToRender} className="bg-purple-600 hover:bg-purple-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Deploy to Render Now
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://github.com/new', '_blank')}
            >
              Create GitHub Repo
            </Button>
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription className="text-blue-800">
              <strong>🤖 Bot Status:</strong> Once deployed, test your bot by sending "/start" or "ZERIL" in Telegram!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Tabs defaultValue="render" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="render">🚀 Render (Free)</TabsTrigger>
          <TabsTrigger value="railway">🚂 Railway</TabsTrigger>
          <TabsTrigger value="heroku">☁️ Heroku</TabsTrigger>
          <TabsTrigger value="troubleshoot">🔧 Fix Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="render" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deploy on Render - Step by Step</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">📋 Pre-Deployment Checklist:</h4>
                <ul className="text-sm space-y-1">
                  <li>✅ All files copied to GitHub repo</li>
                  <li>✅ Bot token: 8048986424:AAE37...</li>
                  <li>✅ HuggingFace key: hf_varcbMWVBBE...</li>
                  <li>✅ Python 3.11 configured</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Deployment Steps:</h4>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>Go to <a href="https://render.com" className="text-blue-500 hover:underline" target="_blank">render.com</a> and sign up</li>
                  <li>Click "New +" → "Web Service"</li>
                  <li>Connect your GitHub repository</li>
                  <li>Configure:
                    <div className="ml-4 mt-1 bg-gray-100 p-2 rounded text-xs font-mono">
                      Name: zeril-telegram-bot<br/>
                      Build Command: pip install -r requirements.txt<br/>
                      Start Command: python bot.py
                    </div>
                  </li>
                  <li>Add Environment Variables (already included in render.yaml)</li>
                  <li>Click "Create Web Service"</li>
                  <li>Wait 3-5 minutes for deployment ⏳</li>
                  <li>Test bot with "/start" in Telegram! 🤖</li>
                </ol>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>💡 Pro Tip:</strong> The render.yaml file includes a keep-alive service to prevent your bot from sleeping!
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshoot" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>🔧 Bot Not Responding? Fix It!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Common Issues & Solutions:</h4>
                <ul className="text-sm space-y-2 text-red-700">
                  <li><strong>❌ Bot not responding:</strong> Check if deployment is successful in Render logs</li>
                  <li><strong>❌ "Bot token invalid":</strong> Verify token: 8048986424:AAE37IBwkCzE5oKtGCdN-mnnsMrcrlzGWUQ</li>
                  <li><strong>❌ AI features not working:</strong> Check HuggingFace key: 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</li>
                  <li><strong>❌ Memory errors:</strong> Some AI models might be too large for free tier</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✅ Testing Commands:</h4>
                <div className="text-sm space-y-1 text-green-700 font-mono">
                  <div>/start - Check if bot is alive</div>
                  <div>ZERIL - Test name recognition</div>
                  <div>@zerilll_bot hello - Test direct tagging</div>
                  <div>/mood - Test AI emotion detection</div>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>🆘 Still not working?</strong> Check the Render service logs for error messages. 
                  The bot needs continuous uptime to respond to messages.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="railway" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deploy on Railway</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Badge variant="outline" className="mb-2">$5/month after free trial</Badge>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Quick Deploy:</h4>
                  <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <span>npm install -g @railway/cli</span>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard('npm install -g @railway/cli')}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <span>railway login && railway deploy</span>
                      <Button size="sm" variant="ghost" onClick={() => copyToClipboard('railway login && railway deploy')}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <ul className="text-sm space-y-1">
                  <li>✅ No sleeping issues</li>
                  <li>✅ Better performance</li>
                  <li>✅ PostgreSQL included</li>
                  <li>❌ Not completely free</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heroku" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deploy on Heroku</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Heroku discontinued free tier. Minimum $7/month required.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span>git push heroku main</span>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard('git push heroku main')}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <ul className="text-sm space-y-1">
                  <li>✅ Rock solid reliability</li>
                  <li>✅ Excellent documentation</li>
                  <li>✅ Add-ons ecosystem</li>
                  <li>❌ No free tier</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="local" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Run Locally (Development)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span>git clone your-repo-url</span>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard('git clone your-repo-url')}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>pip install -r requirements.txt</span>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard('pip install -r requirements.txt')}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>python bot.py</span>
                    <Button size="sm" variant="ghost" onClick={() => copyToClipboard('python bot.py')}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <Alert>
                  <AlertDescription>
                    Make sure to set environment variables in a <code>.env</code> file for local development.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
