import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoDTO } from '../../clases/producto.dto';
import { BodegaDTO } from '../../../Bodega/clases/bodega.dto';

@Component({
    selector: 'app-producto-form',
    templateUrl: './producto-form.component.html',
})
export class ProductoFormComponent implements OnInit {
    @Input() displayModal: boolean = false;
    @Input() producto: ProductoDTO | null = null;
    @Input() bodegas: BodegaDTO[] = [];
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
            bodegaId: [null, [Validators.required]],
            fechaIngreso: [null, [Validators.required]],
        });
    }

    ngOnInit(): void {
        if(this.producto){
            this.productoForm.patchValue({
                ...this.producto,
                fechaIngreso: this.producto.fechaIngreso ? new Date(this.producto.fechaIngreso) : null
            });
        }
    }

    public emitSubmit(): void {
        if (this.productoForm.valid) {
            const formData = { ...this.productoForm.value };
            if (formData.fechaIngreso instanceof Date) {
                formData.fechaIngreso = formData.fechaIngreso.toISOString();
            }
            this.onSave.emit(formData as ProductoDTO);
        } else {
            this.productoForm.markAllAsTouched();
        }
    }

    public emitCancel(): void {
        this.onCancel.emit();
    }
}
