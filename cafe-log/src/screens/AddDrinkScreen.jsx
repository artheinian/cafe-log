import { useState, useEffect } from "react";
import ScreenHeader from "../components/ScreenHeader";
import AddDrinkForm from "../components/AddDrinkForm";

const emptyForm = {
    name: "",
    cafe: "",
    cafeAddress: "",
    category: "Coffee",
    rating: 0,
    notes: "",
    isPublic: false,
};

export default function AddDrinkScreen({
    prefillCafe,
    editDrink,
    onBack,
    onAddDrink,
}) {
    const [form, setForm] = useState(emptyForm);

    // Debug: See what editDrink actually contains
    useEffect(() => {
        console.log("📌 AddDrinkScreen received editDrink:", editDrink);
        console.log("Type of editDrink:", typeof editDrink);

        if (editDrink && Object.keys(editDrink).length > 0) {
            const newForm = {
                name: editDrink.name ?? "",
                cafe: editDrink.cafe ?? "",
                cafeAddress: editDrink.cafeAddress ?? "",
                category: editDrink.category ?? "Coffee",
                rating: editDrink.rating ?? 0,
                notes: editDrink.notes ?? "",
                isPublic: editDrink.isPublic ?? false,
            };
            console.log("Setting form to:", newForm);
            setForm(newForm);
        } else if (prefillCafe) {
            setForm({ ...emptyForm, cafe: prefillCafe });
        } else {
            setForm({ ...emptyForm });
        }
    }, [editDrink, prefillCafe]);

    const handleSubmit = async () => {
        try {
            await onAddDrink?.({
                ...form,
                rating: Number(form.rating) || 0,
                isPublic: !!form.isPublic,
            });
            onBack();
        } catch (error) {
            console.error(error);
            alert(error.message || "Failed to save drink");
        }
    };

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
            <ScreenHeader
                title={editDrink ? "Edit Drink" : "Add a Drink"}
                onBack={onBack}
            />
            <AddDrinkForm
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit}
                isEdit={!!editDrink}
                prefillCafe={prefillCafe}
            />
        </div>
    );
}