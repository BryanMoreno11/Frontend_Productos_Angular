import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoDTO } from '../../clases/producto.dto';

@Component({
    selector: 'app-producto-form',
    templateUrl: './producto-form.component.html',
})
export class ProductoFormComponent implements OnInit {
    @Input() displayModal: boolean = false;
    @Input() producto: ProductoDTO | null = null;
    @Input() isLoading: boolean = false;
    @Output() onSave = new EventEmitter<ProductoDTO>();
    @Output() onCancel = new EventEmitter<void>();

    public productoForm!: FormGroup;

    constructor(private fb: FormBuilder) {
         this.productoForm = this.fb.group({
            id: [null],
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            stock: [0, [Validators.required, Validators.min(0)]],
            precio: [0.0, [Validators.required, Validators.min(0.01)]],
        });
    }

    ngOnInit(): void {
        if(this.producto){
            this.productoForm.patchValue(this.producto);
        }
    }

  

    public emitSubmit(): void {
        if (this.productoForm.valid) {
            this.onSave.emit(this.productoForm.value as ProductoDTO);
        } else {
            this.productoForm.markAllAsTouched();
        }
    }

    public emitCancel(): void {
        this.onCancel.emit();
    }
}
