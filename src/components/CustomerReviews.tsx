import React, { useState } from 'react';
import { CustomerReview } from '../types';
import { Star, Heart, MessageSquarePlus, CheckCircle2 } from 'lucide-react';

interface CustomerReviewsProps {
  reviews: CustomerReview[];
  onAddReview: (review: CustomerReview) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews, onAddReview }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [productName, setProductName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !comment) return;

    const newRev: CustomerReview = {
      id: 'rev-' + Date.now(),
      customerName,
      location: location || 'Rupandehi, Nepal',
      rating,
      comment,
      productName: productName || undefined,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      verifiedPurchase: true,
    };

    onAddReview(newRev);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewForm(false);
      setCustomerName('');
      setLocation('');
      setComment('');
      setProductName('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF5FA] border-y border-[#EDE0ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E5CEE5] text-[#7B1865] text-xs font-semibold uppercase tracking-wider mb-2">
              <Heart className="w-3.5 h-3.5 text-[#7B1865]" />
              <span>COMMUNITY EXPERIENCES</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1E152A] font-bold">
              Customer Love
            </h2>
            <p className="text-sm sm:text-base text-[#6B6178] mt-1">
              Genuine feedback from customers visiting our Ranibagiya store or ordering across Nepal.
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="inline-flex items-center gap-2 bg-[#7B1865] hover:bg-[#601252] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all self-start sm:self-auto shadow-sm"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Optional Review Form */}
        {showReviewForm && (
          <div className="mb-10 max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#E8D9E8] shadow-lg animate-in fade-in duration-300">
            {submitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#2E7D32] mx-auto" />
                <h4 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
                  Thank You for Your Review!
                </h4>
                <p className="text-xs text-[#6B6178]">
                  Your genuine feedback helps our boutique and other customers in Sainamaina.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between items-center border-b border-[#F0E4F0] pb-3">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
                    Share Your Boutique Experience
                  </h3>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="text-lg"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating
                              ? 'text-[#D4AF37] fill-[#D4AF37]'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A4356] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bandana Karki"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs outline-none focus:border-[#7B1865]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A4356] mb-1">
                      Your City / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sainamaina-1, Butwal"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs outline-none focus:border-[#7B1865]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A4356] mb-1">
                    Product or Tailoring Service (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Custom Blouse Tailoring, Magenta Saree"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E2D2E4] text-xs outline-none focus:border-[#7B1865]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A4356] mb-1">
                    Review Text *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the fabric quality, stitching fit, or boutique service..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E2D2E4] text-xs outline-none focus:border-[#7B1865]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#6B6178] hover:text-[#1E152A]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#7B1865] hover:bg-[#601252] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 border border-[#EFE2EF] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'text-[#D4AF37] fill-[#D4AF37]'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#8C7D99]">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#4A4356] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5EBF5] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1E152A]">
                    {rev.customerName}
                  </h4>
                  <p className="text-[11px] text-[#756A85]">{rev.location}</p>
                </div>

                {rev.productName && (
                  <span className="text-[10px] bg-[#FAF0FA] text-[#7B1865] px-2.5 py-1 rounded-full font-medium border border-[#EDE0ED]">
                    {rev.productName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
