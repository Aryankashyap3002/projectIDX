import { LucideLoader2, TriangleAlert } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const SignupCard = ({ 
    signupForm, 
    setSignupForm, 
    validationError, 
    onSignupFormSubmit,
    error,
    isPending,
    isSuccess
}) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
            {/* Background animation blobs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-[10px] opacity-50">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 blur-3xl animate-blob" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl animate-blob animation-delay-2000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl animate-blob animation-delay-4000" />
                </div>
            </div>

            <div className="w-full max-w-md relative">
                {/* Header section */}
                <div className="text-center mb-8">
                    <div className="inline-block p-2 mb-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-500" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-400">Join our community today</p>
                </div>

                {/* Main card */}
                <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/10 shadow-2xl">
                    <div className="p-8">
                        {/* Validation error */}
                        {validationError && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-6 animate-fade-in">
                                <div className="flex items-center gap-x-2">
                                    <TriangleAlert className="size-5 text-red-200" />
                                    <p className="text-red-200">{validationError.message}</p>
                                </div>
                            </div>
                        )}

                        {/* Error message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-6 animate-fade-in">
                                <div className="flex items-center gap-x-2">
                                    <TriangleAlert className="size-5 text-red-200" />
                                    <p className="text-red-200">{error.message}</p>
                                </div>
                            </div>
                        )}

                        {/* Success message */}
                        {isSuccess && (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl mb-6 animate-fade-in">
                                <div className="flex items-center gap-x-2">
                                    <FaCheck className="size-5 text-emerald-200" />
                                    <p className="text-emerald-200">
                                        Successfully signed up! Redirecting...
                                        <LucideLoader2 className="animate-spin ml-2 inline" />
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form className="space-y-4" onSubmit={onSignupFormSubmit}>
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        placeholder="Email"
                                        required
                                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                                        value={signupForm.email}
                                        type="email"
                                        disabled={isPending}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-500
                                            focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        placeholder="Username"
                                        required
                                        onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                                        value={signupForm.username}
                                        type="text"
                                        disabled={isPending}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-500
                                            focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        placeholder="Password"
                                        required
                                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                                        value={signupForm.password}
                                        type="password"
                                        disabled={isPending}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-500
                                            focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        placeholder="Confirm Password"
                                        required
                                        onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                                        value={signupForm.confirmPassword}
                                        type="password"
                                        disabled={isPending}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-500
                                            focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={isPending}
                                type="submit"
                                className={`w-full h-12 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-medium
                                    hover:from-violet-600 hover:to-fuchsia-600 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#0F172A]
                                    transition-all duration-200 ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {isPending ? (
                                    <span className="flex items-center justify-center">
                                        <LucideLoader2 className="animate-spin mr-2" />
                                        Creating account...
                                    </span>
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400">
                                Already have an account?{" "}
                                <button
                                    onClick={() => navigate("/auth/signin")}
                                    className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-200"
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};