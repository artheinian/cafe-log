import { useState } from "react";
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
    const [form, setForm] = useState(() => {
        if (editDrink) {
            return {
                name: editDrink.name ?? "",
                cafe: editDrink.cafe ?? "",
                cafeAddress: editDrink.cafeAddress ?? "",
                category: editDrink.category ?? "Coffee",
                rating: editDrink.rating ?? 0,
                notes: editDrink.notes ?? "",
                isPublic: editDrink.isPublic ?? false,
            };
        }

        if (prefillCafe) {
            return { ...emptyForm, cafe: prefillCafe };
        }

        return { ...emptyForm };
    });

    const handleSubmit = () => {
        const newDrink = {
            id: Date.now(),
            ...form,
            date: new Date().toISOString(),
        };

        onAddDrink?.(newDrink);
        onBack();
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