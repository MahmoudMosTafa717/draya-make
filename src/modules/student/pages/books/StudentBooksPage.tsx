import * as React from "react";
import { Search, Download, FileText, X, BookOpen, ChevronLeft, ChevronRight, Eye, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { P } from "@/shared/constants/photos";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";
import { EmptyState } from "@/shared/components/ui/EmptyState";
import { toast } from "@/shared/components/ui/Toast";

interface IBookItem {
  title: string;
  subject: string;
  size: string;
  img: string;
  pages: number;
  chapters: string[];
  accent: string;
  badgeColor: string;
}

export const StudentBooksPage: React.FC = () => {
  const [searchVal, setSearchVal] = React.useState("");
  const [activePreviewBook, setActivePreviewBook] = React.useState<IBookItem | null>(null);
  const [activePreviewPage, setActivePreviewPage] = React.useState(1);

  const books: IBookItem[] = [
    {
      title: "رياضيات الصف الثالث الثانوي",
      subject: "رياضيات",
      size: "8.4 MB",
      img: P.mathChalkboard,
      pages: 312,
      chapters: ["1. المصفوفات والمحددات", "2. الهندسة الفراغية", "3. التفاضل والتكامل"],
      accent: "#0EA5E9",
      badgeColor: "bg-sky-500 text-white"
    },
    {
      title: "الفيزياء الحديثة — الجزء الأول",
      subject: "فيزياء",
      size: "12.1 MB",
      img: P.physicsLab,
      pages: 280,
      chapters: ["1. الكهرومغناطيسية", "2. الفيزياء الذرية", "3. أشباه الموصلات"],
      accent: "#8B5CF6",
      badgeColor: "bg-purple-500 text-white"
    },
    {
      title: "كيمياء عضوية متقدمة لطلبة اللغات",
      subject: "كيمياء",
      size: "6.7 MB",
      img: P.chemistryLab,
      pages: 195,
      chapters: ["1. الهيدروكربونات الأليفاتية", "2. المركبات الحلقية", "3. البوليمرات والبروتينات"],
      accent: "#10B981",
      badgeColor: "bg-emerald-500 text-white"
    },
    {
      title: "المراجعة النهائية — علمي رياضة",
      subject: "متنوع",
      size: "5.2 MB",
      img: P.studentLaptop,
      pages: 120,
      chapters: ["1. ملخص القوانين الهامة", "2. نماذج اختبارات الوزارة", "3. الإجابات النموذجية"],
      accent: "#F43F5E",
      badgeColor: "bg-rose-500 text-white"
    },
  ];

  const filtered = books.filter(b => b.title.toLowerCase().includes(searchVal.toLowerCase()) || b.subject.toLowerCase().includes(searchVal.toLowerCase()));

  const handleDownload = (title: string) => {
    toast.success("بدء تحميل الكتاب الدراسي", `يتم الآن تحميل ملف PDF الخاص بكتاب [${title}].`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col gap-8 relative"
      style={{ direction: "rtl" }}
    >
      {/* Background Organic Blobs */}
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-teal-400/20 to-sky-300/15 blur-3xl animate-float-blob pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-400/15 to-pink-300/15 blur-3xl animate-float-slow pointer-events-none z-0" />

      {/* Header */}
      <div className="flex flex-col gap-2 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-[#0F4F49] text-xs font-extrabold w-fit mb-1">
          <BookOpen size={14} className="text-amber-500" />
          <span>المكتبة الأكاديمية الرقمية</span>
        </div>
        <SectionTitle sub="استعرض الكتب والمذكرات الأكاديمية والملخصات المرفقة بموادك الدراسية للتحميل والمذاكرة أوفلاين.">
          مكتبة المذكرات والكتب الدراسية
        </SectionTitle>
      </div>

      {/* Search Input Box */}
      <motion.div variants={itemVariants} className="rounded-3xl p-5 bg-white border border-slate-100 shadow-xl z-10">
        <div className="relative w-full">
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="بحث باسم الكتاب، المادة، أو الفصل الدراسي..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full pr-11 pl-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-teal-500 focus:bg-white transition-all shadow-inner"
          />
        </div>
      </motion.div>

      {/* Books Grid View */}
      {filtered.length === 0 ? (
        <EmptyState
          title="لم نجد أي كتب دراسية"
          description="جرّب تعديل خيارات البحث للوصول لكتب أخرى."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-10">
          {filtered.map(b => (
            <motion.div
              key={b.title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="rounded-3xl bg-white border border-slate-100 shadow-xl overflow-hidden flex flex-col h-[380px] group transition-all duration-300 relative"
            >
              {/* 3D Book Cover Flip Area */}
              <div className="book-card-container" style={{ height: "190px" }}>
                <div className="book-card-inner">
                  {/* Front Cover */}
                  <div className="book-card-front relative">
                    <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${b.badgeColor} shadow-md`}>
                        {b.subject}
                      </span>
                    </div>
                  </div>

                  {/* Back Cover */}
                  <div className="book-card-back p-4 text-right flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-300 font-extrabold text-xs mb-2">
                        <Sparkles size={14} /> الفصول الرئيسية:
                      </div>
                      <ul className="text-xs space-y-1 text-slate-200">
                        {b.chapters.slice(0, 3).map((ch, i) => (
                          <li key={i} className="truncate font-medium">· {ch}</li>
                        ))}
                      </ul>
                    </div>
                    <span className="text-[10px] text-slate-300 font-bold bg-white/10 p-2 rounded-xl backdrop-blur-sm text-center">
                      انقر للمعاينة وقراءة الفهرس بالكامل 📖
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Book Details and Action Buttons */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#0F4F49] transition-colors">
                    {b.title}
                  </h3>
                  <span className="text-xs font-semibold text-slate-400 mt-1 block">
                    {b.pages} صفحة · {b.size} · PDF
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex-1 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
                    onClick={() => handleDownload(b.title)}
                  >
                    <Download size={13} className="ml-1" />
                    تحميل
                  </Button>
                  
                  <Button
                    variant="tertiary"
                    size="sm"
                    className="flex-1 rounded-xl text-xs font-bold cursor-pointer text-[#0F4F49] bg-teal-50 border border-teal-200/60 hover:bg-teal-100/60"
                    onClick={() => {
                      setActivePreviewBook(b);
                      setActivePreviewPage(1);
                    }}
                  >
                    <Eye size={13} className="ml-1" />
                    معاينة
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Inline PDF Reader Previewer Modal */}
      <AnimatePresence>
        {activePreviewBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl h-[85vh] rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{activePreviewBook.title}</h3>
                  <span className="text-xs font-medium text-slate-500">مكتبة درايَة الرقمية - معاينة سريعة</span>
                </div>
                <button 
                  onClick={() => setActivePreviewBook(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body (Reader Simulator) */}
              <div className="flex-1 p-6 overflow-y-auto flex flex-col md:flex-row gap-6">
                {/* Left Side: Table of Contents */}
                <div className="w-56 border-l border-slate-100 pl-4 hidden md:flex flex-col gap-2 shrink-0">
                  <span className="font-extrabold text-xs text-slate-700 mb-1">الفهرس الدراسي</span>
                  {activePreviewBook.chapters.map((ch, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePreviewPage(idx + 1)}
                      className={`text-right text-xs p-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                        activePreviewPage === idx + 1
                          ? "bg-[#0F4F49] text-white shadow-md"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>

                {/* Right Side: Page Canvas Simulator */}
                <div className="flex-1 bg-[#FCFAF6] border border-[#E6E1D3] rounded-2xl p-8 flex flex-col justify-between relative shadow-inner min-h-[340px]">
                  <div className="flex justify-between items-center border-b border-[#E6E1D3] pb-3 mb-4">
                    <span className="text-xs font-extrabold text-[#0F4F49]">درايَة التعليمية - المنهج الرسمي</span>
                    <span className="text-xs font-bold text-slate-500">الصفحة {activePreviewPage} من {activePreviewBook.pages}</span>
                  </div>

                  {/* Simulated Content Pages */}
                  {activePreviewPage === 1 && (
                    <div className="flex-1">
                      <h2 className="text-lg font-extrabold text-slate-900 mb-3 font-sans">
                        {activePreviewBook.chapters[0]}
                      </h2>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">
                        تعتبر المصفوفات أداة رياضية فعالة لحل الأنظمة الخطية وتنظيم البيانات الهندسية. في هذا الجزء، سنتناول جمع وطرح المصفوفات وخصائص الضرب وكيفية استخدام المحددات لحساب المساحات الفراغية وتعيين معكوس المصفوفات الثنائية والثلاثية.
                      </p>
                      <div className="mt-6 border border-dashed border-teal-600/30 rounded-2xl p-4 bg-teal-50/40 text-center">
                        <span className="text-xs font-extrabold text-[#0F4F49]">💡 نصيحة دراسات درايَة الذكية:</span>
                        <p className="text-xs font-medium text-slate-600 mt-1">
                          تذكر دائماً أن ضرب المصفوفات ليس تبديلياً، أي أن AB لا يساوي بالضرورة BA.
                        </p>
                      </div>
                    </div>
                  )}

                  {activePreviewPage === 2 && (
                    <div className="flex-1">
                      <h2 className="text-lg font-extrabold text-slate-900 mb-3 font-sans">
                        {activePreviewBook.chapters[1]}
                      </h2>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">
                        تعتمد الهندسة الفراغية على إدراك الأبعاد الثلاثية وتحديد المتجهات في الفراغ. سنتعرف على طريقة حساب الضرب القياسي والضرب الاتجاهي للمتجهات، والزاوية بين مستقيمين، وطرق إيجاد معادلة خط مستقيم ومعادلة المستوى في الفراغ بشكل مبسط.
                      </p>
                    </div>
                  )}

                  {activePreviewPage === 3 && (
                    <div className="flex-1">
                      <h2 className="text-lg font-extrabold text-slate-900 mb-3 font-sans">
                        {activePreviewBook.chapters[2]}
                      </h2>
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">
                        التفاضل والتكامل هما العمود الفقري للرياضيات والفيزياء الحديثة. في هذا الباب، سنتعلم كيفية اشتقاق الدوال المثلثية العكسية، وتكاملات الدوال المركبة، واستخدام التكامل المحدد لحساب حجوم الأجسام الدورانية المتولدة حول المحاور الإحداثية.
                      </p>
                    </div>
                  )}

                  {activePreviewPage > 3 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                      <FileText size={48} className="text-slate-300 mb-3" />
                      <h4 className="font-extrabold text-slate-900 mb-1">نهاية العرض المجاني للمعاينة</h4>
                      <p className="text-xs font-medium text-slate-500 max-w-xs mb-4">
                        لقد استعرضت الصفحات الثلاث الأولى مجاناً. يمكنك تحميل الكتاب كاملاً بصيغة PDF للمذاكرة أوفلاين.
                      </p>
                      <Button variant="primary" onClick={() => handleDownload(activePreviewBook.title)} className="rounded-xl text-xs font-bold">
                        <Download size={14} className="ml-1.5" />
                        تحميل الكتاب كاملاً
                      </Button>
                    </div>
                  )}

                  {/* Footer Controls */}
                  <div className="flex justify-between items-center border-t border-[#E6E1D3] pt-3 mt-4">
                    <button 
                      disabled={activePreviewPage === 1}
                      onClick={() => setActivePreviewPage(p => p - 1)}
                      className={`flex items-center gap-1 text-xs font-extrabold transition-colors cursor-pointer ${
                        activePreviewPage === 1 ? "text-slate-300 cursor-not-allowed" : "text-[#0F4F49]"
                      }`}
                    >
                      <ChevronRight size={16} />
                      الصفحة السابقة
                    </button>

                    <button 
                      disabled={activePreviewPage === activePreviewBook.chapters.length + 1}
                      onClick={() => setActivePreviewPage(p => p + 1)}
                      className={`flex items-center gap-1 text-xs font-extrabold transition-colors cursor-pointer ${
                        activePreviewPage === activePreviewBook.chapters.length + 1 ? "text-slate-300 cursor-not-allowed" : "text-[#0F4F49]"
                      }`}
                    >
                      الصفحة التالية
                      <ChevronLeft size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setActivePreviewBook(null)} className="rounded-xl text-xs font-bold">
                  إغلاق المعاينة
                </Button>
                <Button variant="primary" onClick={() => handleDownload(activePreviewBook.title)} className="rounded-xl text-xs font-bold">
                  تحميل PDF كامل
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentBooksPage;
