import { useState } from "react";
import CaesarCipher from "@/components/CaesarCipher";
import PasswordGenerator from "@/components/PasswordGenerator";
import MultiAccountPasswordGenerator from "@/components/MultiAccountPasswordGenerator";
import PasswordAnalyzer from "@/components/PasswordAnalyzer";
import IdorTester from "@/components/IdorTester";
import UserGuide from "@/components/UserGuide";
import { Shield, Zap, Code, ArrowRight, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentTab, setCurrentTab] = useState("tools");

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-cyber-primary/5 to-cyber-accent/10 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="mb-8 relative">
            <div className="absolute inset-0 blur-3xl bg-cyber-primary/20 rounded-full animate-pulse"></div>
            <Shield className="w-32 h-32 mx-auto text-cyber-primary relative z-10" />
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyber-primary via-cyber-accent to-cyber-secondary bg-clip-text text-transparent mb-6">
            🛡️ Cypher Buddy Suite
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            مجموعة أدوات الأمن السيبراني الشاملة<br />
            <span className="text-lg">تشفير • كلمات المرور • فحص الثغرات</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <span className="px-4 py-2 bg-cyber-primary/10 rounded-full text-sm font-medium">🎓 مشروع تعليمي</span>
            <span className="px-4 py-2 bg-cyber-accent/10 rounded-full text-sm font-medium">🔒 أمان معلومات</span>
            <span className="px-4 py-2 bg-cyber-secondary/10 rounded-full text-sm font-medium">⚡ أدوات متقدمة</span>
          </div>
          
          <Button 
            onClick={() => setIsStarted(true)}
            size="lg"
            className="bg-gradient-to-r from-cyber-primary to-cyber-accent hover:from-cyber-primary/90 hover:to-cyber-accent/90 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            انقر للبدء
            <ArrowRight className="w-6 h-6 mr-3" />
          </Button>
          
          <p className="text-sm text-muted-foreground mt-6">
            مطور بواسطة هكر أخلاقي • للأغراض التعليمية فقط
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-cyber-primary/20 rounded-xl border border-cyber-primary/30">
              <Shield className="h-8 w-8 text-cyber-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyber-primary to-cyber-secondary bg-clip-text text-transparent">
              Cypher Buddy Suite
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            مجموعة شاملة من أدوات الأمن السيبراني والتشفير للمحترفين والطلاب
          </p>
          
          {/* Tab Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant={currentTab === "tools" ? "default" : "outline"}
              onClick={() => setCurrentTab("tools")}
              className="px-6"
            >
              <Zap className="h-4 w-4 mr-2" />
              الأدوات
            </Button>
            <Button
              variant={currentTab === "guide" ? "default" : "outline"}
              onClick={() => setCurrentTab("guide")}
              className="px-6"
            >
              <Code className="h-4 w-4 mr-2" />
              دليل الاستخدام
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        {currentTab === "tools" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Caesar Cipher */}
            <div className="space-y-6">
              <CaesarCipher />
            </div>

            {/* Multi-Account Password Generator */}
            <div className="space-y-6">
              <MultiAccountPasswordGenerator />
            </div>

            {/* Password Analyzer */}
            <div className="space-y-6">
              <PasswordAnalyzer />
            </div>

            {/* IDOR Tester */}
            <div className="space-y-6">
              <IdorTester />
            </div>
          </div>
        )}

        {currentTab === "guide" && (
          <UserGuide />
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-cyber-primary" />
              <span className="text-sm font-medium">Cypher Buddy Suite</span>
            </div>
            <p className="text-xs text-muted-foreground">
              أدوات تعليمية للأمن السيبراني • استخدم بمسؤولية وقانونية
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span>🔐 تشفير آمن</span>
              <span>🔍 تحليل كلمات المرور</span>
              <span>🛡️ اختبار الثغرات</span>
              <span>⚡ سريع وموثوق</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyber-warning/5 rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default Index;