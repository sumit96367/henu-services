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
        <div>
            {/* Page Header */}
            <div style={{ marginBottom: "48px" }}>
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        marginBottom: "8px",
                        background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Add Software
                </h1>
                <p style={{ fontSize: "1.125rem", color: "#888" }}>
                    Manage and add new software entries for the portfolio
                </p>
            </div>

            {/* Success Notification */}
            {showSuccess && (
                <div
                    style={{
                        marginBottom: "24px",
                        padding: "16px 24px",
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        border: "1px solid rgba(34, 197, 94, 0.3)",
                        borderRadius: "12px",
                        color: "#22c55e",
                        fontSize: "0.95rem",
                        fontWeight: "500",
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
                        padding: "16px 24px",
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "12px",
                        color: "#ef4444",
                        fontSize: "0.95rem",
                        fontWeight: "500",
                    }}
                >
                    ✕ {showError}
                </div>
            )}

            {/* Form Container */}
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "20px",
                    padding: "40px",
                    maxWidth: "800px",
                    backdropFilter: "blur(10px)",
                }}
            >
                <form onSubmit={handleSubmit}>
                    {/* Software Name */}
                    <div style={{ marginBottom: "24px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "12px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                color: "#fff",
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
                                padding: "14px 18px",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "all 0.2s ease",
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.5)";
                                e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.05)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor =
                                    "rgba(255, 255, 255, 0.1)";
                                e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.03)";
                            }}
                        />
                    </div>

                    {/* Software Description */}
                    <div style={{ marginBottom: "24px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "12px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                color: "#fff",
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
                                padding: "14px 18px",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "1rem",
                                outline: "none",
                                resize: "vertical",
                                fontFamily: "inherit",
                                lineHeight: "1.6",
                                transition: "all 0.2s ease",
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.5)";
                                e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.05)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor =
                                    "rgba(255, 255, 255, 0.1)";
                                e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.03)";
                            }}
                        />
                    </div>

                    {/* Category */}
                    <div style={{ marginBottom: "24px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "12px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                color: "#fff",
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
                                padding: "14px 18px",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "all 0.2s ease",
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.5)";
                                e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.05)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor =
                                    "rgba(255, 255, 255, 0.1)";
                                e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.03)";
                            }}
                        />
                    </div>

                    {/* Tags */}
                    <div style={{ marginBottom: "24px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "12px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                color: "#fff",
                            }}
                        >
                            Tags <span style={{ color: "#888", fontWeight: "400", fontSize: "0.875rem" }}>(comma-separated, max 3)</span>
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
                                padding: "14px 18px",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "all 0.2s ease",
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.5)";
                                e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.05)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor =
                                    "rgba(255, 255, 255, 0.1)";
                                e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.03)";
                            }}
                        />
                    </div>

                    {/* Google Form Link */}
                    <div style={{ marginBottom: "40px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "12px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                color: "#fff",
                            }}
                        >
                            Google Form Link <span style={{ color: "#888", fontWeight: "400", fontSize: "0.875rem" }}>(optional - add later)</span>
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
                                padding: "14px 18px",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "all 0.2s ease",
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.5)";
                                e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.05)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor =
                                    "rgba(255, 255, 255, 0.1)";
                                e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.03)";
                            }}
                        />
                    </div>

                    {/* Payment Link */}
                    <div style={{ marginBottom: "40px" }}>
                        <label
                            style={{
                                display: "block",
                                marginBottom: "12px",
                                fontSize: "1rem",
                                fontWeight: "600",
                                color: "#fff",
                            }}
                        >
                            Payment Link <span style={{ color: "#888", fontWeight: "400", fontSize: "0.875rem" }}>(optional - add later)</span>
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
                                padding: "14px 18px",
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "all 0.2s ease",
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = "rgba(6, 182, 212, 0.5)";
                                e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.05)";
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor =
                                    "rgba(255, 255, 255, 0.1)";
                                e.currentTarget.style.backgroundColor =
                                    "rgba(255, 255, 255, 0.03)";
                            }}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
                        {/* Cancel Button */}
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            style={{
                                padding: "14px 32px",
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "12px",
                                color: "#888",
                                fontSize: "1rem",
                                fontWeight: "600",
                                cursor: isSubmitting ? "not-allowed" : "pointer",
                                opacity: isSubmitting ? 0.5 : 1,
                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                if (!isSubmitting) {
                                    e.currentTarget.style.backgroundColor =
                                        "rgba(255, 255, 255, 0.08)";
                                    e.currentTarget.style.color = "#fff";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isSubmitting) {
                                    e.currentTarget.style.backgroundColor =
                                        "rgba(255, 255, 255, 0.05)";
                                    e.currentTarget.style.color = "#888";
                                }
                            }}
                        >
                            Cancel
                        </button>

                        {/* Add Software Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                                padding: "14px 32px",
                                background: isSubmitting
                                    ? "rgba(6, 182, 212, 0.5)"
                                    : "linear-gradient(135deg, #06b6d4, #3b82f6)",
                                border: "none",
                                borderRadius: "12px",
                                color: "#fff",
                                fontSize: "1rem",
                                fontWeight: "600",
                                cursor: isSubmitting ? "not-allowed" : "pointer",
                                transition: "all 0.2s ease",
                                boxShadow: isSubmitting
                                    ? "none"
                                    : "0 8px 24px rgba(6, 182, 212, 0.2)",
                            }}
                            onMouseEnter={(e) => {
                                if (!isSubmitting) {
                                    e.currentTarget.style.transform = "translateY(-2px)";
                                    e.currentTarget.style.boxShadow =
                                        "0 12px 32px rgba(6, 182, 212, 0.3)";
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isSubmitting) {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                        "0 8px 24px rgba(6, 182, 212, 0.2)";
                                }
                            }}
                        >
                            {isSubmitting ? "Adding..." : "Add Software"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
