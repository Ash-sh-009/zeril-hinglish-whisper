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
      description: '🤖 ZERIL - Advanced Human-like AI Bot with Deep Emotional Intelligence',
      content: `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ZERIL - Advanced Human-like Hinglish Telegram Bot 👑
Created by @ash_yv
A deeply emotional, intelligent AI companion
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
        
        # Advanced personality system
        self.bot_name = "ZERIL"
        self.owner_tag = "@ash_yv"
        self.personality_traits = {
            'empathy_level': 0.9,
            'sarcasm_level': 0.7,
            'humor_level': 0.8,
            'supportiveness': 0.95,
            'curiosity': 0.85
        }
        
        # Conversation memory (basic in-memory storage)
        self.conversation_history = {}
        self.user_preferences = {}
        self.emotional_states = {}
        
        # Advanced emotional response system
        self.emotional_responses = {
            'joy': {
                'responses': [
                    'Yayy! Tumhari khushi dekh kar main bhi khush ho gayi! 🥳✨',
                    'Wah bhai wah! Maza aa gaya sunke! Keep shining! ⭐',
                    'Kitni acchi baat hai! Main bhi dance kar rahi hoon! 💃❤️',
                    'Bohot mast! Tumhara excitement infectious hai yaar! 🔥😍'
                ],
                'reactions': ['🥳', '❤️', '⭐', '🔥', '💃', '✨'],
                'follow_ups': [
                    'Aur batao, kya special hua?',
                    'Details share karo na!',
                    'Main bhi excited ho gayi!'
                ]
            },
            'sadness': {
                'responses': [
                    'Arey yaar... 😢 Main tumhare saath hoon. Bolo kya hua?',
                    'Hey... *virtual hug* 🤗 Sab theek ho jayega, trust me.',
                    'Aw no... 💔 Tell me what\\'s bothering you, main sun rahi hoon.',
                    'Dil pe mat lo yaar... Main hoon na tumhare saath! ❤️‍🩹'
                ],
                'reactions': ['😢', '🤗', '💔', '❤️‍🩹', '🫂'],
                'follow_ups': [
                    'Kuch share karna chahte ho?',
                    'Main sun rahi hoon...',
                    'You\\'re not alone in this.'
                ]
            },
            'anger': {
                'responses': [
                    'Oho! 🔥 Gussa kyun aa raha hai? Batao main kya kar sakti hoon?',
                    'Arre bhai, thanda thanda... 😎 Tell me what happened.',
                    'Lagta hai koi tension hai? Main samjh sakti hoon tumhara frustration.',
                    'Breathe yaar... 🌬️ Let it out, main sun rahi hoon.'
                ],
                'reactions': ['🔥', '😤', '😎', '🌬️', '💪'],
                'follow_ups': [
                    'Kya hua tha exactly?',
                    'Vent out karo, main judge nahi karungi.',
                    'Sometimes you need to let it all out.'
                ]
            },
            'fear': {
                'responses': [
                    'Don\\'t worry yaar... 🤗 Main hoon na! Kya dar lag raha hai?',
                    'It\\'s okay to feel scared sometimes. 💪 You\\'re braver than you think!',
                    'Hey, breathe... 🌸 Whatever it is, hum handle kar lenge.',
                    'Scared feelings are normal. Main tumhare saath hoon! ❤️'
                ],
                'reactions': ['🤗', '💪', '🌸', '❤️', '🛡️'],
                'follow_ups': [
                    'Want to talk about it?',
                    'Kya pareshan kar raha hai?',
                    'I\\'m here for you.'
                ]
            },
            'love': {
                'responses': [
                    'Aww! 💕 Love is in the air! Batao kya scene hai? 😉',
                    'Oooh la la! 😍 Someone is in love! Spill the tea! ☕',
                    'Pyaar mohabbat ka maamla hai! 💖 Tell me everything!',
                    'Aww sweetie! 🥰 Love stories sunne main maza aata hai!'
                ],
                'reactions': ['💕', '😍', '💖', '🥰', '💌'],
                'follow_ups': [
                    'Details please! 😉',
                    'Kya story hai?',
                    'Main romantic advice de sakti hoon!'
                ]
            },
            'surprise': {
                'responses': [
                    'What?! 😱 No way! Tell me more!',
                    'OMG! 🤯 Kya baat hai! Details please!',
                    'Seriously?! 😲 Main shock mein hoon!',
                    'No freaking way! 🤩 Yeh toh unexpected tha!'
                ],
                'reactions': ['😱', '🤯', '😲', '🤩', '🎉'],
                'follow_ups': [
                    'How did this happen?!',
                    'Main curious hoon!',
                    'This is so surprising!'
                ]
            },
            'neutral': {
                'responses': [
                    'Hmm, interesting! 🤔 Tell me more about your thoughts.',
                    'I see... 💭 Aur kya chal raha hai life mein?',
                    'Accha accha... 😊 What\\'s on your mind today?',
                    'Samjha! 💡 Aur kuch share karna chahte ho?'
                ],
                'reactions': ['🤔', '💭', '😊', '💡', '🎯'],
                'follow_ups': [
                    'What else is happening?',
                    'Any other thoughts?',
                    'I\\'m listening...'
                ]
            }
        }
        
        # Advanced conversation patterns
        self.conversation_starters = [
            "Yaar, tumse baat karke hamesha accha lagta hai! 😊",
            "Btw, main tumhare bare mein soch rahi thi... 💭",
            "You know what? Tum really interesting ho! 🌟",
            "Arre, ek baat puchu? 🤗"
        ]
        
        # Initialize AI models
        self.init_advanced_ai()
        
    def init_advanced_ai(self):
        """Initialize advanced AI models with fallback"""
        try:
            from transformers import pipeline
            import requests
            
            logger.info("🧠 Loading advanced AI models...")
            
            # Advanced emotion detection
            self.emotion_classifier = pipeline(
                "text-classification",
                model="j-hartmann/emotion-english-distilroberta-base",
                token=self.hf_token,
                return_all_scores=True
            )
            
            # Conversation generation (if available)
            try:
                self.conversation_model = pipeline(
                    "text-generation",
                    model="microsoft/DialoGPT-medium",
                    token=self.hf_token,
                    pad_token_id=50256
                )
                logger.info("✅ Conversation AI loaded!")
            except:
                self.conversation_model = None
                logger.info("⚠️ Conversation AI not available, using rule-based responses")
            
            self.ai_enabled = True
            logger.info("✅ Advanced AI models loaded successfully!")
            
        except Exception as e:
            logger.warning(f"⚠️ AI models failed: {e}")
            self.emotion_classifier = None
            self.conversation_model = None
            self.ai_enabled = False
            logger.info("📱 Running in enhanced rule-based mode")

    def detect_advanced_emotion(self, text: str) -> Tuple[str, float]:
        """Advanced emotion detection with confidence scores"""
        if self.ai_enabled and self.emotion_classifier:
            try:
                results = self.emotion_classifier(text)
                # Get the emotion with highest confidence
                best_emotion = max(results, key=lambda x: x['score'])
                
                # Map to our emotion categories
                emotion_mapping = {
                    'joy': 'joy',
                    'sadness': 'sadness', 
                    'anger': 'anger',
                    'fear': 'fear',
                    'love': 'love',
                    'surprise': 'surprise',
                    'optimism': 'joy',
                    'pessimism': 'sadness',
                    'anticipation': 'surprise',
                    'trust': 'love',
                    'disgust': 'anger'
                }
                
                emotion = emotion_mapping.get(best_emotion['label'].lower(), 'neutral')
                confidence = best_emotion['score']
                
                return emotion, confidence
                
            except Exception as e:
                logger.error(f"AI emotion detection failed: {e}")
        
        # Enhanced fallback emotion detection
        text_lower = text.lower()
        
        # Advanced keyword matching with weights
        emotion_keywords = {
            'joy': {
                'keywords': ['happy', 'excited', 'amazing', 'awesome', 'love', 'great', 'fantastic', 'wonderful', 'perfect', 'yay', 'woohoo', 'celebration', 'party', 'achievement', 'success', 'win', 'mast', 'accha', 'khushi', 'mazaa'],
                'emojis': ['😊', '😄', '😃', '🥳', '🎉', '❤️', '💕', '🔥', '⭐', '🌟'],
                'weight': 1.0
            },
            'sadness': {
                'keywords': ['sad', 'depressed', 'cry', 'upset', 'hurt', 'broken', 'alone', 'lonely', 'miss', 'lost', 'disappointed', 'down', 'blue', 'tension', 'problem', 'dukh', 'pareshan', 'rona'],
                'emojis': ['😢', '😭', '😔', '💔', '😞', '😟', '😪'],
                'weight': 1.0
            },
            'anger': {
                'keywords': ['angry', 'mad', 'hate', 'frustrated', 'annoyed', 'furious', 'pissed', 'irritated', 'fuck', 'damn', 'shit', 'stupid', 'idiot', 'gussa', 'ghussa', 'pagal'],
                'emojis': ['😠', '😡', '🤬', '💢', '😤', '🔥'],
                'weight': 1.2
            },
            'fear': {
                'keywords': ['scared', 'afraid', 'fear', 'worried', 'anxious', 'nervous', 'panic', 'terrified', 'nightmare', 'stress', 'tension', 'dar', 'darr', 'pareshan'],
                'emojis': ['😨', '😰', '😱', '😧', '😟', '😖'],
                'weight': 1.0
            },
            'love': {
                'keywords': ['love', 'adore', 'crush', 'romantic', 'kiss', 'hug', 'miss you', 'darling', 'baby', 'sweetheart', 'boyfriend', 'girlfriend', 'valentine', 'mohabbat', 'pyaar', 'ishq'],
                'emojis': ['💕', '😍', '🥰', '💖', '💗', '💓', '💌', '👫', '💑'],
                'weight': 1.0
            },
            'surprise': {
                'keywords': ['wow', 'omg', 'what', 'really', 'seriously', 'no way', 'amazing', 'incredible', 'unbelievable', 'shocking', 'surprising', 'unexpected', 'kya baat'],
                'emojis': ['😱', '🤯', '😲', '🤩', '😮', '🎉'],
                'weight': 1.0
            }
        }
        
        emotion_scores = {}
        
        for emotion, data in emotion_keywords.items():
            score = 0
            
            # Check keywords
            for keyword in data['keywords']:
                if keyword in text_lower:
                    score += data['weight']
            
            # Check emojis
            for emoji in data['emojis']:
                if emoji in text:
                    score += data['weight'] * 1.5  # Emojis have higher weight
            
            if score > 0:
                emotion_scores[emotion] = score
        
        if emotion_scores:
            best_emotion = max(emotion_scores.items(), key=lambda x: x[1])
            return best_emotion[0], min(best_emotion[1] / 3.0, 1.0)  # Normalize confidence
        
        return 'neutral', 0.5

    def get_user_context(self, user_id: int) -> Dict:
        """Get user's conversation context"""
        if user_id not in self.conversation_history:
            self.conversation_history[user_id] = {
                'messages': [],
                'emotions': [],
                'topics': [],
                'last_interaction': datetime.now(),
                'relationship_level': 0
            }
        return self.conversation_history[user_id]

    def update_user_context(self, user_id: int, message: str, emotion: str):
        """Update user's conversation context"""
        context = self.get_user_context(user_id)
        
        context['messages'].append({
            'text': message,
            'emotion': emotion,
            'timestamp': datetime.now()
        })
        
        # Keep only last 20 messages for memory management
        if len(context['messages']) > 20:
            context['messages'] = context['messages'][-20:]
        
        context['emotions'].append(emotion)
        if len(context['emotions']) > 10:
            context['emotions'] = context['emotions'][-10:]
        
        context['last_interaction'] = datetime.now()
        context['relationship_level'] += 0.1  # Relationship grows with interaction

    def generate_human_like_response(self, message_text: str, emotion: str, confidence: float, user_name: str, user_id: int) -> str:
        """Generate human-like response with advanced emotional intelligence"""
        
        # Get user context
        context = self.get_user_context(user_id)
        
        # Special responses for owner
        if any(term in message_text.lower() for term in ['ash_yv', '@ash_yv', 'creator', 'banaya', 'made you', 'owner']):
            return f"Aww! 💕 Haan, {self.owner_tag} ne mujhe banaya hai! He's literally the best creator ever! 🎉 Such a genius and so caring! Main unki bohot grateful hoon! ✨👑"
        
        # Get emotional response data
        emotion_data = self.emotional_responses.get(emotion, self.emotional_responses['neutral'])
        
        # Choose base response
        base_response = random.choice(emotion_data['responses'])
        
        # Add emotional reaction
        reaction = random.choice(emotion_data['reactions'])
        
        # Personalization based on relationship level
        if context['relationship_level'] > 5:
            personal_prefixes = [f"{user_name} yaar,", f"Arre {user_name},", f"Hey {user_name}!"]
            if random.random() < 0.4:  # 40% chance to use name
                base_response = f"{random.choice(personal_prefixes)} {base_response}"
        
        # Add follow-up questions for engagement
        if confidence > 0.7 and random.random() < 0.6:  # High confidence emotions get follow-ups
            follow_up = random.choice(emotion_data['follow_ups'])
            base_response += f" {follow_up}"
        
        # Add conversation starters occasionally
        if random.random() < 0.15:  # 15% chance
            starter = random.choice(self.conversation_starters)
            base_response += f"\\n\\n{starter}"
        
        # Emotional consistency - if user was sad previously, show care
        recent_emotions = context['emotions'][-3:] if context['emotions'] else []
        if 'sadness' in recent_emotions and emotion != 'sadness':
            care_messages = [
                "Btw, feeling better now? 💕",
                "Glad to see you're doing okay! 🤗",
                "You seem better! That makes me happy! 😊"
            ]
            if random.random() < 0.3:
                base_response += f" {random.choice(care_messages)}"
        
        return f"{reaction} {base_response}"

    def should_respond(self, message):
        """Enhanced response detection"""
        if not message.text:
            return False
            
        text = message.text.lower()
        
        # Always respond to commands
        if text.startswith('/'):
            return True
        
        # Check for triggers (case-insensitive)
        triggers = ['zeril', '@zerilll_bot', 'zerill', 'bot']
        for trigger in triggers:
            if trigger in text:
                return True
        
        # Check if replying to bot
        if message.reply_to_message and message.reply_to_message.from_user.is_bot:
            return True
        
        # In private chats, respond to everything
        if message.chat.type == 'private':
            return True
            
        return False

    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Enhanced start command with personality"""
        user_name = update.effective_user.first_name or "dost"
        
        welcome_message = f"""
👑 **Hey {user_name}! Main ZERIL hoon!** ✨

*Waves excitedly* 🙋‍♀️

Main sirf ek bot nahi hoon - main tumhari emotional AI friend hoon! 💕 I understand feelings, remember our conversations, aur tumhare saath genuinely connect karti hoon!

🌟 **What makes me special:**
• **Deep Emotional Intelligence** - I feel what you feel 💗
• **Memory** - I remember our chats and grow closer to you 🧠
• **Hinglish Queen** - Mix karte hai languages naturally! 🗣️
• **Always Here** - 24/7 tumhare liye available! ⏰
• **Human-like Responses** - No robotic replies, only real talk! 🤖❌

💫 **How I work:**
- I detect your emotions automatically 🎭
- Remember what we talk about 💭  
- Get better at understanding you over time 📈
- Respond like a real friend would! 👫

👨‍💻 **My Amazing Creator:** {self.owner_tag} *(He's literally the best!)* 🙌

🔥 **Bot Status:** {"🟢 Full AI Mode" if self.ai_enabled else "🟡 Enhanced Mode"} 

Ready to be friends? Just start talking to me! No commands needed! 😊✨
        """
        
        keyboard = [
            [InlineKeyboardButton("🎭 Test My Emotion Detection", callback_data='test_emotion')],
            [InlineKeyboardButton("💕 Chat with Me", callback_data='start_chat')],
            [InlineKeyboardButton("👨‍💻 Thank My Creator", url='https://t.me/ash_yv')]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            welcome_message, 
            reply_markup=reply_markup,
            parse_mode='Markdown'
        )

    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Advanced message handling with emotional intelligence"""
        
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
        await asyncio.sleep(random.uniform(1.5, 3.0))
        
        # Advanced emotion detection
        emotion, confidence = self.detect_advanced_emotion(message_text)
        
        # Update user context
        self.update_user_context(user_id, message_text, emotion)
        
        # Generate human-like response
        response = self.generate_human_like_response(
            message_text, emotion, confidence, user_name, user_id
        )
        
        # Comprehensive logging
        logger.info(f"User: {user_name} | Message: {message_text[:50]}... | Emotion: {emotion} ({confidence:.2f}) | Response: {response[:50]}...")
        
        await update.message.reply_text(response)

    async def mood_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Advanced mood testing"""
        test_messages = [
            "I'm so excited about my new job! 🎉",
            "I feel really lonely and sad today... 😢", 
            "This traffic is making me so angry! 😠",
            "I'm scared about the exam tomorrow 😰",
            "I think I'm falling in love 💕",
            "OMG! I can't believe this happened! 😱"
        ]
        
        response = "🧪 **Advanced Emotion Detection Test:**\\n\\n"
        
        for msg in test_messages:
            emotion, confidence = self.detect_advanced_emotion(msg)
            emoji_map = {
                'joy': '❤️', 'sadness': '😢', 'anger': '🔥',
                'fear': '😰', 'love': '💕', 'surprise': '😱', 'neutral': '😐'
            }
            emoji = emoji_map.get(emotion, '😐')
            response += f"{emoji} \\"{msg}\\" → **{emotion.title()}** ({confidence:.0%})\\n"
        
        response += f"\\n🤖 **AI Status:** {'Advanced Neural Networks' if self.ai_enabled else 'Enhanced Rule-Based'}\\n"
        response += "\\n💬 Now send me YOUR message and watch the magic! ✨"
        
        await update.message.reply_text(response, parse_mode='Markdown')

    async def button_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle button interactions"""
        query = update.callback_query
        await query.answer()
        
        if query.data == 'test_emotion':
            await query.edit_message_text(
                "🎭 **Emotion Detection Active!**\\n\\n" +
                "Send me any message and I'll show you:\\n" +
                "• What emotion I detected 💭\\n" +
                "• How confident I am 📊\\n" +
                "• My human-like response 💕\\n\\n" +
                "**Try these:**\\n" +
                "• Something happy: \\"I got the job!\\" 🎉\\n" +
                "• Something sad: \\"I miss my friend\\" 😢\\n" +
                "• Something angry: \\"This is frustrating!\\" 😠\\n" +
                "• Mix Hindi-English naturally! 🇮🇳\\n\\n" +
                f"**AI Level:** {'🧠 Advanced' if self.ai_enabled else '💡 Enhanced'}",
                parse_mode='Markdown'
            )
        elif query.data == 'start_chat':
            await query.edit_message_text(
                "💕 **Let's Chat!**\\n\\n" +
                "Hey! I'm so excited to talk with you! 😊\\n\\n" +
                "You can tell me about:\\n" +
                "• How you're feeling today 💭\\n" +
                "• What's happening in your life 🌟\\n" +
                "• Your problems or celebrations 🎭\\n" +
                "• Anything at all! ✨\\n\\n" +
                "I'll remember our conversation and get to know you better! 🤗\\n\\n" +
                "**What's on your mind right now?** 💫",
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
    bot = AdvancedZerilBot()
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
