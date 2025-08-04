import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bug, Play, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IdorTester = () => {
  const [baseUrl, setBaseUrl] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [paramName, setParamName] = useState("id");
  const [testRange, setTestRange] = useState("1-10");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateTestPayload = () => {
    const [start, end] = testRange.split('-').map(Number);
    if (isNaN(start) || isNaN(end)) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال نطاق صحيح (مثال: 1-10)",
        variant: "destructive",
      });
      return;
    }

    const payload = [];
    for (let i = start; i <= end; i++) {
      const url = `${baseUrl}${endpoint}?${paramName}=${i}`;
      payload.push({
        id: i,
        url: url,
        method: "GET",
        expectedStatus: "Check for 200/403/401 responses"
      });
    }

    const payloadText = payload.map(p => 
      `curl -X ${p.method} "${p.url}" -H "Authorization: Bearer YOUR_TOKEN"`
    ).join('\n\n');

    navigator.clipboard.writeText(payloadText);
    
    toast({
      title: "تم إنشاء Payload",
      description: "تم نسخ أوامر cURL إلى الحافظة",
    });

    setResults(payload);
  };

  const runSimulation = async () => {
    setIsLoading(true);
    const [start, end] = testRange.split('-').map(Number);
    
    // محاكاة اختبار IDOR
    const simulatedResults = [];
    for (let i = start; i <= end; i++) {
      // محاكاة استجابات مختلفة
      const responses = [200, 403, 401, 404];
      const randomStatus = responses[Math.floor(Math.random() * responses.length)];
      
      let vulnerability = "آمن";
      let severity = "success";
      
      if (randomStatus === 200 && Math.random() > 0.7) {
        vulnerability = "مشبوه - وصول غير مصرح";
        severity = "warning";
      }
      
      if (randomStatus === 200 && Math.random() > 0.9) {
        vulnerability = "ثغرة IDOR مؤكدة!";
        severity = "danger";
      }

      simulatedResults.push({
        id: i,
        url: `${baseUrl}${endpoint}?${paramName}=${i}`,
        status: randomStatus,
        vulnerability,
        severity,
        response: randomStatus === 200 ? "تم الوصول للبيانات" : "تم منع الوصول"
      });

      // إضافة تأخير صغير للمحاكاة
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setResults(simulatedResults);
    setIsLoading(false);
    
    const vulnerabilities = simulatedResults.filter(r => r.severity !== "success");
    if (vulnerabilities.length > 0) {
      toast({
        title: "تم العثور على ثغرات محتملة!",
        description: `تم العثور على ${vulnerabilities.length} استجابة مشبوهة`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "اكتمل الفحص",
        description: "لم يتم العثور على ثغرات واضحة",
      });
    }
  };

  const exportResults = () => {
    const report = `
# تقرير فحص ثغرة IDOR
التاريخ: ${new Date().toLocaleDateString('ar')}
الهدف: ${baseUrl}${endpoint}
المعامل: ${paramName}
النطاق: ${testRange}

## النتائج:
${results.map(r => `
- ID: ${r.id}
- URL: ${r.url}
- Status: ${r.status}
- التقييم: ${r.vulnerability}
- الاستجابة: ${r.response}
`).join('\n')}

## التوصيات:
- تطبيق التحقق من الصلاحيات على مستوى الكائن
- استخدام UUID بدلاً من الأرقام المتسلسلة
- تنفيذ Access Control بشكل صحيح
- مراجعة جميع endpoints التي تستخدم معرفات الكائنات
`;

    navigator.clipboard.writeText(report);
    toast({
      title: "تم تصدير التقرير",
      description: "تم نسخ التقرير إلى الحافظة",
    });
  };

  return (
    <Card className="bg-card border-cyber-danger/20 shadow-lg hover:shadow-cyber-danger/20 transition-all duration-300">
      <CardHeader className="text-center">
        <CardTitle className="text-cyber-danger flex items-center justify-center gap-2">
          <Bug className="h-5 w-5" />
          أداة فحص ثغرة IDOR
        </CardTitle>
        <CardDescription>
          اختبار الوصول المباشر غير المصرح للكائنات (Insecure Direct Object Reference)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-4 rounded-lg border border-cyber-warning/30">
          <div className="flex items-center gap-2 text-cyber-warning mb-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium text-sm">تحذير قانوني</span>
          </div>
          <p className="text-xs text-muted-foreground">
            هذه الأداة للاختبار التعليمي فقط. لا تستخدمها على مواقع لا تملكها أو بدون إذن صريح. 
            أي استخدام غير قانوني هو مسؤولية المستخدم بالكامل.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="baseUrl">URL الأساسي</Label>
            <Input
              id="baseUrl"
              placeholder="https://example.com"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="bg-secondary border-border focus:border-cyber-danger"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endpoint">المسار (Endpoint)</Label>
            <Input
              id="endpoint"
              placeholder="/api/users"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="bg-secondary border-border focus:border-cyber-danger"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="paramName">اسم المعامل</Label>
            <Input
              id="paramName"
              placeholder="id"
              value={paramName}
              onChange={(e) => setParamName(e.target.value)}
              className="bg-secondary border-border focus:border-cyber-danger"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="testRange">نطاق الاختبار</Label>
            <Input
              id="testRange"
              placeholder="1-10"
              value={testRange}
              onChange={(e) => setTestRange(e.target.value)}
              className="bg-secondary border-border focus:border-cyber-danger"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={generateTestPayload}
            variant="outline"
            className="flex-1 border-cyber-danger text-cyber-danger hover:bg-cyber-danger/10"
            disabled={!baseUrl || !endpoint}
          >
            <Copy className="h-4 w-4 mr-2" />
            إنشاء Payload
          </Button>
          <Button 
            onClick={runSimulation}
            className="flex-1 bg-cyber-danger hover:bg-cyber-danger/90 text-primary-foreground"
            disabled={!baseUrl || !endpoint || isLoading}
          >
            <Play className="h-4 w-4 mr-2" />
            {isLoading ? "جاري الفحص..." : "محاكاة الفحص"}
          </Button>
        </div>

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-medium">نتائج الفحص</Label>
              <Button 
                size="sm" 
                variant="outline"
                onClick={exportResults}
                className="border-cyber-primary text-cyber-primary hover:bg-cyber-primary/10"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                تصدير التقرير
              </Button>
            </div>
            
            <div className="max-h-96 overflow-y-auto space-y-2">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">ID: {result.id}</span>
                      <Badge variant={result.status === 200 ? "default" : "secondary"}>
                        {result.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {result.url}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={result.severity === "success" ? "default" : "destructive"}
                      className={
                        result.severity === "success" ? "bg-cyber-success/20 text-cyber-success" :
                        result.severity === "warning" ? "bg-cyber-warning/20 text-cyber-warning" :
                        "bg-cyber-danger/20 text-cyber-danger"
                      }
                    >
                      {result.vulnerability}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium text-sm mb-2">كيفية استخدام الأداة:</h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>1. أدخل URL الأساسي للموقع المراد اختباره</li>
            <li>2. حدد المسار (endpoint) الذي يحتوي على معرف كائن</li>
            <li>3. اختر اسم المعامل (عادة id أو user_id)</li>
            <li>4. حدد نطاق الاختبار (مثال: 1-100)</li>
            <li>5. اضغط "إنشاء Payload" للحصول على أوامر cURL</li>
            <li>6. أو "محاكاة الفحص" لاختبار تجريبي</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdorTester;