export type AlertType = "alert-danger" | "alert-warning" | "alert-default" | "alert-success" | "alert-info";

export interface AlertItem {
    id: string;
    type: AlertType;
    title: string;
    description: string;
}