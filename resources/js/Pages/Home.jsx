import { useState, useEffect } from "react";
export default function Home({ stats }) {
    const texts = [
        "Find Your Future Internship",
        "Connect Students & Companies",
        "Build Your Career With Us",
    ];

    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {

        const currentText = texts[textIndex];

        const timeout = setTimeout(() => {

            if (!isDeleting) {

                setDisplayText(currentText.substring(0, displayText.length + 1));

                if (displayText === currentText) {
                    setTimeout(() => setIsDeleting(true), 1000);
                }

            } else {

                setDisplayText(currentText.substring(0, displayText.length - 1));

                if (displayText === "") {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % texts.length);
                }
            }

        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);

    }, [displayText, isDeleting, textIndex]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">

            {/* HEADER */}
            <header className="w-full bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-extrabold text-blue-600">
                            Stage Connect
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">

                        <a
                            href="/login"
                            className="px-5 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 transition font-medium"
                        >
                            Login
                        </a>

                        <a
                            href="/register"
                            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-lg shadow-blue-200"
                        >
                            Register
                        </a>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex items-center justify-center px-6 py-20">

                <div className="max-w-6xl w-full">

                    {/* HERO */}
                    <div className="text-center mb-20">

                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                             Modern Internship Platform
                        </span>

                        <h2 className="text-6xl font-black text-gray-900 leading-tight mb-6">
                            {displayText}
                        </h2>

                        <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                            Stage Connect helps students discover internship opportunities
                            and allows companies to find talented candidates through
                            a modern, fast, and intuitive platform.
                        </p>
                    </div>

                    {/* STATS */}
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* STAGIAIRES */}
                        <div className="bg-white rounded-[30px] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">

                            <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center text-4xl mb-8">
                                🎓
                            </div>

                            <h3 className="text-3xl font-bold text-gray-900 mb-3">
                                Stagiaires
                            </h3>

                            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                Students actively searching and applying for internships.
                            </p>

                            <div className="text-6xl font-black text-blue-600">
                                {stats.stagiaires}
                            </div>
                        </div>

                        {/* ENTREPRISES */}
                        <div className="bg-white rounded-[30px] p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">

                            <div className="w-20 h-20 rounded-3xl bg-indigo-100 flex items-center justify-center text-4xl mb-8">
                                🏢
                            </div>

                            <h3 className="text-3xl font-bold text-gray-900 mb-3">
                                Entreprises
                            </h3>

                            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                Companies offering internship opportunities for students.
                            </p>

                            <div className="text-6xl font-black text-indigo-600">
                                {stats.entreprises}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="bg-white border-t border-gray-100 py-5 shadow-sm">
                <div className="text-center text-gray-500 text-sm">
                    © 2026 StageConnect — Connecting students and companies
                </div>
            </footer>
        </div>
    );
}