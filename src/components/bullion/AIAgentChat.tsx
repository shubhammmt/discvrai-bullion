import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircle, Send, Bot, User, Sparkles, TrendingUp, Clock, Info } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  widget?: {
    type: "transaction" | "info";
    data: Record<string, unknown>;
  };
}

interface AIAgentChatProps {
  goldPrice: number;
  silverPrice: number;
  onBuy?: (metal: "gold" | "silver", amount: number) => void;
}

export function AIAgentChat({ goldPrice, silverPrice, onBuy }: AIAgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hey! 👋 I'm your Discvr AI assistant. I can help you with:\n\n• Buying gold or silver\n• Checking prices and trends\n• Understanding market movements\n• Managing your portfolio\n\nHow can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    "Is now a good time to buy gold?",
    "Buy ₹500 of silver",
    "Show my portfolio",
    "What's the gold trend?",
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let response: Message;

    // Simple intent matching for demo
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("buy") && lowerInput.includes("gold")) {
      const amountMatch = lowerInput.match(/₹?(\d+)/);
      const amount = amountMatch ? parseInt(amountMatch[1]) : 500;
      const grams = amount / goldPrice;

      response = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Got it! Here's your order summary:`,
        timestamp: new Date(),
        widget: {
          type: "transaction",
          data: {
            metal: "Gold",
            amount: amount,
            grams: grams.toFixed(4),
            rate: goldPrice,
            gst: (amount * 0.03).toFixed(2),
            total: (amount * 1.03).toFixed(2),
          },
        },
      };
    } else if (lowerInput.includes("buy") && lowerInput.includes("silver")) {
      const amountMatch = lowerInput.match(/₹?(\d+)/);
      const amount = amountMatch ? parseInt(amountMatch[1]) : 500;
      const grams = amount / silverPrice;

      response = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Here's your silver order:`,
        timestamp: new Date(),
        widget: {
          type: "transaction",
          data: {
            metal: "Silver",
            amount: amount,
            grams: grams.toFixed(4),
            rate: silverPrice,
            gst: (amount * 0.03).toFixed(2),
            total: (amount * 1.03).toFixed(2),
          },
        },
      };
    } else if (lowerInput.includes("good time") || lowerInput.includes("trend")) {
      response = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `📊 **Market Analysis**\n\nGold is currently trading at ₹${goldPrice.toLocaleString()}/g, down ~1.2% from yesterday's high.\n\n💡 **Tip:** Buying on dips has historically been a popular strategy. Current price offers a reasonable entry point.\n\nWant me to lock this price for you?`,
        timestamp: new Date(),
        widget: {
          type: "info",
          data: {
            title: "24h Price Movement",
            change: "-1.2%",
            recommendation: "Consider buying",
          },
        },
      };
    } else if (lowerInput.includes("portfolio") || lowerInput.includes("holdings")) {
      response = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `📦 **Your Vault Summary**\n\n🪙 Gold: 2.5000g (₹${(2.5 * goldPrice).toLocaleString()})\n🥈 Silver: 10.0000g (₹${(10 * silverPrice).toLocaleString()})\n\n📈 Total Value: ₹${(2.5 * goldPrice + 10 * silverPrice).toLocaleString()}\n\nWould you like to add more or setup a SIP?`,
        timestamp: new Date(),
      };
    } else {
      response = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I can help you with that! 🤔\n\nHere are some things I can do:\n• **"Buy ₹1000 of gold"** - Quick purchase\n• **"What's the gold trend?"** - Market analysis\n• **"Show my portfolio"** - View holdings\n\nTry one of these or ask me anything about gold & silver investing!`,
        timestamp: new Date(),
      };
    }

    setIsTyping(false);
    setMessages((prev) => [...prev, response]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-24 right-4 md:bottom-6 md:right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-primary to-accent hover:scale-105 transition-transform z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            Discvr AI
          </SheetTitle>
        </SheetHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] space-y-2`}>
                <div
                  className={`p-3 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                </div>

                {/* Transaction Widget */}
                {msg.widget?.type === "transaction" && (
                  <Card className="p-3 border-primary/30 bg-primary/5">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Metal</span>
                        <span className="font-medium">{msg.widget.data.metal as string}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount</span>
                        <span>₹{(msg.widget.data.amount as number).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">You'll get</span>
                        <span>{msg.widget.data.grams as string}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GST (3%)</span>
                        <span>₹{msg.widget.data.gst as string}</span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t border-border/50">
                        <span>Total</span>
                        <span>₹{msg.widget.data.total as string}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-amber-400">Price locked for 5 mins</span>
                      </div>
                      <Button className="w-full mt-2" size="sm">
                        Proceed to Pay
                      </Button>
                    </div>
                  </Card>
                )}

                {/* Info Widget */}
                {msg.widget?.type === "info" && (
                  <Card className="p-3 border-emerald-500/30 bg-emerald-500/5">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="font-medium text-sm">{msg.widget.data.title as string}</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-400">{msg.widget.data.change as string}</p>
                    <p className="text-xs text-muted-foreground mt-1">{msg.widget.data.recommendation as string}</p>
                  </Card>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setInput(prompt)}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors border border-border/50"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border/50 bg-background">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
