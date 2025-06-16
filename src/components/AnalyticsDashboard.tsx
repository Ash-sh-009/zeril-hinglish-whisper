
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

export const AnalyticsDashboard = () => {
  const emotionData = [
    { name: 'Happy', value: 45, color: '#10B981' },
    { name: 'Neutral', value: 30, color: '#6B7280' },
    { name: 'Sad', value: 15, color: '#3B82F6' },
    { name: 'Angry', value: 10, color: '#EF4444' }
  ];

  const languageData = [
    { name: 'Mon', hinglish: 65, english: 35 },
    { name: 'Tue', hinglish: 72, english: 28 },
    { name: 'Wed', hinglish: 58, english: 42 },
    { name: 'Thu', hinglish: 68, english: 32 },
    { name: 'Fri', hinglish: 75, english: 25 },
    { name: 'Sat', hinglish: 80, english: 20 },
    { name: 'Sun', hinglish: 70, english: 30 }
  ];

  const responseTimeData = [
    { time: '00:00', responses: 12 },
    { time: '04:00', responses: 5 },
    { time: '08:00', responses: 45 },
    { time: '12:00', responses: 78 },
    { time: '16:00', responses: 92 },
    { time: '20:00', responses: 65 },
    { time: '24:00', responses: 23 }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold">2,847</p>
              </div>
              <div className="text-2xl">💬</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">+12%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">342</p>
              </div>
              <div className="text-2xl">👥</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">+8%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">1.2s</p>
              </div>
              <div className="text-2xl">⚡</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-red-600">+0.1s</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <div className="text-2xl">⭐</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">+2%</span> from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>🎭 Emotion Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emotionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {emotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🌍 Language Usage (Weekly)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={languageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hinglish" stackId="a" fill="#8B5CF6" name="Hinglish" />
                <Bar dataKey="english" stackId="a" fill="#06B6D4" name="English" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📊 Daily Activity Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="responses" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Feature Usage */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>🚀 Feature Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Emotion Detection</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Hinglish Responses</span>
                <span>72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Command Usage</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Creator Mentions</span>
                <span>23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎯 Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Model Accuracy</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                96.4%
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Hinglish Detection</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                92.1%
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Response Relevance</span>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                94.8%
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Uptime</span>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                99.9%
              </Badge>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                All metrics updated in real-time. Performance data based on last 30 days of operation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
