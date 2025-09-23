import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../httpClient";
import type { foodItem, foodPartner } from "../types/food";

export default function FoodPartnerPage() {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [foodPartner, setFoodPartner] = useState<foodPartner>()
    const [foodItems, setFoodItems] = useState<foodItem[]>()
    const { foodPartnerId } = useParams()

    useEffect(() => {
        const getFoodPartner = async () => {
            const responseFoodPartner = await api.get(`/food-partner/${foodPartnerId}`)
            setFoodPartner(responseFoodPartner.data.foodPartner)
        }
        getFoodPartner()

        const getFoodItems = async () => {
            const responseFoodItems = await api.post("/get-food-items-fp", { foodPartnerId })
            setFoodItems(responseFoodItems.data.foodItems)
        }

        getFoodItems()

    }, [foodPartnerId])

    // Play/pause on hover like Instagram
    useEffect(() => {
        videoRefs.current.forEach((video) => {
            if (!video) return;
            video.pause();
        });
    }, []);

    const handleMouseEnter = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            video.play().catch(() => console.log("Autoplay blocked"));
        }
    };

    const handleMouseLeave = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* foodPartner Header */}
            <div className="flex flex-col items-center py-8 bg-pink-100 shadow-md">
                <img
                    src={"https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg"}
                    alt={foodPartner?.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-pink-400"
                />
                <h1 className="mt-4 text-2xl font-bold">{foodPartner?.name}</h1>
                <p className="text-gray-600">{foodPartner?.address}</p>
                <p className="text-gray-700 font-medium">{foodPartner?.contactNo}</p>
            </div>

            {/* Reels Grid */}
            <div className="px-4 py-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {foodItems?.map((reel, index) => (
                    <div
                        key={reel._id}
                        className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <video
                            ref={(el) => { (videoRefs.current[index] = el) }}
                            src={reel.video}
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay Play Icon */}
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <span className="text-white text-lg font-semibold">▶ Play</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
