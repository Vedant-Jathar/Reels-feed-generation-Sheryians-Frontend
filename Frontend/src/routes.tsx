import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserRegister } from "./components/UserRegister";
import UserLogin from "./components/UserLogin";
import FoodPartnerRegister from "./components/FoodPartnerRegister";
import FoodPartnerLogin from "./components/FoodPartnerLogin";

export const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/user/register" element={<UserRegister />} />
                    <Route path="/user/login" element={<UserLogin />} />
                    <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                    <Route path="/food-partner/login" element={<FoodPartnerLogin/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}