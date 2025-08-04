import CaesarCipher from "@/components/CaesarCipher";
import PasswordGenerator from "@/components/PasswordGenerator";
import PasswordAnalyzer from "@/components/PasswordAnalyzer";
import IdorTester from "@/components/IdorTester";
import { Shield, Zap, Code } from "lucide-react";

const Index = () => {
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
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-cyber-primary" />
              <span>تشفير سيزار</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyber-secondary" />
              <span>مولد كلمات المرور</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-cyber-warning" />
              <span>اختبار الثغرات</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tools Grid */}
      <main className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Caesar Cipher */}
          <div className="space-y-6">
            <CaesarCipher />
          </div>

          {/* Password Generator */}
          <div className="space-y-6">
            <PasswordGenerator />
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