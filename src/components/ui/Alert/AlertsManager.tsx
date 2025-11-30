import {Ban, MessageCircle,BellRing, LaptopMinimalCheck, Info} from "lucide-react";
import Alert from "./Alertcomponent";
import AlertFormWrapper from "./AlertFormWrapper";
import { useAlerts } from "../../../hooks/useAlerts";

export default function AlertsManager() {
    const {
        alerts,
        editing,
        showForm,
        addAlert,
        updateAlert,
        deleteAlert,
        handleEdit,
        setShowForm,
        setEditing
    } = useAlerts();

    const iconFor = (type: string) => {
        switch (type) {
        case "alert-danger":
            return <Ban size={20} />;
        case "alert-warning":
            return <MessageCircle size={20} />;
        case "alert-default":
            return <BellRing size={20} />;
        case "alert-success":
            return <LaptopMinimalCheck size={20} />;
        case "alert-info":
            return <Info size={20} />;
        default:
            return <BellRing size={20} />;
        }
    };

    return (
        <div>
        <div className="header">
            <h1>Alerts Manager</h1>

            <div className="button-add">
            <button
                onClick={() => {
                setEditing(null);
                setShowForm(true);
                }}
            >
                Add Alert
            </button>
            </div>
        </div>

        <AlertFormWrapper
            showForm={showForm}
            editing={editing}
            onCancel={() => {
            setShowForm(false);
            setEditing(null);
            }}
            onSave={(payload) => {
            if (editing) updateAlert(editing.id, payload);
            else addAlert(payload);
            }}
        />

        <div>
            {alerts.map((a) => (
            <Alert
                key={a.id}
                id={a.id}
                type={a.type}
                title={a.title}
                description={a.description}
                icon={iconFor(a.type)}
                onDelete={deleteAlert}
                onEdit={handleEdit}
            />
            ))}
        </div>
        </div>
    );
}
