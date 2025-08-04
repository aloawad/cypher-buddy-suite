import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Lock, Unlock, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CaesarCipher = () => {
  const [text, setText] = useState("");
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const caesarCipher = (str: string, shift: number, encrypt: boolean = true) => {
    const direction = encrypt ? shift : -shift;
    return str.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + direction + 26) % 26) + start);
    });
  };

  const handleEncrypt = () => {
    const encrypted = caesarCipher(text, shift, true);
    setResult(encrypted);
    toast({
      title: "تم التشفير بنجاح",
      description: "تم تشفير النص باستخدام تشفير سيزار",
    });
  };

  const handleDecrypt = () => {
    const decrypted = caesarCipher(text, shift, false);
    setResult(decrypted);
    toast({
      title: "تم فك التشفير بنجاح",
      description: "تم فك تشفير النص باستخدام تشفير سيزار",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "تم النسخ",
      description: "تم نسخ النتيجة إلى الحافظة",
    });
  };

  return (
    <Card className="bg-card border-cyber-primary/20 shadow-lg hover:shadow-cyber-primary/20 transition-all duration-300">
      <CardHeader className="text-center">
        <CardTitle className="text-cyber-primary flex items-center justify-center gap-2">
          <Lock className="h-5 w-5" />
          تشفير سيزار
        </CardTitle>
        <CardDescription>
          قم بتشفير وفك تشفير النصوص باستخدام خوارزمية سيزار الكلاسيكية
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">النص المراد تشفيره/فك تشفيره</Label>
          <Textarea
            id="text"
            placeholder="أدخل النص هنا..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[100px] bg-secondary border-border focus:border-cyber-primary"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="shift">قيمة الإزاحة (Shift)</Label>
          <Input
            id="shift"
            type="number"
            min="1"
            max="25"
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value) || 3)}
            className="bg-secondary border-border focus:border-cyber-primary"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={handleEncrypt}
            className="flex-1 bg-cyber-primary hover:bg-cyber-primary/90 text-primary-foreground"
            disabled={!text.trim()}
          >
            <Lock className="h-4 w-4 mr-2" />
            تشفير
          </Button>
          <Button 
            onClick={handleDecrypt}
            variant="outline"
            className="flex-1 border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary/10"
            disabled={!text.trim()}
          >
            <Unlock className="h-4 w-4 mr-2" />
            فك التشفير
          </Button>
        </div>

        {result && (
          <div className="space-y-2">
            <Label>النتيجة</Label>
            <div className="relative">
              <Textarea
                value={result}
                readOnly
                className="min-h-[100px] bg-muted border-cyber-primary/30"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={copyToClipboard}
                className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-cyber-primary/20"
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

export default CaesarCipher;