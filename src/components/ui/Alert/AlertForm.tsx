import type React from "react";
import type { AlertItem, AlertType } from "../../../types";
import { useEffect, useState } from "react";

interface IProps {
    initial?: Partial<AlertItem>;
    onCancel: () => void;
    onSave: (data: { title: string; description: string; type: AlertType}) => void;
}

const AlertForm : React.FC<IProps> = ({ initial, onCancel, onSave }) => {
    const [title, setTitle] = useState(initial?.title ?? '');
    const [description, setDescription] = useState(initial?.description ?? '');
    const [type, setType] = useState<AlertType>((initial?.type as AlertType) ?? 'alert-default');


    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTitle(initial?.title ?? '');
        setDescription(initial?.description ?? '');
        setType((initial?.type as AlertType) ?? 'alert-default');
    }, [initial]);
    return (
        <div className="alert-form">
            <h3>{initial?.id ? 'Edit Alert' : 'Add Alert'}</h3>
            <div>
                <label>Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Type</label>
                <select value={type} onChange={e => setType(e.target.value as AlertType)}>
                    <option value="alert-danger">Danger</option>
                    <option value="alert-warning">Warning</option>
                    <option value="alert-default">Default</option>
                    <option value="alert-success">Success</option>
                    <option value="alert-info">Info</option>
                </select>
            </div>
            <div style={{marginTop: '1rem', display: 'flex', gap: '0.5rem'}}>
                <button className="btn-save" onClick={() => onSave({ title, description, type })} disabled={!title.trim()}>Save</button>
                <button className="btn-cancel" onClick={onCancel} type="button">Cancel</button>
            </div>
        </div>
    )
}

export default AlertForm ;