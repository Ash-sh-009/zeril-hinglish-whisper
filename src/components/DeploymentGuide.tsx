
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Telegram bots cannot be deployed on Vercel as they require persistent connections. 
          Use Render, Railway, or Heroku instead.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="render" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="render">🚀 Render (Free)</TabsTrigger>
          <TabsTrigger value="railway">🚂 Railway</TabsTrigger>
          <TabsTrigger value="heroku">☁️ Heroku</TabsTrigger>
          <TabsTrigger value="local">💻 Local</TabsTrigger>
        </TabsList>

        <TabsContent value="render" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Deploy on Render (Recommended - Free Tier)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">✅ Pros:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Free tier available</li>
                    <li>• Easy GitHub integration</li>
                    <li>• Auto-deploy on push</li>
                    <li>• Good for Telegram bots</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">⚠️ Limitations:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Sleeps after 15min inactivity</li>
                    <li>• 750 build hours/month</li>
                    <li>• Limited RAM (512MB)</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Deployment Steps:</h4>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>Push your code to GitHub repository</li>
                  <li>Sign up at <a href="https://render.com" className="text-blue-500 hover:underline" target="_blank">render.com</a></li>
                  <li>Create New → Web Service</li>
                  <li>Connect your GitHub repo</li>
                  <li>Configure environment variables (see Files tab)</li>
                  <li>Deploy! 🚀</li>
                </ol>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Pro Tip:</strong> Use the "Keep Alive" feature by adding a simple HTTP endpoint 
                  that pings itself every 10 minutes to prevent sleeping.
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
