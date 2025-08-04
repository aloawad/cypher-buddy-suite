import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RefreshCw, Copy, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PasswordGenerator = () => {
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const generatePassword = () => {
    let charset = "";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const ambiguous = "0O1lI";

    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (excludeAmbiguous) {
      for (const char of ambiguous) {
        charset = charset.replace(new RegExp(char, "g"), "");
      }
    }

    if (charset === "") {
      toast({
        title: "خطأ",
        description: "يجب اختيار نوع واحد على الأقل من الأحرف",
        variant: "destructive",
      });
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(result);
    toast({
      title: "تم إنشاء كلمة المرور",
      description: "تم إنشاء كلمة مرور قوية بنجاح",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "تم النسخ",
      description: "تم نسخ كلمة المرور إلى الحافظة",
    });
  };

  return (
    <Card className="bg-card border-cyber-secondary/20 shadow-lg hover:shadow-cyber-secondary/20 transition-all duration-300">
      <CardHeader className="text-center">
        <CardTitle className="text-cyber-secondary flex items-center justify-center gap-2">
          <Key className="h-5 w-5" />
          مولد كلمات المرور
        </CardTitle>
        <CardDescription>
          قم بإنشاء كلمات مرور قوية وآمنة مع خيارات التخصيص
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>طول كلمة المرور: {length[0]}</Label>
          <Slider
            value={length}
            onValueChange={setLength}
            min={8}
            max={50}
            step={1}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="uppercase"
              checked={includeUppercase}
              onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
            />
            <Label htmlFor="uppercase">أحرف كبيرة (A-Z)</Label>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="lowercase"
              checked={includeLowercase}
              onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
            />
            <Label htmlFor="lowercase">أحرف صغيرة (a-z)</Label>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="numbers"
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
            />
            <Label htmlFor="numbers">أرقام (0-9)</Label>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="symbols"
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
            />
            <Label htmlFor="symbols">رموز (!@#$...)</Label>
          </div>
        </div>

        <div className="flex items-center space-x-2 space-x-reverse">
          <Checkbox
            id="ambiguous"
            checked={excludeAmbiguous}
            onCheckedChange={(checked) => setExcludeAmbiguous(checked === true)}
          />
          <Label htmlFor="ambiguous">استبعاد الأحرف المتشابهة (0, O, 1, l, I)</Label>
        </div>

        <Button 
          onClick={generatePassword}
          className="w-full bg-cyber-secondary hover:bg-cyber-secondary/90 text-primary-foreground"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          إنشاء كلمة مرور جديدة
        </Button>

        {password && (
          <div className="space-y-2">
            <Label>كلمة المرور المُنشأة</Label>
            <div className="flex gap-2">
              <Input
                value={password}
                readOnly
                className="font-mono bg-muted border-cyber-secondary/30"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={copyToClipboard}
                className="border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary/10"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PasswordGenerator;