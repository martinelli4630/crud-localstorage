import { UnitMeasurement } from './unit-measurement';

export class Products {
    public name: string;
    public unitMeasurement: UnitMeasurement;
    public amount: number;
    public price: number;
    public isPerishable: boolean;
    public expirationDate: Date;
    public dateManufacture: Date;
}
