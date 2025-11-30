import type { AlertType } from '../../../types';
import './index.scss';
import { Edit2, X } from 'lucide-react';


interface IProps {
    id?: string;
    type: AlertType;
    title: string;
    icon: React.ReactNode;
    description: string;
    onDelete?: (id?: string) => void;
    onEdit?: (id?: string) => void;
}

const Alert = ({ id, type , title, icon, description, onDelete, onEdit }: IProps) => {
    return (
        <div className={type}>
            <div className='alert-header'>
                <div className='title'>
                        <span>{icon}</span>
                    <h4>{title}</h4>
                </div>
                <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                    <Edit2 className='edit' size={20} style={{cursor: 'pointer'}} onClick={() => onEdit && onEdit(id)} />
                    <X className='close' size={20} style={{cursor: 'pointer'}} onClick={() => onDelete && onDelete(id)} />
                </div>
            </div>
            <p>
                {description}
            </p>
        </div>
    )
}

export default Alert ;