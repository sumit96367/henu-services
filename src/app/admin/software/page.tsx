"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddSoftwarePage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        tags: "",
        formLink: "",
        paymentLink: "",
        image: "/projects/custom.jpg",
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowError("");

        // Validate
        if (!formData.name.trim() || !formData.description.trim() || !formData.category) {
            setShowError("Please fill in all required fields (name, description, category)");
            return;
        }

        // Parse tags
        const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(t => t);
        if (tagsArray.length < 1) {
            setShowError("Please provide at least one tag (comma-separated)");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/admin/software", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    category: formData.category,
                    tags: tagsArray.slice(0, 3), // Max 3 tags
                    formLink: formData.formLink,
                    paymentLink: formData.paymentLink,
                    image: formData.image,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setShowError(data.error || "Failed to add software");
                setIsSubmitting(false);
                return;
            }

            // Show success message
            setShowSuccess(true);

            // Reset form
            setFormData({
                name: "",
                description: "",
                category: "",
                tags: "",
                formLink: "",
                paymentLink: "",
                image: "/projects/custom.jpg",
            });

            // Hide success after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error("Error adding software:", error);
            setShowError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push("/admin/dashboard");
    };

    return (
        <div className="add-software-container">
            {/* Page Header */}
            <div className="page-header" style={{ marginBottom: "48px" }}>
                <h1
                    style={{
                        fontWeight: "900",
                        marginBottom: "12px",
                        background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        letterSpacing: "-0.03em"
                    }}
                    className="page-title"
                >
                    Add Software
                </h1>
                <p className="page-subtitle" style={{ color: "#888", fontWeight: "500" }}>
                    Manage and add new software entries for the portfolio
                </p>
            </div>

            {/* Success Notification */}
            {showSuccess && (
                <div
                    style={{
                        marginBottom: "24px",
                        padding: "20px 24px",
                        backgroundColor: "rgba(34, 197, 94, 0.08)",
                        border: "1px solid rgba(34, 197, 94, 0.2)",
                        borderRadius: "16px",
                        color: "#22c55e",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        backdropFilter: "blur(10px)"
                    }}
                >
                    ✓ Software added successfully! It will appear in the portfolio.
                </div>
            )}

            {/* Error Notification */}
            {showError && (
                <div
                    style={{
                        marginBottom: "24px",
                        padding: "20px 24px",
                        backgroundColor: "rgba(239, 68, 68, 0.08)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        borderRadius: "16px",
                        color: "#ef4444",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        backdropFilter: "blur(10px)"
                    }}
                >
                    ✕ {showError}
                </div>
            )}

            {/* Form Container */}
            <div
                className="form-card"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "32px",
                    padding: "48px",
                    maxWidth: "850px",
                    backdropFilter: "blur(20px)",
                }}
            >
                <form onSubmit={handleSubmit}>
                    {/* Software Name */}
                    <div className="input-field" style={{ marginBottom: "32px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "14px",
                                fontSize: "0.75rem",
                                fontWeight: "800",
                                color: "#555",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em"
                            }}
                        >
                            Software Name <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Enter software name"
                            required
                            style={{
                                width: "100%",
                                padding: "16px 20px",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "16px",
                                color: "#fff",
                                fontSize: "1.05rem",
                                outline: "none",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                            className="focus:border-cyan-500/50 focus:bg-white/5"
                        />
                    </div>

                    {/* Software Description */}
                    <div className="input-field" style={{ marginBottom: "32px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "14px",
                                fontSize: "0.75rem",
                                fontWeight: "800",
                                color: "#555",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em"
                            }}
                        >
                            Software Description <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            placeholder="Describe the software"
                            required
                            rows={5}
                            style={{
                                width: "100%",
                                padding: "16px 20px",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "16px",
                                color: "#fff",
                                fontSize: "1.05rem",
                                outline: "none",
                                resize: "vertical",
                                fontFamily: "inherit",
                                lineHeight: "1.7",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                            className="focus:border-cyan-500/50 focus:bg-white/5"
                        />
                    </div>

                    {/* Category */}
                    <div className="input-field" style={{ marginBottom: "32px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "14px",
                                fontSize: "0.75rem",
                                fontWeight: "800",
                                color: "#555",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em"
                            }}
                        >
                            Category <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                            placeholder="e.g., Healthcare, E-commerce, Finance"
                            required
                            style={{
                                width: "100%",
                                padding: "16px 20px",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "16px",
                                color: "#fff",
                                fontSize: "1.05rem",
                                outline: "none",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                            className="focus:border-cyan-500/50 focus:bg-white/5"
                        />
                    </div>

                    {/* Tags */}
                    <div className="input-field" style={{ marginBottom: "32px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "14px",
                                fontSize: "0.75rem",
                                fontWeight: "800",
                                color: "#555",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em"
                            }}
                        >
                            Tags <span style={{ color: "#888", fontWeight: "400", fontSize: "0.75rem", textTransform: "none", letterSpacing: "0" }}>(comma-separated, max 3)</span>
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) =>
                                setFormData({ ...formData, tags: e.target.value })
                            }
                            placeholder="e.g., Healthcare, Management, Digital"
                            style={{
                                width: "100%",
                                padding: "16px 20px",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "16px",
                                color: "#fff",
                                fontSize: "1.05rem",
                                outline: "none",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                            className="focus:border-cyan-500/50 focus:bg-white/5"
                        />
                    </div>

                    {/* Google Form Link */}
                    <div className="input-field" style={{ marginBottom: "32px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "14px",
                                fontSize: "0.75rem",
                                fontWeight: "800",
                                color: "#555",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em"
                            }}
                        >
                            Google Form Link <span style={{ color: "#888", fontWeight: "400", fontSize: "0.75rem", textTransform: "none", letterSpacing: "0" }}>(optional)</span>
                        </label>
                        <input
                            type="url"
                            value={formData.formLink}
                            onChange={(e) =>
                                setFormData({ ...formData, formLink: e.target.value })
                            }
                            placeholder="https://forms.google.com/your-form-link"
                            style={{
                                width: "100%",
                                padding: "16px 20px",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "16px",
                                color: "#fff",
                                fontSize: "1.05rem",
                                outline: "none",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                            className="focus:border-cyan-500/50 focus:bg-white/5"
                        />
                    </div>

                    {/* Payment Link */}
                    <div className="input-field" style={{ marginBottom: "48px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "14px",
                                fontSize: "0.75rem",
                                fontWeight: "800",
                                color: "#555",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em"
                            }}
                        >
                            Payment Link <span style={{ color: "#888", fontWeight: "400", fontSize: "0.75rem", textTransform: "none", letterSpacing: "0" }}>(optional)</span>
                        </label>
                        <input
                            type="url"
                            value={formData.paymentLink}
                            onChange={(e) =>
                                setFormData({ ...formData, paymentLink: e.target.value })
                            }
                            placeholder="https://payment-gateway.com/your-payment-link"
                            style={{
                                width: "100%",
                                padding: "16px 20px",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "16px",
                                color: "#fff",
                                fontSize: "1.05rem",
                                outline: "none",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                            className="focus:border-cyan-500/50 focus:bg-white/5"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="button-group" style={{ display: "flex", gap: "20px", justifyContent: "flex-end" }}>
                        {/* Cancel Button */}
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            style={{
                                padding: "16px 32px",
                                backgroundColor: "rgba(255, 255, 255, 0.04)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "16px",
                                color: "#888",
                                fontSize: "1rem",
                                fontWeight: "800",
                                cursor: isSubmitting ? "not-allowed" : "pointer",
                                opacity: isSubmitting ? 0.5 : 1,
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em"
                            }}
                            className="hover:bg-white/10 hover:text-white"
                        >
                            Cancel
                        </button>

                        {/* Add Software Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                padding: "16px 40px",
                                background: isSubmitting
                                    ? "rgba(6, 182, 212, 0.5)"
                                    : "linear-gradient(135deg, #06b6d4, #3b82f6)",
                                border: "none",
                                borderRadius: "16px",
                                color: "#fff",
                                fontSize: "1rem",
                                fontWeight: "900",
                                cursor: isSubmitting ? "not-allowed" : "pointer",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                boxShadow: isSubmitting
                                    ? "none"
                                    : "0 10px 30px rgba(6, 182, 212, 0.3)",
                            }}
                            className="hover:scale-[1.02] active:scale-95 hover:shadow-[0_15px_40px_rgba(6,182,212,0.4)]"
                        >
                            {isSubmitting ? "Deploying..." : "Add Platform"}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
                .add-software-container {
                    padding: 0;
                }
                .page-title {
                    font-size: 3.5rem;
                }
                .page-subtitle {
                    font-size: 1.25rem;
                }

                @media (max-width: 1024px) {
                    .page-title { font-size: 2.75rem; }
                    .form-card { padding: 40px !important; }
                }

                @media (max-width: 768px) {
                    .page-title { font-size: 2.25rem; }
                    .form-card { padding: 32px !important; borderRadius: 24px !important; }
                    .button-group { flex-direction: column-reverse; }
                    .button-group button { width: 100%; }
                }

                @media (max-width: 480px) {
                    .page-title { font-size: 2rem; }
                    .page-subtitle { font-size: 1rem; }
                    .form-card { padding: 24px !important; }
                }
            `}</style>
        </div>
    );
}
