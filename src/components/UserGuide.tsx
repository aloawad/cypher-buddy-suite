import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Key, 
  Search, 
  AlertTriangle, 
  Lock, 
  Users, 
  FileText, 
  Eye,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";

const UserGuide = () => {
  return (
    <div className="space-y-6">
      <Card className="border-cyber-primary/20 bg-gradient-to-r from-cyber-primary/5 to-cyber-secondary/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyber-primary/20 rounded-lg">
              <FileText className="h-6 w-6 text-cyber-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">📚 دليل الاستخدام الشامل</CardTitle>
              <CardDescription>تعرف على جميع أدوات Cypher Buddy Suite</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Caesar Cipher Guide */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-cyber-primary" />
              <h3 className="text-xl font-semibold text-cyber-primary">1. تشفير سيزار (Caesar Cipher)</h3>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Info className="h-4 w-4" />
                ما هو تشفير سيزار؟
              </h4>
              <p className="text-sm text-muted-foreground">
                تشفير بديل بسيط يقوم بإزاحة كل حرف في النص بعدد ثابت من المواضع في الأبجدية.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">خطوات التشفير</Badge>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• أدخل النص المراد تشفيره</li>
                    <li>• اختر مفتاح الإزاحة (1-25)</li>
                    <li>• انقر على "تشفير"</li>
                    <li>• انسخ النص المشفر</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">خطوات فك التشفير</Badge>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• أدخل النص المشفر</li>
                    <li>• أدخل نفس مفتاح التشفير</li>
                    <li>• انقر على "فك التشفير"</li>
                    <li>• احصل على النص الأصلي</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-cyber-warning/10 border border-cyber-warning/20 rounded-lg p-3">
                <h5 className="font-medium text-cyber-warning mb-2">💡 مثال عملي:</h5>
                <div className="text-sm space-y-1">
                  <p><strong>النص الأصلي:</strong> "Hello World"</p>
                  <p><strong>مفتاح الإزاحة:</strong> 3</p>
                  <p><strong>النص المشفر:</strong> "Khoor Zruog"</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Password Generator Guide */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-cyber-secondary" />
              <h3 className="text-xl font-semibold text-cyber-secondary">2. مولد كلمات المرور المتقدم</h3>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                مولد متعدد الحسابات
              </h4>
              <p className="text-sm text-muted-foreground">
                يمكنك إنشاء كلمات مرور منفصلة لحسابات متعددة مع خصائص مختلفة لكل حساب.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">الخصائص المتاحة</Badge>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>✅ أحرف كبيرة (A-Z)</li>
                    <li>✅ أحرف صغيرة (a-z)</li>
                    <li>✅ أرقام (0-9)</li>
                    <li>✅ رموز خاصة (!@#$)</li>
                    <li>✅ طول قابل للتخصيص</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">مستويات القوة</Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>ضعيف: أقل من 8 أحرف</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>متوسط: 8-12 حرف</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>قوي: أكثر من 12 حرف</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">نصائح الأمان</Badge>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>🔒 استخدم كلمة مرور مختلفة لكل حساب</li>
                    <li>📱 فعل المصادقة الثنائية</li>
                    <li>💾 احفظ في مدير كلمات المرور</li>
                    <li>🔄 غير كلمات المرور دورياً</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Password Analyzer Guide */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-cyber-accent" />
              <h3 className="text-xl font-semibold text-cyber-accent">3. محلل قوة كلمات المرور</h3>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Eye className="h-4 w-4" />
                معايير التحليل
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-3">
                  <Badge variant="secondary" className="w-fit">العوامل الإيجابية</Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>الطول (8+ أحرف)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>أحرف كبيرة وصغيرة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>أرقام</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>رموز خاصة</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Badge variant="destructive" className="w-fit">العوامل السلبية</Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span>أحرف متتالية (abc, 123)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span>تكرار الأحرف (aaa)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span>كلمات مألوفة</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span>أنماط لوحة المفاتيح</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* IDOR Tester Guide */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-cyber-warning" />
              <h3 className="text-xl font-semibold text-cyber-warning">4. اختبار ثغرة IDOR</h3>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="bg-cyber-warning/10 border border-cyber-warning/20 rounded-lg p-3">
                <h4 className="font-medium text-cyber-warning mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  ⚠️ تحذير مهم
                </h4>
                <p className="text-sm text-muted-foreground">
                  هذه الأداة مخصصة للأغراض التعليمية فقط. لا تستخدمها على مواقع لا تملكها.
                </p>
              </div>
              
              <h4 className="font-medium flex items-center gap-2">
                <Info className="h-4 w-4" />
                ما هي ثغرة IDOR؟
              </h4>
              <p className="text-sm text-muted-foreground">
                ثغرة الوصول المباشر غير المصرح للكائنات - تحدث عندما يمكن للمستخدم الوصول لبيانات مستخدمين آخرين بتغيير معرف الكائن.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">طرق الاختبار</Badge>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• تغيير معرف المستخدم في URL</li>
                    <li>• تعديل معاملات POST</li>
                    <li>• اختبار القيم السالبة</li>
                    <li>• تجربة أرقام عشوائية</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">الحماية</Badge>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• فحص الصلاحيات</li>
                    <li>• استخدام UUID</li>
                    <li>• التحقق من الملكية</li>
                    <li>• تشفير المعرفات</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* General Tips */}
          <div className="bg-gradient-to-r from-cyber-primary/10 to-cyber-secondary/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              🎯 نصائح عامة للأمان
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-cyber-primary">للطلاب</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>📖 تعلم نظرياً قبل التطبيق</li>
                  <li>🧪 اختبر في بيئات آمنة</li>
                  <li>👥 شارك المعرفة بمسؤولية</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-cyber-secondary">للمطورين</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>🔒 طبق الأمان منذ البداية</li>
                  <li>🧪 اختبر أمان تطبيقاتك</li>
                  <li>📚 ابق مطلعاً على الثغرات</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-cyber-accent">للجميع</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>⚖️ استخدم الأدوات بقانونية</li>
                  <li>🤝 احترم خصوصية الآخرين</li>
                  <li>🎓 الهدف التعلم والحماية</li>
                </ul>
              </div>
            </div>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGuide;