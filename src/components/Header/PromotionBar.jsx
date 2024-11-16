import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PromotionBar = ({ isVisible, setIsVisible }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [promotion, setPromotion] = useState({});
  const navigate = useNavigate();

  const fetchPromotion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/promo/promocodes"
      );
      setPromotion(response.data[0]);
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsFixed(scrollPosition > 64);
    };
    fetchPromotion();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Placeholder to prevent content jump */}
      {isFixed && <div className="h-[54px]" />}

      <div
        className={`w-full min-h-[54px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-3 text-center shadow-lg ${
          isFixed ? "fixed top-0 left-0 z-50 animate-slide-down" : "relative"
        }`}
      >
        <div className="flex items-center justify-center gap-4">
          <span
            className="text-base font-semibold line-clamp-1 flex items-center"
            title={`${promotion?.discountValue}${
              promotion?.discountType === "fixed" ? "$" : "%"
            } off for your first invoice with code: ${promotion?.code}`}
          >
            🎉{" "}
            {promotion?.discountValue}
            {promotion?.discountType === "fixed" ? "$" : "%"} off for your first
            invoice with code: <span className="font-bold">{promotion?.code}</span>
          </span>

          <span className="text-base font-medium">|</span>

          <span
            className="text-base font-semibold line-clamp-1 flex items-center"
            title={`Valid till ${new Date(
              promotion.expiryDate
            ).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}`}
          >
            🕒 Valid till{" "}
            <span className="font-bold">
              {new Date(promotion.expiryDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </span>

          <button
            onClick={() => navigate("/pricing")}
            className="ml-4 px-6 py-2 text-sm font-medium text-gray-800 bg-white rounded-full shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105"
          >
            🚀 Subscribe Now
          </button>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close promotion"
        >
          <X size={18} />
        </button>
      </div>

      <style jsx global>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default PromotionBar;
