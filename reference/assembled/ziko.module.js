import Chatbot from "https://cdn.n8nchatui.com/v1/pole-embed-yard.js";
  Chatbot.init({
    "n8nChatUrl": "https://diginovia-ai.cloud/webhook/95be99e1-07d2-4b95-ba6d-3c0043b83cc2/chat",
    "metadata": {}, // Include any custom data to send with each message to your n8n workflow
    "theme": {
      "button": {
        "backgroundColor": "#EFF1F4",
        "right": 20,
        "bottom": 20,
        "size": 59,
        "iconColor": "#ffffff",
        "customIconSrc": "https://keyworld.technology/wp-content/uploads/chatbot_images/ziko_chatbot_icon-003.png",
        "customIconSize": 94,
        "customIconBorderRadius": 10,
        "autoWindowOpen": {
          "autoOpen": false,
          "openDelay": 2
        },
        "borderRadius": "rounded"
      },
      "tooltip": {
        "showTooltip": true,
        "tooltipMessage": "Hello! I'm Ziko your AI Assistant",
        "tooltipBackgroundColor": "#ffffff",
        "tooltipTextColor": "#CBDOD8",
        "tooltipFontSize": 13,
        "hideTooltipOnMobile": true
      },
      "customCSS": ".n8n-chat-ui-bot-header { background: rgb(200 205 213) !important}",
      "direction": "ltr",
      "allowProgrammaticMessage": true,
      "consentScreen": {
        "enabled": false,
        "title": "User Agreement",
        "message": "By using this chatbot, you agree to our\n<p><a href='/terms' target='_blank' style='color: black; text-decoration: underline; text-decoration-color: black;'>Terms & Conditions</a></p>",
        "textColor": "#1e1e1f",
        "acceptButtonColor": "#f36539",
        "acceptButtonTextColor": "#ffffff",
        "acceptButtonText": "Agree & Start Chatting",
        "backgroundColor": "#ffffff",
        "backdropColor": "#00000"
      },
      "chatWindow": {
        "borderRadiusStyle": "rounded",
        "avatarBorderRadius": 25,
        "messageBorderRadius": 6,
        "showTitle": true,
        "title": "Ziko زيكو",
        "titleAvatarSrc": "https://keyworld.technology/wp-content/uploads/chatbot_images/ziko_chatbot_icon-003.png",
        "avatarSize": 40,
        "welcomeMessage": "Hello! I can help you explore KWT",
        "errorMessage": "Something was wrong please try again or contact support at +201116077755",
        "backgroundColor": "#f7f7f7",
        "height": 480,
        "width": 400,
        "fontSize": 14,
        "starterPrompts": [
          "KWT Services?",
          "TTF Programs & Services?",
          "Who You Are?",
          "About Dr. Wael Fathy?",
          "خدمات كي ورلد تكنولوجي?",
          "خدمات تك تايتنز فاكتوري?",
          "من أنتم ؟",
          "مين وائل فتحي ؟"
        ],
        "starterPromptFontSize": 14,
        "renderHTML": true,
        "clearChatOnReload": true,
        "showScrollbar": false,
        "botMessage": {
          "backgroundColor": "#E4FF10",
          "textColor": "#1B2029",
          "showAvatar": false,
          "avatarSrc": "https://www.svgrepo.com/show/334455/bot.svg",
          "showCopyToClipboardIcon": true
        },
        "userMessage": {
          "backgroundColor": "#EFF1F4",
          "textColor": "#1B2029",
          "showAvatar": false,
          "avatarSrc": "https://www.svgrepo.com/show/532363/user-alt-1.svg"
        },
        "textInput": {
          "placeholder": "Type your query",
          "backgroundColor": "#ffffff",
          "textColor": "#1B2029",
          "sendButtonColor": "#E0E61A",
          "maxChars": 500,
          "maxCharsWarningMessage": "You exceeded the characters limit. Please input less than 500 characters.",
          "autoFocus": true,
          "borderRadius": 6,
          "sendButtonBorderRadius": 50
        },
        "footer": {
          "text": "Powered By",
          "company": "Diginovia",
          "companyLink": "https://diginovia.com",
          "textColor": "#1B2029"
        },
        "voiceInputConfig": {
          "enabled": true,
          "maxRecordingTime": 10,
          "recordingNotSupportedMessage": "To record audio, use modern browsers like Chrome or Firefox that support audio recording",
          "microphoneAccessErrorMessage": "Microphone access is required to record audio. Please allow microphone access in your browser settings"
        }
      }
    }
    });