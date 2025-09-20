import { Link } from "react-router-dom"

const UserLogin = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200 p-6">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6">
                {/* Tabs */}
                <div className="flex justify-center space-x-4">
                    <button className="px-4 py-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl bg-gray-100 text-gray-200 font-semibold hover:bg-gray-200">
                        Login
                    </button>
                </div>

                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome to FeedView 🍕
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Please enter your details</p>
                </div>

                {/* Login / Signup Form */}
                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        className="w-full py-3 bg-gradient-to-r from-red-400 to-pink-400 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition"
                    >
                        Continue
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500">
                    Don't have an account?
                    <Link to={"/user/register"} className="text-pink-400">Signup</Link>
                </div>
            </div>
        </div>
    )
}

export default UserLogin