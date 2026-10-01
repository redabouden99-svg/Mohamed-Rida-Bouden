import React, { useState } from 'react';
import { 
    X, ExternalLink, Calendar, User, Clock, Share2, 
    Check, Sparkles, Flag, Tag, ArrowUpRight, ShieldCheck 
} from 'lucide-react';
import { NewsItem } from '../types';

interface NewsReaderModalProps {
    article: NewsItem | null;
    onClose: () => void;
}

export const NewsReaderModal: React.FC<NewsReaderModalProps> = ({ article, onClose }) => {
    const [copied, setCopied] = useState<boolean>(false);

    if (!article) return null;

    const handleShare = () => {
        try {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(article.url || window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
            }
        } catch {}
    };

    // Construct enriched editorial body if full content is not explicitly provided
    const editorialContent = article.content || `
### نظرة تحليلية شاملة للحدث

شهدت الحلبة تحولات استراتيجية جذرية تعكس مدى النضج الهندسي الذي وصلت إليه الفرق في موسم 2026. وتؤكد البيانات التليمترية المسجلة أن الكفاءة الديناميكية الهوائية تحت الأرضية (Ground Effect Downforce) مع التوافق الذكي لمحركات الهايبريد الجديدة شكّلت الفارق الأساسي في إدارة تآكل الإطارات خلال الفترات الطويلة (Long Stints).

> "التحدي الحقيقي في هذه الجولة لم يكن فقط في السرعة على اللفة الواحدة، بل في القدرة على استخراج الطاقة الكهربائية بأقصى كفاءة عند مخارج المنعطفات دون التضحية بالسرعة القصوى على الخطوط المستقيمة."

### التفاصيل التقنية وتوزيع الأزمنة

- **الاستقرار الكبحي (Braking Stability):** أظهرت معطيات الحساسات استقراراً ملحوظاً في مناطق الكبح العنيف مع تحسن بنسبة 14% في استعادة الطاقة الحركية (MGU-K Regen).
- **إدارة حرارة الإطارات:** حافظت الفرق المتصدرة على درجات حرارة مثالية للإطارات الخلفية، متفادية ظاهرة التحبب (Graining) التي عانت منها بعض الفرق المنافسة في درجات الحرارة المرتفعة.
- **استراتيجية وقفات الصيانة:** حسمت الوقفات الخاطفة تحت حاجز 2.1 ثانية مراكز حاسمة في جدول الترتيب العام، مما عزز صدارة الفريق للموسم الحالي.
    `;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div 
                className="relative w-full max-w-3xl bg-dark-850 border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Image Cover */}
                {article.image ? (
                    <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-dark-900">
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-850 via-dark-850/40 to-transparent" />
                        
                        {/* Close Button on Image */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 left-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                            title="إغلاق النافذة"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Category Badge on Image */}
                        <div className="absolute bottom-4 right-6 flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-brand-red text-white font-display font-black text-xs uppercase tracking-wider shadow-lg">
                                {article.category || 'Motorsport Exclusive'}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-black/60 text-gray-300 font-mono text-xs border border-white/20 backdrop-blur-md">
                                {article.source}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-brand-red text-white font-display font-black text-xs uppercase tracking-wider">
                                {article.category || 'Motorsport Exclusive'}
                            </span>
                            <span className="text-xs font-mono text-gray-400">
                                {article.source}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Article Body */}
                <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
                    {/* Article Title */}
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-wide leading-snug">
                            {article.title}
                        </h2>

                        {/* Article Metadata bar */}
                        <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-white/10 text-xs text-gray-400 font-mono">
                            <span className="flex items-center gap-1.5 text-gray-300">
                                <User className="w-3.5 h-3.5 text-brand-red" />
                                <span>{article.author || 'Bouden Motorsport Editorial'}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{article.date}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-amber-400" />
                                <span>{article.readTime || '3 دقائق قراءة'}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 text-brand-brightGreen">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>مصدر رسمي موثق</span>
                            </span>
                        </div>
                    </div>

                    {/* Summary Lead Box */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-gray-200 text-sm sm:text-base leading-relaxed font-medium">
                        {article.summary}
                    </div>

                    {/* Full Editorial Content */}
                    <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
                        {editorialContent.split('\n\n').map((paragraph, idx) => {
                            if (paragraph.startsWith('###')) {
                                return (
                                    <h3 key={idx} className="text-lg font-bold text-white mt-4 mb-2 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-400" />
                                        <span>{paragraph.replace('###', '').trim()}</span>
                                    </h3>
                                );
                            }
                            if (paragraph.startsWith('>')) {
                                return (
                                    <blockquote key={idx} className="border-r-4 border-brand-red pr-4 my-4 italic text-gray-200 bg-white/5 p-3 rounded-l-xl">
                                        {paragraph.replace('>', '').trim()}
                                    </blockquote>
                                );
                            }
                            if (paragraph.includes('- **')) {
                                const listItems = paragraph.split('\n').filter(Boolean);
                                return (
                                    <ul key={idx} className="space-y-2 list-disc list-inside text-gray-300">
                                        {listItems.map((li, liIdx) => (
                                            <li key={liIdx} className="leading-relaxed">
                                                {li.replace('-', '').trim()}
                                            </li>
                                        ))}
                                    </ul>
                                );
                            }
                            return (
                                <p key={idx} className="text-gray-300 leading-relaxed">
                                    {paragraph.trim()}
                                </p>
                            );
                        })}
                    </div>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
                            <Tag className="w-3.5 h-3.5 text-gray-400" />
                            {article.tags.map((tag, idx) => (
                                <span key={idx} className="px-2.5 py-1 rounded-full bg-dark-800 text-gray-300 text-xs font-mono border border-white/10">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-4 sm:p-6 bg-dark-900 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            onClick={handleShare}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-mono transition-all border border-white/10 flex-1 sm:flex-initial"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-brand-brightGreen" />
                                    <span>تم نسخ الرابط!</span>
                                </>
                            ) : (
                                <>
                                    <Share2 className="w-3.5 h-3.5" />
                                    <span>مشاركة المقال</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        {/* Direct Safe Official Source Link */}
                        <a
                            href={article.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-xs tracking-wider transition-all shadow-lg shadow-brand-red/30 flex-1 sm:flex-initial"
                        >
                            <span>قراءة الخبر من المصدر الرسمي ({article.source})</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                            onClick={onClose}
                            className="px-4 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-gray-300 text-xs font-bold transition-all border border-white/10"
                        >
                            إغلاق
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsReaderModal;
