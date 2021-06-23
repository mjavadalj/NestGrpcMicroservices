import { Observable } from 'rxjs';

interface Product {
  id: number;
  name: string;
}

interface ProductById {
  id: number;
}

interface Empty {}
interface Comment {
  text: string;
  user: string;
}
interface Test {
  name: string;
}

export interface IGrpcService {
  addProduct(product: Product): Observable<any>;
  findProduct(id: ProductById): Observable<any>;
  addComment(comment: Comment): Observable<any>;
  userAuth(data: Test): Observable<any>;
}
