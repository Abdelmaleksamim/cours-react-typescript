import { useState, useEffect } from "react";
import type { AlertItem } from "../types";

function uid() {
    if (crypto?.randomUUID) return crypto.randomUUID();
    return Date.now().toString();
}

export function useAlerts() {
    const [alerts, setAlerts] = useState<AlertItem[]>(() => {
        try {
        const raw = localStorage.getItem("alerts_v1");
        if (raw) return JSON.parse(raw);
        } catch { /* empty */ }
        return [];
    });

    const [editing, setEditing] = useState<AlertItem | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        localStorage.setItem("alerts_v1", JSON.stringify(alerts));
    }, [alerts]);

    const addAlert = (data: Omit<AlertItem, "id">) => {
        setAlerts((prev) => [{ ...data, id: uid() }, ...prev]);
        setShowForm(false);
    };

    const updateAlert = (id: string, data: Partial<AlertItem>) => {
        setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)));
        setEditing(null);
        setShowForm(false);
    };

    const deleteAlert = (id?: string) => {
        if (!id) return;
        setAlerts((prev) => prev.filter((a) => a.id !== id));
    };

    const handleEdit = (id?: string) => {
        if (!id) return;
        const found = alerts.find((x) => x.id === id);
        if (!found) return;

        setEditing(found);
        setShowForm(true);
    };

    return {
        alerts,
        editing,
        showForm,
        addAlert,
        updateAlert,
        deleteAlert,
        handleEdit,
        setShowForm,
        setEditing
    };
}
