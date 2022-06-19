import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  public readonly BACKEND_URL: String = 'http://127.0.0.1:8001/api';
}
