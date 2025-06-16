
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const FileGenerator = () => {
  const { toast } = useToast();
  const [activeFile, setActiveFile] = useState('bot');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied! 📋",
      description: "File content copied to clipboard",
    });
  };

  const files = {
    bot: {
      name: 'bot.py',
      description: 'Main bot file with ZERIL personality',
      content: `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ZERIL - Hinglish Telegram Bot
Created by @ash_yv
A sarcastic, emotionally intelligent Hinglish bot
"""

import os
import logging
import asyncio
import random
from datetime import datetime
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
import torch

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

class ZerilBot:
    def __init__(self):
        self.bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
        self.hf_token = os.getenv('HUGGINGFACE_API_KEY')
        
        # Bot Configuration
        self.bot_name = "ZERIL"
        self.owner_tag = "@ash_yv"
        self.hinglish_ratio = 0.6  # 60% Hinglish, 40% detected language
        
        # Initialize AI Models
        self.init_models()
        
        # Emotional responses
        self.emotional_responses = {
            'happy': ['Mast hai yaar! 🔥', 'Bahut accha! ❤️', 'Khushi ki baat hai! 😊'],
            'sad': ['Arey tension mat lo yaar ❤️', 'Sab theek ho jayega 💪', 'Main hoon na! 🤗'],
            'angry': ['Thanda lo bhai, garmi zyada hai 🔥😂', 'Chill karo boss 😎', 'Relax, life is beautiful 🌈']
        }
        
        # Activation triggers
        self.triggers = ['zeril', 'ZERIL', '@zerilll_bot']

    def init_models(self):
        """Initialize Hugging Face models"""
        try:
            # Emotion detection model
            self.emotion_classifier = pipeline(
                "text-classification",
                model="bhadresh-savani/distilbert-base-uncased-emotion",
                token=self.hf_token
            )
            
            # Language detection
            self.language_detector = pipeline(
                "text-classification",
                model="papluca/xlm-roberta-base-language-detection",
                token=self.hf_token
            )
            
            logger.info("✅ AI Models initialized successfully!")
            
        except Exception as e:
            logger.error(f"❌ Error initializing models: {e}")
            # Fallback to basic responses
            self.emotion_classifier = None
            self.language_detector = None

    def detect_emotion(self, text):
        """Detect emotion from text"""
        if not self.emotion_classifier:
            return 'neutral'
        
        try:
            result = self.emotion_classifier(text)[0]
            emotion = result['label'].lower()
            
            # Map emotions to our categories
            if emotion in ['joy', 'love', 'optimism']:
                return 'happy'
            elif emotion in ['sadness', 'fear', 'pessimism']:
                return 'sad'
            elif emotion in ['anger', 'annoyance']:
                return 'angry'
            else:
                return 'neutral'
                
        except Exception as e:
            logger.error(f"Emotion detection error: {e}")
            return 'neutral'

    def should_respond(self, message):
        """Check if bot should respond to message"""
        text = message.text.lower() if message.text else ""
        
        # Check for direct tag or name mention
        for trigger in self.triggers:
            if trigger.lower() in text:
                return True
        
        # Check if it's a reply to bot
        if message.reply_to_message and message.reply_to_message.from_user.is_bot:
            return True
            
        return False

    def generate_response(self, message_text, emotion='neutral'):
        """Generate contextual response based on emotion and content"""
        
        # Owner praise responses
        if '@ash_yv' in message_text or 'ash_yv' in message_text.lower():
            return f"Mera creator? Bilkul! {self.owner_tag} ne mujhe banaya hai 🎉 (PS: Wo bohot awesome hai!)"
        
        # Emotional responses
        if emotion in self.emotional_responses:
            return random.choice(self.emotional_responses[emotion])
        
        # Default Hinglish responses
        hinglish_responses = [
            "Kya haal chaal? 😸",
            "Sab badhiya? Main ZERIL hoon! 🤖",
            "Bolo kya chahiye? I'm here to help! ❤️",
            "Tumne ZERIL ko bulaya? Present! 🙋‍♀️",
            "Kyun pareshaan kar rahe ho? Just kidding! 😄"
        ]
        
        return random.choice(hinglish_responses)

    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /start command"""
        welcome_message = f"""
🤖 **ZERIL Bot Activated!** 🤖

Namaste! Main ZERIL hoon - tumhari Hinglish speaking dost! 

🌟 **What I can do:**
• Emotional conversations (Happy/Sad/Angry moods)
• Hinglish + English mixing
• Sarcastic but helpful responses
• AI-powered understanding

👑 **Created by:** {self.owner_tag}

💡 **How to talk:**
- Tag me: @zerilll_bot
- Say my name: ZERIL
- Just chat normally!

Ready to chat? Bolo kuch! 😊
        """
        
        keyboard = [
            [InlineKeyboardButton("🎯 Test My Mood Detection", callback_data='test_mood')],
            [InlineKeyboardButton("📱 Creator's Profile", url='https://t.me/ash_yv')]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            welcome_message, 
            reply_markup=reply_markup,
            parse_mode='Markdown'
        )

    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /help command"""
        help_text = """
🆘 **ZERIL Help Menu** 🆘

**Commands:**
/start - Bot introduction
/help - This help message
/mood - Test emotion detection
/creator - About my creator

**Features:**
🔥 Hinglish Conversations
😊 Emotion Detection (Happy/Sad/Angry)
🧠 AI-Powered Responses
💬 Context-Aware Chat

**Tips:**
- I respond to my name "ZERIL"
- Tag me @zerilll_bot to get attention
- I understand emotions in your messages
- Mix Hindi and English freely!

Koi problem? Just ask! 😄
        """
        await update.message.reply_text(help_text, parse_mode='Markdown')

    async def mood_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Test mood detection"""
        test_messages = [
            "I'm so happy today! 😊",
            "Feeling very sad and lonely 😢", 
            "This is so frustrating! 😠"
        ]
        
        response = "🧪 **Mood Detection Test:**\\n\\n"
        
        for msg in test_messages:
            emotion = self.detect_emotion(msg)
            emoji = "❤️" if emotion == 'happy' else "😢" if emotion == 'sad' else "🔥" if emotion == 'angry' else "😐"
            response += f"{emoji} \\"{msg}\\" → **{emotion.title()}**\\n"
        
        response += "\\nTry sending me a message with emotion! 🎭"
        
        await update.message.reply_text(response, parse_mode='Markdown')

    async def creator_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """About creator"""
        creator_msg = f"""
👨‍💻 **About My Creator** 👨‍💻

**Name:** @ash_yv
**Role:** Brilliant Developer & ZERIL's Papa! 

🎉 **Why he's awesome:**
• Created me with love and sarcasm
• Gave me Hinglish superpowers
• Made me emotionally intelligent
• Handles my mood swings perfectly!

Want to thank him? Send him a message: {self.owner_tag}

*Proud to be created by the best!* ❤️
        """
        
        keyboard = [[InlineKeyboardButton("💌 Message Creator", url='https://t.me/ash_yv')]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            creator_msg, 
            reply_markup=reply_markup,
            parse_mode='Markdown'
        )

    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle all text messages"""
        
        # Check if should respond
        if not self.should_respond(update.message):
            return
        
        message_text = update.message.text
        user_name = update.effective_user.first_name
        
        # Add typing action
        await context.bot.send_chat_action(
            chat_id=update.effective_chat.id, 
            action='typing'
        )
        
        # Small delay for realistic feel
        await asyncio.sleep(random.uniform(1, 2))
        
        # Detect emotion
        emotion = self.detect_emotion(message_text)
        
        # Generate response
        response = self.generate_response(message_text, emotion)
        
        # Add user name sometimes
        if random.random() < 0.3:  # 30% chance
            response = f"{user_name}, {response}"
        
        await update.message.reply_text(response)
    
    async def button_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle button callbacks"""
        query = update.callback_query
        await query.answer()
        
        if query.data == 'test_mood':
            await query.edit_message_text(
                "🎭 **Mood Test Active!**\\n\\nSend me a message with emotion and I'll detect it!\\n\\n" +
                "Examples:\\n• I'm so excited! 🎉\\n• Feeling down today 😔\\n• This makes me angry! 😡",
                parse_mode='Markdown'
            )

    def run(self):
        """Start the bot"""
        if not self.bot_token:
            logger.error("❌ TELEGRAM_BOT_TOKEN not found!")
            return
        
        # Create application
        app = Application.builder().token(self.bot_token).build()
        
        # Add handlers
        app.add_handler(CommandHandler("start", self.start_command))
        app.add_handler(CommandHandler("help", self.help_command))
        app.add_handler(CommandHandler("mood", self.mood_command))
        app.add_handler(CommandHandler("creator", self.creator_command))
        app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message))
        app.add_handler(CallbackQueryHandler(self.button_callback))
        
        logger.info("🚀 ZERIL Bot starting...")
        logger.info(f"👑 Created by {self.owner_tag}")
        logger.info("💬 Ready for Hinglish conversations!")
        
        # Start bot
        app.run_polling(drop_pending_updates=True)

if __name__ == '__main__':
    bot = ZerilBot()
    bot.run()`
    },
    requirements: {
      name: 'requirements.txt',
      description: 'Python dependencies',
      content: `python-telegram-bot==20.7
transformers==4.36.0
torch==2.1.0
datasets==2.14.0
accelerate==0.24.0
sentencepiece==0.1.99
protobuf==4.25.0
requests==2.31.0
python-dotenv==1.0.0
langdetect==1.0.9
emoji==2.8.0`
    },
    dockerfile: {
      name: 'Dockerfile',
      description: 'Docker configuration for deployment',
      content: `# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    gcc \\
    g++ \\
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (for better caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy bot code
COPY bot.py .

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

# Expose port (for health checks)
EXPOSE 8000

# Create non-root user
RUN useradd -m -u 1000 botuser && chown -R botuser:botuser /app
USER botuser

# Run the bot
CMD ["python", "bot.py"]`
    },
    render: {
      name: 'render.yaml',
      description: 'Render.com deployment config',
      content: `services:
  - type: web
    name: zeril-telegram-bot
    env: python
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: python bot.py
    envVars:
      - key: TELEGRAM_BOT_TOKEN
        value: 8048986424:AAE37IBwkCzE5oKtGCdN-mnnsMrcrlzGWUQ
      - key: HUGGINGFACE_API_KEY  
        value: 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
      - key: PYTHON_VERSION
        value: 3.11.0`
    },
    procfile: {
      name: 'Procfile',
      description: 'Heroku process file',
      content: `web: python bot.py
worker: python bot.py`
    },
    railway: {
      name: 'railway.json',
      description: 'Railway deployment config',
      content: `{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "python bot.py",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}`
    },
    env: {
      name: '.env.example',
      description: 'Environment variables template',
      content: `# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=8048986424:AAE37IBwkCzE5oKtGCdN-mnnsMrcrlzGWUQ

# Hugging Face API Key
HUGGINGFACE_API_KEY=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

# Bot Configuration
BOT_NAME=ZERIL
OWNER_TAG=@ash_yv
HINGLISH_RATIO=0.6

# Optional: Database URL (for future features)
# DATABASE_URL=postgresql://username:password@host:port/database

# Optional: Redis URL (for caching)
# REDIS_URL=redis://localhost:6379`
    }
  };

  const downloadFile = (filename: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded! 📥",
      description: `${filename} has been downloaded`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold">8 Files Ready</h3>
            <p className="text-sm text-muted-foreground">Complete deployment package</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Badge variant="outline" className="mb-2">Python 3.11</Badge>
            <h3 className="font-semibold">AI Powered</h3>
            <p className="text-sm text-muted-foreground">HuggingFace Transformers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Badge variant="outline" className="mb-2">100% Free</Badge>
            <h3 className="font-semibold">Ready to Deploy</h3>
            <p className="text-sm text-muted-foreground">Render, Railway, Heroku</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📁 Project Files</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeFile} onValueChange={setActiveFile}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
              <TabsTrigger value="bot" className="text-xs">bot.py</TabsTrigger>
              <TabsTrigger value="requirements" className="text-xs">requirements.txt</TabsTrigger>
              <TabsTrigger value="dockerfile" className="text-xs">Dockerfile</TabsTrigger>
              <TabsTrigger value="render" className="text-xs">render.yaml</TabsTrigger>
              <TabsTrigger value="procfile" className="text-xs">Procfile</TabsTrigger>
              <TabsTrigger value="railway" className="text-xs">railway.json</TabsTrigger>
              <TabsTrigger value="env" className="text-xs">.env</TabsTrigger>
            </TabsList>

            {Object.entries(files).map(([key, file]) => (
              <TabsContent key={key} value={key} className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{file.name}</h3>
                      <p className="text-sm text-muted-foreground">{file.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(file.content)}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => downloadFile(file.name, file.content)}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {file.content}
                    </pre>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🚀 Quick Setup Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Create a new GitHub repository</li>
            <li>Copy each file content into corresponding files in your repo</li>
            <li>Push to GitHub</li>
            <li>Deploy on Render/Railway (see Deploy tab)</li>
            <li>Set environment variables in your deployment platform</li>
            <li>Your ZERIL bot is live! 🎉</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};
