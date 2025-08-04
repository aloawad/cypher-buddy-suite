import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Copy, Key, Plus, Trash2, Users, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Account {
  id: string;
  name: string;
  password: string;
  settings: {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
    excludeAmbiguous: boolean;
  };
}

const MultiAccountPasswordGenerator = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "1",
      name: "",
      password: "",
      settings: {
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
        excludeAmbiguous: false,
      }
    }
  ]);
  const { toast } = useToast();

  const generatePassword = (settings: Account['settings']) => {
    let charset = "";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const ambiguous = "0O1lI";

    if (settings.includeUppercase) charset += uppercase;
    if (settings.includeLowercase) charset += lowercase;
    if (settings.includeNumbers) charset += numbers;
    if (settings.includeSymbols) charset += symbols;

    if (settings.excludeAmbiguous) {
      for (const char of ambiguous) {
        charset = charset.replace(new RegExp(char, "g"), "");
      }
    }

    if (charset === "") {
      return "";
    }

    let result = "";
    for (let i = 0; i < settings.length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return result;
  };

  const handleGeneratePassword = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) return;

    const newPassword = generatePassword(account.settings);
    if (!newPassword) {
      toast({
        title: "خطأ",
        description: "يجب اختيار نوع واحد على الأقل من الأحرف",
        variant: "destructive",
      });
      return;
    }

    setAccounts(accounts.map(acc => 
      acc.id === accountId 
        ? { ...acc, password: newPassword }
        : acc
    ));

    toast({
      title: "تم إنشاء كلمة المرور",
      description: `تم إنشاء كلمة مرور قوية للحساب: ${account.name || 'حساب جديد'}`,
    });
  };

  const addNewAccount = () => {
    const newAccount: Account = {
      id: Date.now().toString(),
      name: "",
      password: "",
      settings: {
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
        excludeAmbiguous: false,
      }
    };
    setAccounts([...accounts, newAccount]);
  };

  const removeAccount = (accountId: string) => {
    if (accounts.length > 1) {
      setAccounts(accounts.filter(acc => acc.id !== accountId));
    }
  };

  const updateAccountName = (accountId: string, name: string) => {
    setAccounts(accounts.map(acc => 
      acc.id === accountId 
        ? { ...acc, name }
        : acc
    ));
  };

  const updateAccountSettings = (accountId: string, settingKey: keyof Account['settings'], value: any) => {
    setAccounts(accounts.map(acc => 
      acc.id === accountId 
        ? { ...acc, settings: { ...acc.settings, [settingKey]: value } }
        : acc
    ));
  };

  const copyToClipboard = (password: string, accountName: string) => {
    navigator.clipboard.writeText(password);
    toast({
      title: "تم النسخ",
      description: `تم نسخ كلمة مرور ${accountName || 'الحساب'} إلى الحافظة`,
    });
  };

  const generateAllPasswords = () => {
    const updatedAccounts = accounts.map(account => ({
      ...account,
      password: generatePassword(account.settings)
    }));
    setAccounts(updatedAccounts);
    
    toast({
      title: "تم إنشاء جميع كلمات المرور",
      description: `تم إنشاء ${accounts.length} كلمة مرور بنجاح`,
    });
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 8) return { level: "ضعيف", color: "bg-red-500", score: 1 };
    if (password.length < 12) return { level: "متوسط", color: "bg-yellow-500", score: 2 };
    return { level: "قوي", color: "bg-green-500", score: 3 };
  };

  return (
    <Card className="bg-card border-cyber-secondary/20 shadow-lg hover:shadow-cyber-secondary/20 transition-all duration-300">
      <CardHeader className="text-center">
        <CardTitle className="text-cyber-secondary flex items-center justify-center gap-2">
          <Users className="h-5 w-5" />
          مولد كلمات المرور متعدد الحسابات
        </CardTitle>
        <CardDescription>
          قم بإنشاء كلمات مرور منفصلة وقوية لحسابات متعددة
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Global Actions */}
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <Button 
            onClick={addNewAccount}
            variant="outline"
            className="border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary/10"
          >
            <Plus className="h-4 w-4 mr-2" />
            إضافة حساب جديد
          </Button>
          
          <Button 
            onClick={generateAllPasswords}
            className="bg-cyber-secondary hover:bg-cyber-secondary/90 text-primary-foreground"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            إنشاء جميع كلمات المرور
          </Button>
        </div>

        <Separator />

        {/* Accounts List */}
        <div className="space-y-6">
          {accounts.map((account, index) => (
            <div key={account.id} className="border border-muted rounded-lg p-4 space-y-4">
              
              {/* Account Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <Badge variant="secondary">حساب {index + 1}</Badge>
                  <Input
                    placeholder="اسم الحساب (مثل: Gmail, Facebook, البنك)"
                    value={account.name}
                    onChange={(e) => updateAccountName(account.id, e.target.value)}
                    className="flex-1"
                  />
                </div>
                
                {accounts.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAccount(account.id)}
                    className="text-red-500 border-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Password Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label>طول كلمة المرور: {account.settings.length}</Label>
                  <Slider
                    value={[account.settings.length]}
                    onValueChange={(value) => updateAccountSettings(account.id, 'length', value[0])}
                    min={8}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      checked={account.settings.includeUppercase}
                      onCheckedChange={(checked) => updateAccountSettings(account.id, 'includeUppercase', checked === true)}
                    />
                    <Label>أحرف كبيرة (A-Z)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      checked={account.settings.includeLowercase}
                      onCheckedChange={(checked) => updateAccountSettings(account.id, 'includeLowercase', checked === true)}
                    />
                    <Label>أحرف صغيرة (a-z)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      checked={account.settings.includeNumbers}
                      onCheckedChange={(checked) => updateAccountSettings(account.id, 'includeNumbers', checked === true)}
                    />
                    <Label>أرقام (0-9)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      checked={account.settings.includeSymbols}
                      onCheckedChange={(checked) => updateAccountSettings(account.id, 'includeSymbols', checked === true)}
                    />
                    <Label>رموز (!@#$...)</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      checked={account.settings.excludeAmbiguous}
                      onCheckedChange={(checked) => updateAccountSettings(account.id, 'excludeAmbiguous', checked === true)}
                    />
                    <Label>استبعاد الأحرف المتشابهة</Label>
                  </div>
                </div>
              </div>

              {/* Generate Password Button */}
              <Button 
                onClick={() => handleGeneratePassword(account.id)}
                className="w-full bg-cyber-accent hover:bg-cyber-accent/90"
              >
                <Key className="h-4 w-4 mr-2" />
                إنشاء كلمة مرور لهذا الحساب
              </Button>

              {/* Generated Password */}
              {account.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>كلمة المرور المُنشأة</Label>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getPasswordStrength(account.password).color}`}></div>
                      <span className="text-sm text-muted-foreground">
                        {getPasswordStrength(account.password).level}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={account.password}
                      readOnly
                      className="font-mono bg-muted border-cyber-accent/30"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(account.password, account.name)}
                      className="border-cyber-accent text-cyber-accent hover:bg-cyber-accent/10"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Security Tips */}
        <div className="bg-cyber-primary/10 border border-cyber-primary/20 rounded-lg p-4">
          <h4 className="font-medium text-cyber-primary mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            نصائح الأمان
          </h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>🔒 استخدم كلمة مرور مختلفة لكل حساب</li>
            <li>📱 فعل المصادقة الثنائية عند توفرها</li>
            <li>💾 احفظ كلمات المرور في مدير كلمات مرور موثوق</li>
            <li>🔄 غير كلمات المرور دورياً (كل 3-6 أشهر)</li>
            <li>❌ لا تشارك كلمات المرور مع أحد</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MultiAccountPasswordGenerator;