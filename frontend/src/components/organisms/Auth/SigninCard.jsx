import { LucideLoader2, TriangleAlert } from 'lucide-react';
import { FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const SigninCard = ({
   signinForm,
   setSigninForm,
   onSigninFormSubmit,
   validationError,
   error,
   isSuccess,
   isPending
}) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center p-4">
            {/* Background animation blobs - centered and contained */}
            <div className="fixed inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
                <div className="relative w-full h-full max-w-md">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 blur-3xl animate-blob" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-3xl animate-blob animation-delay-2000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl animate-blob animation-delay-4000" />
                </div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header section */}
                <div className="text-center mb-8">
                    <div className="inline-block p-2 mb-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-500 to-fuchsia-500" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">Sign In</h1>
                    <p className="text-gray-400">Welcome back</p>
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
                                        Successfully signed in! Redirecting...
                                        <LucideLoader2 className="animate-spin ml-2 inline" />
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form className="space-y-4" onSubmit={onSigninFormSubmit}>
                            <div className="space-y-4">
                                <div className="relative">
                                    <input
                                        placeholder="Email"
                                        required
                                        onChange={(e) => setSigninForm({ ...signinForm, email: e.target.value })}
                                        value={signinForm.email}
                                        type="email"
                                        disabled={isPending}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder:text-gray-500
                                            focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                                    />
                                </div>

                                <div className="relative">
                                    <input
                                        placeholder="Password"
                                        required
                                        onChange={(e) => setSigninForm({ ...signinForm, password: e.target.value })}
                                        value={signinForm.password}
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
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-400">
                                Don&apos;t have an account?{" "}
                                <button
                                    onClick={() => navigate("/auth/signup")}
                                    className="text-violet-400 hover:text-violet-300 font-medium transition-colors duration-200"
                                    type="button"
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};