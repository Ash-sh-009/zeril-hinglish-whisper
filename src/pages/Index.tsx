
import { useState } from 'react';
import { BotHeader } from '@/components/BotHeader';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { DeploymentGuide } from '@/components/DeploymentGuide';
import { ResponseTester } from '@/components/ResponseTester';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { FileGenerator } from '@/components/FileGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [activeTab, setActiveTab] = useState('config');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6">
        <BotHeader />
        
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
              <TabsTrigger value="config" className="text-sm">⚙️ Config</TabsTrigger>
              <TabsTrigger value="deploy" className="text-sm">🚀 Deploy</TabsTrigger>
              <TabsTrigger value="files" className="text-sm">📁 Files</TabsTrigger>
              <TabsTrigger value="test" className="text-sm">🧪 Test</TabsTrigger>
              <TabsTrigger value="analytics" className="text-sm">📊 Analytics</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="config" className="space-y-6">
                <ConfigurationPanel />
              </TabsContent>

              <TabsContent value="deploy" className="space-y-6">
                <DeploymentGuide />
              </TabsContent>

              <TabsContent value="files" className="space-y-6">
                <FileGenerator />
              </TabsContent>

              <TabsContent value="test" className="space-y-6">
                <ResponseTester />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <AnalyticsDashboard />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
