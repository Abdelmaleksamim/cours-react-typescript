import type { AlertType } from '../../../types';
import './index.scss';
import { X } from 'lucide-react';


interface IProps {
    type: AlertType;
    title: string;
    icon: React.ReactNode;
    description: string;
} 

const Alert = ({ type , title, icon, description }: IProps) => {
    return (
        <div className={type}>
            <div className='alert-header'>
                <div className='title'>
                        <span>{icon}</span>
                    <h4>{title}</h4>
                </div>
                    <X className='close' size={25}/>
            </div>
            <p>
                {description}
            </p>
        </div>
    )
}

export default Alert ;