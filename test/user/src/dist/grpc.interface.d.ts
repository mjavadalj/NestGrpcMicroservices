import { Observable } from 'rxjs';
interface Product {
    id: number;
    name: string;
}
export interface IGrpcService {
    addProduct(product: Product): Observable<any>;
}
export {};
