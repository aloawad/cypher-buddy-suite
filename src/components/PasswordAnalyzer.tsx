import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const PasswordAnalyzer = () => {
  const [password, setPassword] = useState("");

  const analyzePassword = (pass: string) => {
    let score = 0;
    const checks = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      numbers: /\d/.test(pass),
      symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass),
      noRepeating: !/(.)\1{2,}/.test(pass),
      longLength: pass.length >= 12,
    };

    // Calculate score
    Object.values(checks).forEach(check => {
      if (check) score += 1;
    });

    // Bonus for very long passwords
    if (pass.length >= 16) score += 1;

    let strength = "ضعيف جداً";
    let strengthColor = "cyber-danger";
    let strengthIcon = XCircle;

    if (score >= 7) {
      strength = "قوي جداً";
      strengthColor = "cyber-success";
      strengthIcon = CheckCircle;
    } else if (score >= 5) {
      strength = "قوي";
      strengthColor = "cyber-success";
      strengthIcon = CheckCircle;
    } else if (score >= 3) {
      strength = "متوسط";
      strengthColor = "cyber-warning";
      strengthIcon = AlertTriangle;
    } else if (score >= 1) {
      strength = "ضعيف";
      strengthColor = "cyber-danger";
      strengthIcon = XCircle;
    }

    // Calculate entropy (bits)
    let charset = 0;
    if (/[a-z]/.test(pass)) charset += 26;
    if (/[A-Z]/.test(pass)) charset += 26;
    if (/\d/.test(pass)) charset += 10;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) charset += 32;

    const entropy = Math.log2(charset) * pass.length;

    // Time to crack estimate
    const combinations = Math.pow(charset, pass.length);
    const secondsToCrack = combinations / (1000000000 * 2); // Assuming 1 billion guesses per second
    
    let timeToCrack = "";
    if (secondsToCrack < 60) {
      timeToCrack = "أقل من دقيقة";
    } else if (secondsToCrack < 3600) {
      timeToCrack = `${Math.round(secondsToCrack / 60)} دقيقة`;
    } else if (secondsToCrack < 86400) {
      timeToCrack = `${Math.round(secondsToCrack / 3600)} ساعة`;
    } else if (secondsToCrack < 31536000) {
      timeToCrack = `${Math.round(secondsToCrack / 86400)} يوم`;
    } else {
      const years = secondsToCrack / 31536000;
      if (years > 1000000) {
        timeToCrack = "ملايين السنين";
      } else {
        timeToCrack = `${Math.round(years)} سنة`;
      }
    }

    return {
      score: Math.min(score, 8),
      strength,
      strengthColor,
      strengthIcon,
      checks,
      entropy: Math.round(entropy),
      timeToCrack,
    };
  };

  const analysis = password ? analyzePassword(password) : null;
  const StrengthIcon = analysis?.strengthIcon || Shield;

  return (
    <Card className="bg-card border-cyber-warning/20 shadow-lg hover:shadow-cyber-warning/20 transition-all duration-300">
      <CardHeader className="text-center">
        <CardTitle className="text-cyber-warning flex items-center justify-center gap-2">
          <Shield className="h-5 w-5" />
          محلل قوة كلمة المرور
        </CardTitle>
        <CardDescription>
          قم بتحليل قوة كلمة المرور وتقييم مستوى الأمان
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            id="password"
            type="password"
            placeholder="أدخل كلمة المرور للتحليل..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-secondary border-border focus:border-cyber-warning"
          />
        </div>

        {analysis && (
          <>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">قوة كلمة المرور</span>
                <Badge className={`bg-${analysis.strengthColor}/20 text-${analysis.strengthColor} border-${analysis.strengthColor}/30`}>
                  <StrengthIcon className="h-3 w-3 mr-1" />
                  {analysis.strength}
                </Badge>
              </div>
              <Progress value={(analysis.score / 8) * 100} className="h-2" />
              <div className="text-xs text-muted-foreground">
                النقاط: {analysis.score}/8
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">متطلبات الأمان</Label>
                <div className="space-y-1">
                  {[
                    { check: analysis.checks.length, text: "8 أحرف على الأقل" },
                    { check: analysis.checks.longLength, text: "12 حرف على الأقل" },
                    { check: analysis.checks.uppercase, text: "أحرف كبيرة" },
                    { check: analysis.checks.lowercase, text: "أحرف صغيرة" },
                    { check: analysis.checks.numbers, text: "أرقام" },
                    { check: analysis.checks.symbols, text: "رموز خاصة" },
                    { check: analysis.checks.noRepeating, text: "لا تحتوي على تكرار" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {item.check ? (
                        <CheckCircle className="h-3 w-3 text-cyber-success" />
                      ) : (
                        <XCircle className="h-3 w-3 text-cyber-danger" />
                      )}
                      <span className={item.check ? "text-cyber-success" : "text-muted-foreground"}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">معلومات إضافية</Label>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الطول:</span>
                      <span>{password.length} حرف</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الانتروبيا:</span>
                      <span>{analysis.entropy} بت</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">وقت الكسر المقدر:</span>
                      <span className="text-left">{analysis.timeToCrack}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium text-sm mb-2">نصائح لتحسين كلمة المرور:</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• استخدم 12 حرف على الأقل</li>
                <li>• امزج بين الأحرف الكبيرة والصغيرة والأرقام والرموز</li>
                <li>• تجنب الكلمات الشائعة والمعلومات الشخصية</li>
                <li>• لا تعيد استخدام كلمات المرور</li>
                <li>• استخدم مولد كلمات المرور للحصول على كلمات مرور قوية</li>
              </ul>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PasswordAnalyzer;