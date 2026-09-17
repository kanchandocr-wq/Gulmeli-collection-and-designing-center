import React, { useState } from 'react';
import { CustomDesignEnquiry } from '../types';
import {
  Scissors,
  CheckCircle2,
  Upload,
  MessageCircle,
  Sparkles,
  Calendar,
  Ruler,
  Phone,
  User,
  HelpCircle,
  FileText,
} from 'lucide-react';

interface CustomDesigningProps {
  onSaveEnquiry: (enquiry: CustomDesignEnquiry) => void;
  whatsappNumber: string;
}

export const CustomDesigning: React.FC<CustomDesigningProps> = ({
  onSaveEnquiry,
  whatsappNumber,
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    designType: 'Saree Blouse & Stitching',
    preferredDate: '',
    bust: '',
    waist: '',
    hip: '',
    length: '',
    shoulder: '',
    measurementNotes: '',
    requirements: '',
    message: '',
  });

  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showMeasurementHelper, setShowMeasurementHelper] = useState(false);

  const designTypes = [
    'Saree Blouse & Tailoring',
    'Custom Kurti & Palazzo Set',
    'Heavy Bridal Lehenga',
    'Party Wear Gown',
    'Salwar & Sharara Suit',
    'Traditional Nepali Attire / Gunyo Cholo',
    'Western / Indo-Western Fusion Dress',
    'Restyling / Alteration Service',
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) {
      alert('Please provide your name and phone number so our designer can contact you.');
      return;
    }

    setSubmitting(true);
    const newEnquiry: CustomDesignEnquiry = {
      id: 'des-' + Date.now(),
      customerName: formData.customerName,
      phone: formData.phone,
      designType: formData.designType,
      preferredDate: formData.preferredDate || new Date().toISOString().split('T')[0],
      measurements: {
        bust: formData.bust,
        waist: formData.waist,
        hip: formData.hip,
        length: formData.length,
        shoulder: formData.shoulder,
        notes: formData.measurementNotes,
      },
      requirements: formData.requirements,
      referenceImage: referenceImage || undefined,
      message: formData.message,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Pending',
    };

    setTimeout(() => {
      onSaveEnquiry(newEnquiry);
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleWhatsAppChat = () => {
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '') || '9779800000000';
    let text = `Namaste Gulmeli Collection & Designing Center! I would like to enquire about Custom Designing.`;
    if (formData.customerName) text += `\nName: ${formData.customerName}`;
    if (formData.phone) text += `\nPhone: ${formData.phone}`;
    text += `\nDesign Type: ${formData.designType}`;
    if (formData.preferredDate) text += `\nTarget Date: ${formData.preferredDate}`;
    if (formData.bust || formData.waist) {
      text += `\nMeasurements: Bust: ${formData.bust || '-'}, Waist: ${formData.waist || '-'}, Hip: ${formData.hip || '-'}`;
    }
    if (formData.requirements) text += `\nRequirements: ${formData.requirements}`;

    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const steps = [
    {
      num: '01',
      title: 'Choose Your Style',
      nepali: 'आफ्नो रोजाइ छान्नुहोस्',
      desc: 'Select your preferred silhouette, fabric, neckline, or reference look from our catalog.',
    },
    {
      num: '02',
      title: 'Share Your Idea',
      nepali: 'आफ्नो विचार सेयर गर्नुहोस्',
      desc: 'Upload reference sketches, screenshots, or describe your personal inspiration.',
    },
    {
      num: '03',
      title: 'Discuss Measurements',
      nepali: 'नाप तथा साइज छलफल',
      desc: 'Provide your measurements online or visit our Ranibagiya studio for custom fitting.',
    },
    {
      num: '04',
      title: 'Confirm Design',
      nepali: 'डिजाइन फाइनल गर्नुहोस्',
      desc: 'Our boutique master confirms fabric details, embellishments, and delivery timeline.',
    },
    {
      num: '05',
      title: 'Get Your Custom Creation',
      nepali: 'तयार पहिरन प्राप्त गर्नुहोस्',
      desc: 'Pick up your bespoke outfit with trial fitting or receive delivery to your doorstep.',
    },
  ];

  return (
    <section id="custom-designing" className="py-16 sm:py-24 bg-[#FAF5FA] relative overflow-hidden">
      {/* Decorative Gold & Purple Flourishes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7B1865]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCFBF9] border border-[#E5CEE5] text-[#7B1865] text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            <Scissors className="w-3.5 h-3.5 text-[#7B1865]" />
            <span>CORE BRAND FEATURE • BESPOKE STUDIO</span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl text-[#1E152A] font-bold tracking-tight">
            Designed For You
          </h2>
          <p className="text-lg sm:text-xl text-[#7B1865] font-serif-luxury italic mt-2">
            Your idea. Your style. Our designing.
          </p>
          <p className="text-sm sm:text-base text-[#6B6178] mt-2 max-w-xl mx-auto">
            From bridal blouse patterns and wedding kurtis to contemporary evening gowns, our master
            tailors bring your dream silhouette into reality right here in Ranibagiya, Sainamaina.
          </p>
        </div>

        {/* Elegant 5-Step Visual Process */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-5 mb-16">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-5 border border-[#EDE0ED] shadow-sm hover:shadow-md transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif-luxury text-3xl font-bold text-[#7B1865]/30 group-hover:text-[#7B1865] transition-colors">
                    {step.num}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#FAF0FA] text-[#7B1865] flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#1E152A] mb-0.5">
                  {step.title}
                </h3>
                <p className="text-[11px] text-[#7B1865] font-medium mb-2">
                  {step.nepali}
                </p>
                <p className="text-xs text-[#6B6178] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F5EBF5] flex items-center gap-1 text-[11px] text-[#D4AF37] font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Gulmeli Studio Care</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Custom Design Enquiry Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE2EF] shadow-xl relative">
          <div className="flex items-center justify-between border-b border-[#F0E4F0] pb-5 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7B1865]">
                Bespoke Order Request
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1E152A] font-bold">
                Request Custom Design
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowMeasurementHelper(!showMeasurementHelper)}
              className="inline-flex items-center gap-1.5 text-xs text-[#7B1865] hover:text-[#4A0E4E] font-medium bg-[#FAF0FA] px-3 py-1.5 rounded-full"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Measurement Guide</span>
            </button>
          </div>

          {showMeasurementHelper && (
            <div className="mb-6 p-4 rounded-xl bg-[#F7EEF7] border border-[#E8D4E8] text-xs text-[#4A0E4E] space-y-1 animate-in fade-in duration-200">
              <p className="font-bold">How to measure (inches or cm):</p>
              <p>• <strong>Bust</strong>: Measure around the fullest part of your chest.</p>
              <p>• <strong>Waist</strong>: Measure around the natural waistline (above navel).</p>
              <p>• <strong>Hip</strong>: Measure around the widest part of your hips.</p>
              <p>• <strong>Length</strong>: From shoulder seam down to your desired garment hem.</p>
              <p className="text-[#7B1865] italic pt-1">
                You can also bring fabric or existing well-fitted clothes to our store at Ranibagiya, Sainamaina-1!
              </p>
            </div>
          )}

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#E8F8EE] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif-luxury text-2xl font-bold text-[#1E152A]">
                Design Request Received!
              </h4>
              <p className="text-sm text-[#554D60] max-w-md mx-auto">
                Thank you, <strong>{formData.customerName}</strong>. Our head designer at Gulmeli Collection
                will review your requirements and reach out via phone/WhatsApp ({formData.phone}).
              </p>
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp for Faster Reply</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      customerName: '',
                      phone: '',
                      designType: 'Saree Blouse & Tailoring',
                      preferredDate: '',
                      bust: '',
                      waist: '',
                      hip: '',
                      length: '',
                      shoulder: '',
                      measurementNotes: '',
                      requirements: '',
                      message: '',
                    });
                    setReferenceImage(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-[#E5CEE5] text-xs font-semibold text-[#4A0E4E] hover:bg-[#FAF0FA]"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E4E] mb-1.5">
                    Your Name <span className="text-[#C5221F]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C7D99] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sushmita Sharma"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2D2E4] focus:border-[#7B1865] focus:ring-1 focus:ring-[#7B1865] outline-none text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E4E] mb-1.5">
                    Phone / WhatsApp <span className="text-[#C5221F]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C7D99] absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2D2E4] focus:border-[#7B1865] focus:ring-1 focus:ring-[#7B1865] outline-none text-sm transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Design Type & Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E4E] mb-1.5">
                    Design Type
                  </label>
                  <div className="relative">
                    <select
                      value={formData.designType}
                      onChange={(e) => setFormData({ ...formData, designType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E2D2E4] focus:border-[#7B1865] focus:ring-1 focus:ring-[#7B1865] outline-none text-sm transition-colors bg-white"
                    >
                      {designTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E4E] mb-1.5">
                    Preferred Needed Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#8C7D99] absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2D2E4] focus:border-[#7B1865] focus:ring-1 focus:ring-[#7B1865] outline-none text-sm transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Measurements (Bust, Waist, Hip, Length, Shoulder) */}
              <div className="p-4 rounded-2xl bg-[#FCFBF9] border border-[#EFE2EF] space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7B1865]">
                  <Ruler className="w-4 h-4" />
                  <span>Measurements (Optional or provide in studio)</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-[#6B6178] mb-1">Bust (in)</label>
                    <input
                      type="text"
                      placeholder="e.g. 36"
                      value={formData.bust}
                      onChange={(e) => setFormData({ ...formData, bust: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5CEE5] text-xs outline-none focus:border-[#7B1865]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B6178] mb-1">Waist (in)</label>
                    <input
                      type="text"
                      placeholder="e.g. 30"
                      value={formData.waist}
                      onChange={(e) => setFormData({ ...formData, waist: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5CEE5] text-xs outline-none focus:border-[#7B1865]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B6178] mb-1">Hip (in)</label>
                    <input
                      type="text"
                      placeholder="e.g. 38"
                      value={formData.hip}
                      onChange={(e) => setFormData({ ...formData, hip: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5CEE5] text-xs outline-none focus:border-[#7B1865]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6B6178] mb-1">Length (in)</label>
                    <input
                      type="text"
                      placeholder="e.g. 42"
                      value={formData.length}
                      onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5CEE5] text-xs outline-none focus:border-[#7B1865]"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] text-[#6B6178] mb-1">Shoulder (in)</label>
                    <input
                      type="text"
                      placeholder="e.g. 14.5"
                      value={formData.shoulder}
                      onChange={(e) => setFormData({ ...formData, shoulder: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-[#E5CEE5] text-xs outline-none focus:border-[#7B1865]"
                    />
                  </div>
                </div>
              </div>

              {/* Requirements & Reference Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E4E] mb-1.5">
                    Requirements &amp; Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe neck style, sleeve length, piping, embroidery, or fabric preferences..."
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#E2D2E4] focus:border-[#7B1865] focus:ring-1 focus:ring-[#7B1865] outline-none text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E4E] mb-1.5">
                    Reference Photo / Sketch
                  </label>
                  <div className="border-2 border-dashed border-[#DFC8E2] rounded-xl p-3 text-center bg-[#FAF5FA] hover:bg-[#F5EBF5] transition-colors relative flex flex-col items-center justify-center min-h-[95px]">
                    {referenceImage ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={referenceImage}
                          alt="Reference"
                          className="w-16 h-16 object-cover rounded-lg border border-purple-200"
                        />
                        <div className="text-left text-xs">
                          <p className="font-semibold text-[#7B1865]">Image Attached</p>
                          <button
                            type="button"
                            onClick={() => setReferenceImage(null)}
                            className="text-[#C5221F] underline text-[11px] mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-[#7B1865] mb-1" />
                        <span className="text-xs text-[#554D60]">
                          Click to upload sample image
                        </span>
                        <span className="text-[10px] text-[#8C7D99]">PNG, JPG up to 5MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A0E4E] mb-1.5">
                  Additional Note / Message
                </label>
                <input
                  type="text"
                  placeholder="Any special instructions or request to visit Ranibagiya store..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2D2E4] focus:border-[#7B1865] focus:ring-1 focus:ring-[#7B1865] outline-none text-sm transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:flex-1 bg-[#7B1865] hover:bg-[#601252] text-white py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all shadow-[0_4px_16px_rgba(123,24,101,0.25)] active:scale-[0.98] disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'SUBMIT DESIGN REQUEST'}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppChat}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all shadow active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>CHAT ON WHATSAPP</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
