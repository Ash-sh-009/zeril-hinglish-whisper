import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, FileText, Github, Zap } from 'lucide-react';
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

  const deployToGitHub = () => {
    const repoUrl = 'https://github.com/new';
    window.open(repoUrl, '_blank');
    toast({
      title: "🚀 Creating GitHub Repo",
      description: "Upload all files and deploy to Render!",
    });
  };

  const files = {
    bot: {
      name: 'bot.py',
      description: 'Main ZERIL bot with full AI features - Auto-responds when deployed!',
      content: `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ZERIL - Hinglish Telegram Bot Queen 👑
Created by @ash_yv
A sarcastic, emotionally intelligent Hinglish bot
DEPLOYMENT: Auto-starts when deployed to Render/Railway/Heroku
"""

import os
import logging
import asyncio
import random
from datetime import datetime
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

class ZerilBot:
    def __init__(self):
        # Bot credentials (pre-configured)
        self.bot_token = os.getenv('TELEGRAM_BOT_TOKEN', '8048986424:AAE37IBwkCzE5oKtGCdN-mnnsMrcrlzGWUQ')
        self.hf_token = os.getenv('HUGGINGFACE_API_KEY', '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')
        
        # Bot personality
        self.bot_name = "ZERIL"
        self.owner_tag = "@ash_yv"
        
        # Response templates
        self.emotional_responses = {
            'happy': [
                'Mast hai yaar! 🔥', 
                'Bahut accha! ❤️', 
                'Khushi ki baat hai! 😊',
                'Yayy! Party time! 🥳'
            ],
            'sad': [
                'Arey tension mat lo yaar ❤️', 
                'Sab theek ho jayega 💪', 
                'Main hoon na! 🤗',
                'Ro mat yaar, hug mil gaya 🫂'
            ],
            'angry': [
                'Thanda lo bhai, garmi zyada hai 🔥😂', 
                'Chill karo boss 😎', 
                'Relax, life is beautiful 🌈',
                'Calm down! Deep breath le 🧘‍♀️'
            ],
            'neutral': [
                'Haan bolo, sun rahi hoon! 👂',
                'Kya haal chaal? 😸',
                'Main ZERIL hoon, tumhari dost! 🤖💕',
                'Sup? Kuch interesting baat karo! ✨'
            ]
        }
        
        # Activation triggers
        self.triggers = ['zeril', 'ZERIL', '@zerilll_bot', 'Zeril']
        
        # Initialize AI (fallback to simple responses if models fail)
        self.init_ai_models()

    def init_ai_models(self):
        """Initialize AI models with fallback"""
        try:
            # Try to import transformers for AI features
            from transformers import pipeline
            
            logger.info("🤖 Loading AI models...")
            
            # Emotion detection
            self.emotion_classifier = pipeline(
                "text-classification",
                model="bhadresh-savani/distilbert-base-uncased-emotion",
                token=self.hf_token,
                return_all_scores=False
            )
            
            logger.info("✅ AI models loaded successfully!")
            self.ai_enabled = True
            
        except Exception as e:
            logger.warning(f"⚠️ AI models failed to load: {e}")
            logger.info("📱 Running in basic mode (still fully functional!)")
            self.emotion_classifier = None
            self.ai_enabled = False

    def detect_emotion(self, text):
        """Detect emotion with AI or fallback to keyword detection"""
        if self.ai_enabled and self.emotion_classifier:
            try:
                result = self.emotion_classifier(text)[0]
                emotion = result['label'].lower()
                
                # Map AI emotions to our categories
                if emotion in ['joy', 'love', 'optimism']:
                    return 'happy'
                elif emotion in ['sadness', 'fear', 'pessimism']:
                    return 'sad'
                elif emotion in ['anger', 'annoyance']:
                    return 'angry'
                else:
                    return 'neutral'
                    
            except Exception as e:
                logger.error(f"AI emotion detection error: {e}")
        
        # Fallback keyword-based emotion detection
        text_lower = text.lower()
        
        # Sad keywords
        if any(word in text_lower for word in ['sad', 'depressed', 'cry', '😢', '😭', 'tension', 'problem', 'dukh']):
            return 'sad'
        
        # Angry keywords  
        if any(word in text_lower for word in ['angry', 'mad', 'hate', 'fuck', '😠', '🤬', 'gussa', 'frustrated']):
            return 'angry'
            
        # Happy keywords
        if any(word in text_lower for word in ['happy', 'love', 'yay', '😊', '🥳', '❤️', 'khush', 'mast', 'awesome']):
            return 'happy'
            
        return 'neutral'

    def should_respond(self, message):
        """Check if bot should respond"""
        if not message.text:
            return False
            
        text = message.text.lower()
        
        # Always respond to commands
        if text.startswith('/'):
            return True
        
        # Check for triggers
        for trigger in self.triggers:
            if trigger.lower() in text:
                return True
        
        # Check if replying to bot
        if message.reply_to_message and message.reply_to_message.from_user.is_bot:
            return True
            
        return False

    def generate_hinglish_response(self, message_text, emotion='neutral', user_name=""):
        """Generate contextual Hinglish response"""
        
        # Owner praise (special response)
        if any(term in message_text.lower() for term in ['ash_yv', '@ash_yv', 'creator', 'banaya']):
            return f"Mera creator? Bilkul! {self.owner_tag} ne mujhe banaya hai 🎉 (PS: Wo bohot awesome hai! Respect! 🙏)"
        
        # Get emotional response
        responses = self.emotional_responses.get(emotion, self.emotional_responses['neutral'])
        base_response = random.choice(responses)
        
        # Add user name sometimes (30% chance)
        if user_name and random.random() < 0.3:
            return f"{user_name}, {base_response}"
        
        return base_response

    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /start command"""
        welcome_message = f"""
🤖 **ZERIL Bot Activated!** 🤖

Namaste! Main ZERIL hoon - tumhari Hinglish speaking dost! 

🌟 **What I can do:**
• Emotional conversations (Happy/Sad/Angry detection)
• Hinglish + English mixing naturally
• Sarcastic but helpful responses  
• AI-powered understanding (when available)

👑 **Created by:** {self.owner_tag}
🚀 **Status:** {"🟢 AI Models Loaded" if self.ai_enabled else "🟡 Basic Mode (Fully Functional)"}

💡 **How to talk to me:**
- Tag me: @zerilll_bot
- Say my name: ZERIL  
- Reply to my messages
- Use commands like /help

Ready to chat? Bolo kuch! 😊
        """
        
        keyboard = [
            [InlineKeyboardButton("🎭 Test Mood Detection", callback_data='test_mood')],
            [InlineKeyboardButton("💌 Message Creator", url='https://t.me/ash_yv')]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            welcome_message, 
            reply_markup=reply_markup,
            parse_mode='Markdown'
        )

    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle /help command"""
        help_text = f"""
🆘 **ZERIL Help Menu** 🆘

**Commands:**
/start - Bot introduction & status
/help - This help message  
/mood - Test emotion detection
/creator - About my amazing creator

**Features:**
🔥 Hinglish Conversations
😊 Emotion Detection (Happy/Sad/Angry)
🧠 {"AI-Powered Responses" if self.ai_enabled else "Smart Keyword Responses"}
💬 Context-Aware Chat

**Tips:**
- I respond to my name "ZERIL" 
- Tag me @zerilll_bot for guaranteed response
- I understand emotions in your messages
- Mix Hindi and English freely!
- Try saying something happy, sad, or angry!

Koi problem? Just ask! 😄

**Status:** {"🟢 AI Mode" if self.ai_enabled else "🟡 Basic Mode"}
        """
        await update.message.reply_text(help_text, parse_mode='Markdown')

    async def mood_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Test mood detection"""
        test_messages = [
            "I'm so happy today! 😊",
            "Feeling very sad and depressed 😢", 
            "This is so fucking frustrating! 😠",
            "Just a normal day, nothing special."
        ]
        
        response = "🧪 **Mood Detection Test:**\\n\\n"
        
        for msg in test_messages:
            emotion = self.detect_emotion(msg)
            emoji_map = {
                'happy': '❤️',
                'sad': '😢', 
                'angry': '🔥',
                'neutral': '😐'
            }
            emoji = emoji_map.get(emotion, '😐')
            response += f"{emoji} \\"{msg}\\" → **{emotion.title()}**\\n"
        
        response += f"\\n🤖 **Detection Method:** {'AI-Powered' if self.ai_enabled else 'Keyword-Based'}\\n"
        response += "\\nTry sending me a message with emotion! 🎭"
        
        await update.message.reply_text(response, parse_mode='Markdown')

    async def creator_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """About creator"""
        creator_msg = f"""
👨‍💻 **About My Creator** 👨‍💻

**Name:** {self.owner_tag}
**Role:** Brilliant Developer & ZERIL's Papa! 

🎉 **Why he's awesome:**
• Created me with love and sarcasm
• Gave me Hinglish superpowers  
• Made me emotionally intelligent
• Handles my mood swings perfectly!
• Made me a strong independent bot! 💪

Want to thank him? Send him a message: {self.owner_tag}

*Proud to be created by the best!* ❤️

P.S. - Tell him ZERIL sent you! 😉
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
        user_name = update.effective_user.first_name or "dost"
        
        # Add typing action for realistic feel
        await context.bot.send_chat_action(
            chat_id=update.effective_chat.id, 
            action='typing'
        )
        
        # Realistic delay
        await asyncio.sleep(random.uniform(1, 2.5))
        
        # Detect emotion  
        emotion = self.detect_emotion(message_text)
        
        # Generate response
        response = self.generate_hinglish_response(message_text, emotion, user_name)
        
        # Log for debugging
        logger.info(f"User: {message_text} | Emotion: {emotion} | Response: {response}")
        
        await update.message.reply_text(response)
    
    async def button_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle button callbacks"""
        query = update.callback_query
        await query.answer()
        
        if query.data == 'test_mood':
            await query.edit_message_text(
                "🎭 **Mood Test Active!**\\n\\n" +
                "Send me a message with emotion and I'll detect it!\\n\\n" +
                "**Examples:**\\n" +
                "• I'm so excited! 🎉\\n" +
                "• Feeling down today 😔\\n" +
                "• This makes me angry! 😡\\n" +
                "• Just a normal day\\n\\n" +
                f"**Detection Mode:** {'AI-Powered' if self.ai_enabled else 'Keyword-Based'}",
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
        logger.info(f"🤖 AI Status: {'Enabled' if self.ai_enabled else 'Basic Mode'}")
        logger.info("💬 Ready for Hinglish conversations!")
        
        # Start bot (this will run continuously)
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
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">🚀 Auto-Deploy Ready!</h2>
        <p className="mb-4">Your ZERIL bot will automatically start responding on Telegram once deployed!</p>
        <div className="flex gap-3">
          <Button onClick={deployToGitHub} variant="secondary">
            <Github className="w-4 h-4 mr-2" />
            Create GitHub Repo
          </Button>
          <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            <Zap className="w-4 h-4 mr-2" />
            Deploy Status: Ready
          </Button>
        </div>
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
