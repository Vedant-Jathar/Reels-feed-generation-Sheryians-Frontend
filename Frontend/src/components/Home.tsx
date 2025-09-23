import { useState, useRef, useEffect } from "react";
import { api } from "../httpClient";
import type { foodItem } from "../types/food";
import { Link } from "react-router-dom";

export default function FoodItemsPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [foodItems, setFoodItems] = useState<[foodItem]>()
    const isScrolling = useRef(false);

    useEffect(() => {
        const fetchAllFoodItems = async () => {
            const response = await api.get("/food/get-food-items")
            setFoodItems(response.data.foodItems)
        }

        fetchAllFoodItems()
    }, [])

    const goToReel = (newIndex: number) => {
        if (newIndex >= 0 && newIndex < foodItems!.length) {
            setCurrentIndex(newIndex);
        }
    };

    const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        if (isScrolling.current) return; // prevent rapid triggers
        isScrolling.current = true;

        if (e.deltaY > 0 && foodItems && currentIndex < foodItems.length - 1) {
            goToReel(currentIndex + 1);
        } else if (e.deltaY < 0 && currentIndex > 0) {
            goToReel(currentIndex - 1);
        }

        // unlock after transition
        setTimeout(() => {
            isScrolling.current = false;
        }, 600); // matches transition duration
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "ArrowDown") goToReel(currentIndex + 1);
        if (e.key === "ArrowUp") goToReel(currentIndex - 1);
    };

    // touch swipe support (mobile)
    const touchStartY = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const deltaY = touchStartY.current - e.changedTouches[0].clientY;
        if (Math.abs(deltaY) > 50) {
            if (deltaY > 0) goToReel(currentIndex + 1); // swipe up → next
            else goToReel(currentIndex - 1); // swipe down → prev
        }
    };

    return (
        <div
            className="relative h-screen w-screen overflow-hidden bg-black"
            tabIndex={0} // make div focusable for key events
            onWheel={handleScroll}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {foodItems?.map((reel, index) => (
                <video
                    key={reel._id}
                    src={reel.video}
                    className={`absolute top-0 left-0 h-full w-full object-cover transition-transform duration-500 ${index === currentIndex
                        ? "translate-y-0"
                        : index < currentIndex
                            ? "-translate-y-full"
                            : "translate-y-full"
                        }`}
                    autoPlay={index === currentIndex}
                    muted
                    loop
                />
            ))}

            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-center text-white px-4">
                <h2 className="text-2xl font-bold drop-shadow-md">
                    {foodItems ? foodItems[currentIndex].name : ""}
                </h2>
                <p className="mt-2 text-sm opacity-90 max-w-md">
                    {foodItems ? foodItems[currentIndex].description : ""}
                </p>
            </div>
            
            {/* Visit Store Button */}
            <Link
                to={`/food-partner/${foodItems ? foodItems[currentIndex].foodPartner : ""}`}
                rel="noopener noreferrer"
                className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-red-400 to-pink-400 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition"
            >
                Visit Store
            </Link>
        </div>
    );
}