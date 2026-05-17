import { getTranslations } from "next-intl/server";
import { LandingPicterOne, LandingPicture } from "./landingCom";
import Link from "next/link";
import Button from "@/components/Buttons/Button";
import Image from "next/image";

export default async function Landing() {
    const t = await getTranslations('HomePage')
    return (
        <>
            <LandingPicterOne />
            <div className="h-screen mt-6 lg:h-1/2 flex  lg:gap-8 px-8">
                <div className="text-display-large w-full lg:w-1/2 flex flex-col items-center md:items-start gap-6">
                    <Image src={'/logo.jpeg'} alt="logo" className="size-32 rounded-full overflow-hidden" width={500} height={500} />
                    <h1 className="text-display-medium lg:text-display-large text-on-secondary dark:text-dark-on-secondary">
                        {t('title')}
                    </h1>
                    <div className="flex flex-col gap-3">
                        <p className="text-body-medium lg:text-body-large text-on-secondary dark:text-dark-on-secondary">
                            {t('description')}
                        </p>
                        <Link href={'/join'}>
                            <Button mode="filled">
                                {t('joinus')}
                            </Button>
                        </Link>
                    </div>
                </div>
                <LandingPicture />
            </div>
            <div className="w-full py-16 bg-surface-container dark:bg-dark-surface-container">
                <div className="container mx-auto px-4">
                    <h2 className="text-display-medium text-center mb-12 text-on-surface dark:text-dark-on-surface">
                        نظام المراقبة الذكية للأطفال
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-surface-variant dark:bg-dark-surface-variant p-6 rounded-xl shadow-md">
                            <h3 className="text-headline-medium text-primary dark:text-dark-primary mb-4">
                                المسافة الآمنة
                            </h3>
                            <p className="text-body-large text-on-surface-variant dark:text-dark-on-surface-variant">
                                إبقاء طفلك ضمن المسافة الآمنة دائماً
                            </p>
                            <div className="flex items-center mt-4">
                                <span className="text-body-large text-on-surface dark:text-dark-on-surface">
                                    المسافة الآمنة - راحة طفلك ✅
                                </span>
                            </div>
                        </div>

                        <div className="bg-surface-variant dark:bg-dark-surface-variant p-6 rounded-xl shadow-md">
                            <h3 className="text-headline-medium text-primary dark:text-dark-primary mb-4">
                                حالة الطوارئ
                            </h3>
                            <p className="text-body-large text-on-surface-variant dark:text-dark-on-surface-variant">
                                إبقاء طفلك في الحماية الموجهة عند الخروج من النطاق الآمن
                            </p>
                        </div>
                    </div>

                    <div className="bg-surface-variant dark:bg-dark-surface-variant p-6 rounded-xl shadow-md mb-8">
                        <h3 className="text-headline-medium text-primary dark:text-dark-primary mb-4">
                            التتبع الذكي
                        </h3>
                        <p className="text-body-large text-on-surface-variant dark:text-dark-on-surface-variant">
                            مع تقنية التتبع الذكي، يمكنك تحديد نطاق آمن لحركة طفلك وتلقي إشعارات فورية عند تجاوزه. احصل على راحة البال مع خاصية التنبيه الفوري، وإشعارات المناطق الخطرة، وحالة الطوارئ لحماية طفلك في أي وقت وأي مكان.
                        </p>
                    </div>

                    <div className="bg-error-container dark:bg-dark-error-container p-4 rounded-lg border-r-4 border-error dark:border-dark-error mb-8">
                        <p className="text-body-large text-on-error-container dark:text-dark-on-error-container">
                            <strong>تنبيه فوري!</strong> طفلك يقترب من منطقة خطرة
                        </p>
                    </div>

                    <div className="bg-surface-variant dark:bg-dark-surface-variant p-6 rounded-xl shadow-md">
                        <h3 className="text-headline-medium text-primary dark:text-dark-primary mb-4">
                            كيف يعمل النظام؟
                        </h3>
                        <p className="text-body-large text-on-surface-variant dark:text-dark-on-surface-variant">
                            "بفضل نظام التتبع الذكي، يتم رصد تحركات الطفل بدقة وإرسال تنبيهات فورية للوالدين عند الاقتراب من أي منطقة غير آمنة. يتيح هذا النظام للآباء متابعة أطفالهم في الوقت الحقيقي، مما يساعدهم على التحرك بسرعة وضمان سلامة أطفالهم في كل لحظة".
                        </p>
                    </div>
                </div>
            </div>
            {/* Child Safety Monitoring Section */}
            <div className="w-full py-16 bg-surface-container dark:bg-dark-surface-container">
                <div className="container mx-auto px-4">
                    <h2 className="text-display-medium text-center mb-12 text-on-surface dark:text-dark-on-surface">
                        نظام المراقبة الذكية للأطفال
                    </h2>

                    {/* Emergency Button Section */}
                    <div className="bg-surface-variant dark:bg-dark-surface-variant p-8 rounded-xl shadow-md mb-12">
                        <h3 className="text-headline-medium text-primary dark:text-dark-primary mb-6 text-center">
                            زر الطوارئ - أمان طفلك بين يديك!
                        </h3>
                        <p className="text-body-large text-on-surface-variant dark:text-dark-on-surface-variant mb-6">
                            عند الضغط على زر الطوارئ في السوار، يتلقى الوالدان تنبيهًا مع موقع الطفل بدقة، مما يضمن استجابة سريعة في الحالات الطارئة ويعتبر راحة البال والتدخل السريع لحمايته.
                        </p>

                        <div className="bg-tertiary-container dark:bg-dark-tertiary-container p-6 rounded-lg mb-6">
                            <p className="text-body-large text-on-tertiary-container dark:text-dark-on-tertiary-container">
                                في لحظات غير متوقعة عندما يقترب الخطر ولا يكون أحد بالقرب، يعتبر زر الاستغاثة في سوار Distance Safe الحل الأمثل لطفلك، حيث يمكنك طلب المساعدة فورًا قبل فوات الأوان.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-title-large text-on-surface dark:text-dark-on-surface mb-4">
                                    ميزات سوار Distance Safe الذكي:
                                </h4>
                                <ul className="list-disc list-inside space-y-2 text-body-large text-on-surface-variant dark:text-dark-on-surface-variant">
                                    <li>تحديد موقع دقيق في الوقت الفعلي</li>
                                    <li>تنبيهات فورية عند دخوله مناطق خطرة</li>
                                    <li>زر استغاثة يعمل فورًا عند الطلب</li>
                                    <li>متابعة وإدارة السلامة عبر تطبيق خاص</li>
                                </ul>
                            </div>

                            <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg">
                                <h4 className="text-title-large text-on-surface dark:text-dark-on-surface mb-4">
                                    جدول استخدام السوار الذكي
                                </h4>
                                <table className="w-full text-body-medium">
                                    <thead>
                                        <tr className="border-b border-outline-variant dark:border-dark-outline-variant">
                                            <th className="pb-2 text-start">الوقت واليوم</th>
                                            <th className="pb-2 text-start">النشاط والمكان</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-outline-variant dark:border-dark-outline-variant">
                                            <td className="py-3">8:00 ص</td>
                                            <td className="py-3">الذهاب إلى المدرسة</td>
                                        </tr>
                                        <tr className="border-b border-outline-variant dark:border-dark-outline-variant">
                                            <td className="py-3">2:00 م</td>
                                            <td className="py-3">العودة من المدرسة</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Additional Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-primary-container dark:bg-dark-primary-container p-6 rounded-xl">
                            <h4 className="text-title-large text-on-primary-container dark:text-dark-on-primary-container mb-3">
                                إعدادات السلامة
                            </h4>
                            <ul className="space-y-2 text-body-medium text-on-primary-container dark:text-dark-on-primary-container">
                                <li>• تحديد المناطق الآمنة</li>
                                <li>• ضبط إشعارات الخطر</li>
                                <li>• تفعيل وضع الطوارئ</li>
                            </ul>
                        </div>

                        <div className="bg-secondary-container dark:bg-dark-secondary-container p-6 rounded-xl">
                            <h4 className="text-title-large text-on-secondary-container dark:text-dark-on-secondary-container mb-3">
                                التاريخ والنشاطات
                            </h4>
                            <p className="text-body-medium text-on-secondary-container dark:text-dark-on-secondary-container">
                                تسجيل كافة تحركات الطفل وأنشطته اليومية
                            </p>
                        </div>

                        <div className="bg-tertiary-container dark:bg-dark-tertiary-container p-6 rounded-xl">
                            <h4 className="text-title-large text-on-tertiary-container dark:text-dark-on-tertiary-container mb-3">
                                حماية متكاملة
                            </h4>
                            <p className="text-body-medium text-on-tertiary-container dark:text-dark-on-tertiary-container">
                                احصل على سوار Distance Safe، لأن حماية طفلك أهم استثمار
                            </p>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="text-center">
                        <h3 className="text-headline-medium text-on-surface dark:text-dark-on-surface mb-6">
                            طفلك يستحق أعلى معايير الحماية
                        </h3>
                        <Button mode="filled" >
                            احصل على السوار الذكي الآن
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}