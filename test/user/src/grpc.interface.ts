import { Observable } from 'rxjs';

interface Product {
  id: number;
  name: string;
}

interface ProductById {
  id: number;
}

interface Comment {
  text: string;
  user: string;
}

export interface IGrpcService {
  addProduct(product: Product): Observable<any>;
  findProduct(id: ProductById): Observable<any>;
  addComment(comment: Comment): Observable<any>;
}
