import { BrowserRouter, Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/user/register" element={<><h1>User Register form</h1></>} />
                    <Route path="/user/login" element={<><h1>User Login form</h1></>} />
                    <Route path="/food-partner/register" element={<><h1>Food Partner Register form</h1></>} />
                    <Route path="/food-partner/login" element={<><h1>Food Partner Login form</h1></>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}