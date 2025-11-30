import AlertForm from './AlertForm';
import type { AlertItem } from '../../../types';
import type { AlertType } from '../../../types';

interface IProps {
    showForm: boolean;
    editing: AlertItem | null;
    onCancel: () => void;
    onSave: (payload: { title: string; description: string; type: AlertType }) => void;
}

const AlertFormWrapper = ({showForm, editing, onCancel, onSave} : IProps) => {
    if (!showForm) return null;
    return (
        <div style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '1rem', borderRadius: 8 }}>
            <AlertForm
                initial={editing ?? undefined}
                onCancel={onCancel}
                onSave={onSave}
            />
        </div>
    )
}

export default AlertFormWrapper ;