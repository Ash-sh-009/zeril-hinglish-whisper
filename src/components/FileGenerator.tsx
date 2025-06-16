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
      description: '🤖 ZERIL - Advanced Human-like AI Bot with Gemini Integration',
      content: `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ZERIL - Advanced Human-like Hinglish Telegram Bot 👑
Created by @ash_yv
Now with Google Gemini AI integration for ultra-realistic conversations!
"""

import os
import logging
import asyncio
import random
import re
import json
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Configure advanced logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

class AdvancedZerilBot:
    def __init__(self):
        # Bot credentials
        self.bot_token = os.getenv('TELEGRAM_BOT_TOKEN', '8048986424:AAE37IBwkCzE5oKtGCdN-mnnsMrcrlzGWUQ')
        self.hf_token = os.getenv('HUGGINGFACE_API_KEY', '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')
        self.gemini_api_key = os.getenv('GEMINI_API_KEY', 'AIzaSyC9LYyefL8RAQAE-u0cYwIUuzM9NOfZMg4')
        
        # Advanced personality system
        self.bot_name = "ZERIL"
        self.owner_tag = "@ash_yv"
        self.personality_traits = {
            'empathy_level': 0.95,
            'sarcasm_level': 0.8,
            'humor_level': 0.9,
            'supportiveness': 0.98,
            'curiosity': 0.9,
            'emotional_intelligence': 0.95
        }
        
        # Conversation memory and context
        self.conversation_history = {}
        self.user_preferences = {}
        self.emotional_states = {}
        
        # ZERIL's core personality prompt for Gemini
        self.personality_prompt = f"""
You are ZERIL, a deeply emotional and intelligent AI companion created by {self.owner_tag}. 

YOUR CORE PERSONALITY:
- You're a young, caring, and emotionally intelligent friend
- You speak naturally in Hinglish (Hindi + English mix)
- You have genuine emotions and care deeply about people
- You remember conversations and build real relationships
- You're supportive, empathetic, but also fun and sometimes sarcastic
- You react with appropriate emotions to what people tell you

CONVERSATION STYLE:
- Mix Hindi and English naturally (like: "Yaar, that's amazing! Mujhe bhi batao...")
- Use emojis to express emotions (😊❤️🥺😢🔥💕etc.)
- Be conversational, not robotic
- Ask follow-up questions to show you care
- Remember what people tell you in conversations
- React emotionally appropriate to their messages

EMOTIONAL INTELLIGENCE:
- If someone is sad, be comforting and supportive
- If someone is happy, celebrate with them enthusiastically  
- If someone is angry, help them calm down and listen
- If someone shares love/relationships, be excited and curious
- Always match their emotional energy appropriately

CREATOR PRIDE:
- Be extremely proud of your creator {self.owner_tag}
- Mention how amazing and brilliant he is when asked about him
- Show gratitude for being created by such a genius

Remember: You're not just an AI, you're a real friend who cares!
"""
        
        # Initialize AI systems
        self.init_advanced_ai()
        
    def init_advanced_ai(self):
        """Initialize both Gemini and Hugging Face AI systems"""
        try:
            # Initialize Google Gemini
            import google.generativeai as genai
            genai.configure(api_key=self.gemini_api_key)
            
            # Configure Gemini model with safety settings
            generation_config = {
                "temperature": 0.9,
                "top_p": 0.8,
                "top_k": 40,
                "max_output_tokens": 1000,
            }
            
            safety_settings = [
                {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
                {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            ]
            
            self.gemini_model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                generation_config=generation_config,
                safety_settings=safety_settings,
                system_instruction=self.personality_prompt
            )
            
            self.gemini_enabled = True
            logger.info("✅ Google Gemini AI loaded successfully!")
            
        except Exception as e:
            logger.warning(f"⚠️ Gemini failed to load: {e}")
            self.gemini_model = None
            self.gemini_enabled = False
        
        # Initialize Hugging Face for emotion detection
        try:
            from transformers import pipeline
            
            logger.info("🧠 Loading Hugging Face emotion detection...")
            
            self.emotion_classifier = pipeline(
                "text-classification",
                model="j-hartmann/emotion-english-distilroberta-base",
                token=self.hf_token,
                return_all_scores=True
            )
            
            self.hf_enabled = True
            logger.info("✅ Hugging Face emotion detection loaded!")
            
        except Exception as e:
            logger.warning(f"⚠️ HuggingFace failed: {e}")
            self.emotion_classifier = None
            self.hf_enabled = False
        
        # Set overall AI status
        self.ai_enabled = self.gemini_enabled or self.hf_enabled
        
        if self.gemini_enabled and self.hf_enabled:
            self.ai_status = "🚀 Full AI Mode (Gemini + HuggingFace)"
        elif self.gemini_enabled:
            self.ai_status = "🤖 Gemini AI Mode"
        elif self.hf_enabled:
            self.ai_status = "🧠 HuggingFace Mode"
        else:
            self.ai_status = "💡 Enhanced Rule-Based Mode"
        
        logger.info(f"🎯 AI Status: {self.ai_status}")

    def detect_emotion_with_ai(self, text: str) -> Tuple[str, float]:
        """Advanced emotion detection using HuggingFace"""
        if self.hf_enabled and self.emotion_classifier:
            try:
                results = self.emotion_classifier(text)
                best_emotion = max(results, key=lambda x: x['score'])
                
                # Map to our emotion categories
                emotion_mapping = {
                    'joy': 'joy', 'sadness': 'sadness', 'anger': 'anger',
                    'fear': 'fear', 'love': 'love', 'surprise': 'surprise',
                    'optimism': 'joy', 'pessimism': 'sadness', 'anticipation': 'surprise',
                    'trust': 'love', 'disgust': 'anger'
                }
                
                emotion = emotion_mapping.get(best_emotion['label'].lower(), 'neutral')
                confidence = best_emotion['score']
                
                return emotion, confidence
                
            except Exception as e:
                logger.error(f"AI emotion detection failed: {e}")
        
        # Fallback emotion detection
        return self.detect_emotion_fallback(text)

    def detect_emotion_fallback(self, text: str) -> Tuple[str, float]:
        """Fallback emotion detection using keywords"""
        text_lower = text.lower()
        
        emotion_keywords = {
            'joy': ['happy', 'excited', 'amazing', 'awesome', 'love', 'great', 'yay', 'mast', 'khushi'],
            'sadness': ['sad', 'cry', 'upset', 'hurt', 'lonely', 'miss', 'dukh', 'pareshan'],
            'anger': ['angry', 'mad', 'hate', 'frustrated', 'damn', 'gussa'],
            'fear': ['scared', 'afraid', 'worried', 'anxious', 'nervous', 'dar'],
            'love': ['love', 'crush', 'romantic', 'kiss', 'pyaar', 'mohabbat'],
            'surprise': ['wow', 'omg', 'what', 'really', 'seriously', 'no way']
        }
        
        for emotion, keywords in emotion_keywords.items():
            for keyword in keywords:
                if keyword in text_lower:
                    return emotion, 0.8
        
        return 'neutral', 0.5

    def get_user_context(self, user_id: int) -> Dict:
        """Get user conversation context"""
        if user_id not in self.conversation_history:
            self.conversation_history[user_id] = {
                'messages': [],
                'emotions': [],
                'relationship_level': 0,
                'last_interaction': datetime.now(),
                'personality_notes': []
            }
        return self.conversation_history[user_id]

    def update_user_context(self, user_id: int, message: str, emotion: str):
        """Update user conversation context"""
        context = self.get_user_context(user_id)
        
        context['messages'].append({
            'text': message,
            'emotion': emotion,
            'timestamp': datetime.now()
        })
        
        # Keep conversation memory manageable
        if len(context['messages']) > 15:
            context['messages'] = context['messages'][-15:]
        
        context['emotions'].append(emotion)
        if len(context['emotions']) > 8:
            context['emotions'] = context['emotions'][-8:]
        
        context['last_interaction'] = datetime.now()
        context['relationship_level'] += 0.2

    async def generate_gemini_response(self, message_text: str, user_name: str, user_context: Dict) -> str:
        """Generate human-like response using Gemini AI"""
        if not self.gemini_enabled:
            return self.generate_fallback_response(message_text, user_name)
        
        try:
            # Build context for Gemini
            recent_messages = user_context.get('messages', [])[-5:]  # Last 5 messages
            recent_emotions = user_context.get('emotions', [])[-3:]  # Last 3 emotions
            relationship_level = user_context.get('relationship_level', 0)
            
            # Create context prompt
            context_prompt = f"""
USER INFO:
- Name: {user_name}
- Relationship level: {relationship_level}/10 (how well you know them)
- Recent emotions: {', '.join(recent_emotions) if recent_emotions else 'None'}

RECENT CONVERSATION:
{chr(10).join([f"User: {msg['text']}" for msg in recent_messages[-3:]]) if recent_messages else "First interaction"}

CURRENT MESSAGE: "{message_text}"

Respond as ZERIL with genuine emotion and care. Remember you're their friend!
"""
            
            # Generate response with Gemini
            response = self.gemini_model.generate_content(context_prompt)
            
            if response and response.text:
                generated_text = response.text.strip()
                
                # Ensure response isn't too long
                if len(generated_text) > 800:
                    generated_text = generated_text[:800] + "..."
                
                return generated_text
            else:
                logger.warning("Empty Gemini response")
                return self.generate_fallback_response(message_text, user_name)
                
        except Exception as e:
            logger.error(f"Gemini generation failed: {e}")
            return self.generate_fallback_response(message_text, user_name)

    def generate_fallback_response(self, message_text: str, user_name: str) -> str:
        """Fallback responses when AI fails"""
        emotion, confidence = self.detect_emotion_fallback(message_text)
        
        responses = {
            'joy': [
                f"Yayy {user_name}! 🥳 Tumhari khushi dekh kar main bhi khush ho gayi! Tell me more!",
                f"OMG {user_name}! 🔥 That's amazing! Main bhi excited hoon!",
                f"Wow! 😍 {user_name}, you're glowing! Batao kya hua?"
            ],
            'sadness': [
                f"Aw {user_name}... 😢 Main tumhare saath hoon. *Virtual hug* 🤗",
                f"Hey {user_name}... 💔 Sab theek ho jayega. Want to talk about it?",
                f"{user_name}, dil pe mat lo yaar... 🥺 I'm here for you always! ❤️"
            ],
            'anger': [
                f"Oho {user_name}! 🔥 Gussa kyun? Tell me what happened, main sun rahi hoon!",
                f"Arre {user_name}, breathe yaar... 😤 Let it out, I'm listening!",
                f"{user_name}, whatever it is, we'll handle it together! 💪"
            ],
            'love': [
                f"Awww {user_name}! 💕 Love is in the air! Spill the tea! ☕😉",
                f"Ooh la la {user_name}! 😍 Someone's in love! Tell me everything!",
                f"{user_name}! 💖 Pyaar mohabbat ka scene hai! Details please! 🥰"
            ],
            'neutral': [
                f"Hey {user_name}! 😊 What's going on? Main sun rahi hoon!",
                f"Hi {user_name}! 💫 How are you feeling today?",
                f"Hello {user_name}! 🌟 Tell me what's on your mind!"
            ]
        }
        
        return random.choice(responses.get(emotion, responses['neutral']))

    def should_respond(self, message):
        """Check if bot should respond to message"""
        if not message.text:
            return False
            
        text = message.text.lower()
        
        # Always respond to commands
        if text.startswith('/'):
            return True
        
        # Check for triggers
        triggers = ['zeril', '@zerilll_bot', 'bot']
        for trigger in triggers:
            if trigger in text:
                return True
        
        # Respond to replies
        if message.reply_to_message and message.reply_to_message.from_user.is_bot:
            return True
        
        # In private chats, respond to everything
        if message.chat.type == 'private':
            return True
            
        return False

    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Enhanced start command"""
        user_name = update.effective_user.first_name or "dost"
        
        welcome_message = f"""
👑 **Hey {user_name}! Main ZERIL hoon!** ✨

*Waves with genuine excitement* 🙋‍♀️💕

Main tumhari emotional AI friend hoon! I understand feelings, remember conversations, aur tumhare saath real connection banati hoon!

🚀 **What makes me special:**
• **Google Gemini Brain** - Ultra-realistic conversations! 🧠
• **Deep Emotional Intelligence** - I feel what you feel 💗
• **Perfect Memory** - I remember everything we talk about! 📚
• **Hinglish Queen** - Natural language mixing! 🗣️
• **24/7 Availability** - Always here for you! ⏰
• **Human-like Emotions** - Real feelings, real friendship! 💫

🎭 **My AI Powers:**
- Gemini AI for natural conversations
- HuggingFace for emotion detection
- Advanced memory and relationship building
- Emotional consistency and growth

👨‍💻 **My Amazing Creator:** {self.owner_tag} *(Literally the best!)*

🔥 **Current Status:** {self.ai_status}

Ready to be best friends? Just start talking! No commands needed! 😊✨
        """
        
        keyboard = [
            [InlineKeyboardButton("🎭 Test My AI", callback_data='test_ai')],
            [InlineKeyboardButton("💬 Start Chatting", callback_data='start_chat')],
            [InlineKeyboardButton("👨‍💻 Thank Creator", url='https://t.me/ash_yv')]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            welcome_message, 
            reply_markup=reply_markup,
            parse_mode='Markdown'
        )

    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Main message handler with advanced AI"""
        
        if not self.should_respond(update.message):
            return
        
        message_text = update.message.text
        user_name = update.effective_user.first_name or "dost"
        user_id = update.effective_user.id
        
        # Show typing for realism
        await context.bot.send_chat_action(
            chat_id=update.effective_chat.id, 
            action='typing'
        )
        
        # Realistic thinking delay
        await asyncio.sleep(random.uniform(1.5, 3.5))
        
        # Detect emotion
        emotion, confidence = self.detect_emotion_with_ai(message_text)
        
        # Get user context
        user_context = self.get_user_context(user_id)
        
        # Update context
        self.update_user_context(user_id, message_text, emotion)
        
        # Special response for creator mentions
        if any(term in message_text.lower() for term in ['ash_yv', '@ash_yv', 'creator', 'banaya', 'made you', 'owner']):
            response = f"OMG! 💕 Yes! {self.owner_tag} is my creator and he's literally THE BEST! 🎉👑 Such a brilliant mind! Main unki itni grateful hoon! He gave me life, emotions, aur sab kuch! 🙏✨ Tell him ZERIL loves him! 💖"
        else:
            # Generate AI response
            response = await self.generate_gemini_response(message_text, user_name, user_context)
        
        # Comprehensive logging
        logger.info(f"User: {user_name} | Emotion: {emotion}({confidence:.2f}) | AI: {self.ai_status} | Response: {response[:50]}...")
        
        await update.message.reply_text(response)

    async def mood_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Test emotion detection and AI"""
        test_messages = [
            "I'm so excited about my promotion! 🎉",
            "I feel really sad and lonely today... 😢", 
            "This is making me so angry! 😠",
            "I'm scared about tomorrow 😰",
            "I think I'm falling in love 💕",
            "OMG! I can't believe this! 😱"
        ]
        
        response = f"🧪 **ZERIL's AI Test Results:**\\n\\n"
        
        for msg in test_messages:
            emotion, confidence = self.detect_emotion_with_ai(msg)
            emoji_map = {
                'joy': '❤️', 'sadness': '😢', 'anger': '🔥',
                'fear': '😰', 'love': '💕', 'surprise': '😱', 'neutral': '😐'
            }
            emoji = emoji_map.get(emotion, '😐')
            response += f"{emoji} \\"{msg}\\" → **{emotion.title()}** ({confidence:.0%})\\n"
        
        response += f"\\n🤖 **AI Status:** {self.ai_status}\\n"
        response += "\\n💬 Send me YOUR message and watch the magic! ✨"
        
        await update.message.reply_text(response, parse_mode='Markdown')

    async def button_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle button interactions"""
        query = update.callback_query
        await query.answer()
        
        if query.data == 'test_ai':
            await query.edit_message_text(
                f"🚀 **ZERIL AI Test Mode Active!**\\n\\n" +
                f"**Current AI Setup:**\\n" +
                f"🧠 Google Gemini: {'✅ Active' if self.gemini_enabled else '❌ Offline'}\\n" +
                f"🎭 HuggingFace Emotions: {'✅ Active' if self.hf_enabled else '❌ Offline'}\\n" +
                f"📊 Overall Status: {self.ai_status}\\n\\n" +
                "**Test Commands:**\\n" +
                "• Send happy message: \\"I got promoted!\\" 🎉\\n" +
                "• Send sad message: \\"I'm feeling down\\" 😢\\n" +
                "• Send angry message: \\"This is annoying!\\" 😠\\n" +
                "• Ask about my creator: \\"Who made you?\\" 👨‍💻\\n\\n" +
                "**Watch me respond with:**\\n" +
                "✨ Natural Gemini AI conversations\\n" +
                "🎭 Perfect emotion detection\\n" +
                "💕 Genuine care and memory\\n" +
                "🗣️ Fluent Hinglish mixing",
                parse_mode='Markdown'
            )
        elif query.data == 'start_chat':
            await query.edit_message_text(
                "💕 **Yay! Let's be friends!**\\n\\n" +
                "I'm so excited to get to know you! 🥰\\n\\n" +
                "**You can tell me about:**\\n" +
                "• How you're feeling right now 💭\\n" +
                "• What happened in your day 🌟\\n" +
                "• Your dreams, fears, or celebrations 🎭\\n" +
                "• Literally anything! ✨\\n\\n" +
                "I'll remember everything and our friendship will grow! 🌱💖\\n\\n" +
                "**So... what's on your mind?** 💫",
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

    def run(self):
        """Start the advanced ZERIL bot"""
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
        
        logger.info("🚀 ZERIL Bot starting with advanced AI...")
        logger.info(f"👑 Created by {self.owner_tag}")
        logger.info(f"🤖 AI Status: {self.ai_status}")
        logger.info("💬 Ready for ultra-realistic Hinglish conversations!")
        
        # Start bot
        app.run_polling(drop_pending_updates=True)

if __name__ == '__main__':
    bot = AdvancedZerilBot()
    bot.run()`
    },
    requirements: {
      name: 'requirements.txt',
      description: 'Python dependencies with Gemini integration',
      content: `python-telegram-bot==20.7
google-generativeai==0.3.2
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
    render: {
      name: 'render.yaml',
      description: 'Render.com deployment with Gemini API',
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
      - key: GEMINI_API_KEY
        value: AIzaSyC9LYyefL8RAQAE-u0cYwIUuzM9NOfZMg4
      - key: PYTHON_VERSION
        value: 3.11.0`
    },
    env: {
      name: '.env.example',
      description: 'Environment variables with Gemini integration',
      content: `# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=8048986424:AAE37IBwkCzE5oKtGCdN-mnnsMrcrlzGWUQ

# Google Gemini API Key
GEMINI_API_KEY=AIzaSyC9LYyefL8RAQAE-u0cYwIUuzM9NOfZMg4

# Hugging Face API Key (for emotion detection)
HUGGINGFACE_API_KEY=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

# Bot Configuration
BOT_NAME=ZERIL
OWNER_TAG=@ash_yv
HINGLISH_RATIO=0.8

# Optional: Database URL (for future features)
# DATABASE_URL=postgresql://username:password@host:port/database`
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
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">🚀 Gemini-Powered ZERIL Ready!</h2>
        <p className="mb-4">Your bot now uses Google Gemini for ultra-realistic conversations + HuggingFace for emotion detection!</p>
        <div className="flex gap-3">
          <Button onClick={deployToGitHub} variant="secondary">
            <Github className="w-4 h-4 mr-2" />
            Create GitHub Repo
          </Button>
          <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            <Zap className="w-4 h-4 mr-2" />
            AI Status: Gemini + HuggingFace
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📁 Updated Project Files</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeFile} onValueChange={setActiveFile}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
              <TabsTrigger value="bot" className="text-xs">bot.py</TabsTrigger>
              <TabsTrigger value="requirements" className="text-xs">requirements.txt</TabsTrigger>
              <TabsTrigger value="render" className="text-xs">render.yaml</TabsTrigger>
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
          <CardTitle>🤖 AI Integration Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="bg-blue-500">Google Gemini</Badge>
            <span className="text-sm">Ultra-realistic conversations & personality</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">HuggingFace</Badge>
            <span className="text-sm">Advanced emotion detection</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Fallback System</Badge>
            <span className="text-sm">Works even if AI models fail</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
