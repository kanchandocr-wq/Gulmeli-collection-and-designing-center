import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Search, X, ArrowRight, Tag, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (category: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase().trim();

    return products.filter((p) => {
      const matchName = p.name.toLowerCase().includes(term);
      const matchNepali = p.nepaliName?.toLowerCase().includes(term);
      const matchCategory = p.category.toLowerCase().includes(term);
      const matchDesc = p.description.toLowerCase().includes(term);
      const matchColors = p.colors.some((c) => c.name.toLowerCase().includes(term));
      const matchSizes = p.sizes.some((s) => s.toLowerCase().includes(term));
      const matchFabric = p.fabricDetails?.toLowerCase().includes(term);

      return matchName || matchNepali || matchCategory || matchDesc || matchColors || matchSizes || matchFabric;
    });
  }, [searchTerm, products]);

  if (!isOpen) return null;

  const popularTags = ['Saree', 'Kurti', 'Magenta', 'Velvet', 'Silk', 'Dhaka', 'Dress', 'Party Wear'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-[#EFE2EF] shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#F0E4F0] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#7B1865] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search by product, category, color, size, fabric..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-base sm:text-lg text-[#1E152A] placeholder-[#9D8FA8] outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-[#8C7D99] hover:text-[#4A0E4E] rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#7B1865] hover:text-[#4A0E4E] px-2.5 py-1 rounded-lg hover:bg-[#FAF0FA]"
          >
            ESC
          </button>
        </div>

        {/* Popular searches suggestions */}
        {!searchTerm.trim() && (
          <div className="p-5 sm:p-6 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#756A85] mb-2.5">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="px-3 py-1.5 rounded-full bg-[#FAF5FA] hover:bg-[#F2DFB3]/40 text-xs font-medium text-[#4A0E4E] border border-[#EFE2EF] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#F5EDF5]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#756A85] mb-2.5">
                Featured Categories
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['SAREE', 'KURTI', 'SALWAR SUIT', 'PARTY WEAR'].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      onSelectCategory(c);
                      onClose();
                    }}
                    className="text-left p-2.5 rounded-xl bg-[#FAF9FB] hover:bg-[#FAF0FA] text-[#4A0E4E] font-medium flex items-center justify-between border border-[#EFE5EE]"
                  >
                    <span>{c}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#7B1865]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Container */}
        {searchTerm.trim() && (
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 divide-y divide-[#F5EDF5]">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="py-3 flex items-center gap-3.5 hover:bg-[#FAF5FA] p-2 rounded-xl cursor-pointer transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-16 object-cover rounded-lg flex-shrink-0 bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-[#7B1865]">
                        {product.category}
                      </span>
                      {product.badge && (
                        <span className="text-[9px] font-bold bg-[#4A0E4E] text-white px-1.5 py-0.5 rounded">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[#1E152A] truncate">
                      {product.name}
                    </p>
                    <p className="text-xs font-bold text-[#4A0E4E]">
                      रु. {product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C7D99]" />
                </div>
              ))
            ) : (
              /* Exact requested empty state */
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FAF0FA] text-[#7B1865] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="font-serif-luxury text-xl font-bold text-[#1E152A]">
                  No collection found
                </h4>
                <p className="text-xs sm:text-sm text-[#6B6178] max-w-sm mx-auto">
                  Try another search or explore our latest collection.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      onClose();
                      onSelectCategory('ALL');
                    }}
                    className="px-4 py-2 bg-[#7B1865] text-white rounded-xl text-xs font-semibold hover:bg-[#601252] transition-colors"
                  >
                    Explore Latest Collection
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
