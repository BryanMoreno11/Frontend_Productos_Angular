import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoDTO } from '../../clases/producto.dto';

@Component({
    selector: 'app-producto-form',
    templateUrl: './producto-form.component.html',
})
export class ProductoFormComponent implements OnInit, OnChanges {
    // Entradas desde el Smart Component
    @Input() displayModal: boolean = false;
    @Input() producto: ProductoDTO | null = null;
    @Input() isLoading: boolean = false;

    // Salidas hacia el Smart Component
    @Output() onSave = new EventEmitter<ProductoDTO>();
    @Output() onCancel = new EventEmitter<void>();

    public productoForm!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.asignarInicializacionFormulario();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['producto'] && this.productoForm) {
            this.asignarValoresAlFormulario();
        }
    }

    private asignarInicializacionFormulario(): void {
        // Definimos el formulario reactivo
        this.productoForm = this.fb.group({
            id: [''],
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            stock: [0, [Validators.required, Validators.min(0)]],
            precio: [0.0, [Validators.required, Validators.min(0.01)]],
        });
        this.asignarValoresAlFormulario();
    }

    private asignarValoresAlFormulario(): void {
        if (this.producto) {
            // Si estamos editando, poblamos los campos
            this.productoForm.patchValue(this.producto);
        } else {
            // Si es nuevo, reseteamos el form con valores por defecto
            this.productoForm.reset({ stock: 0, precio: 0 });
        }
    }

    public asignarEmisionGuardado(): void {
        if (this.productoForm.valid) {
            this.onSave.emit(this.productoForm.value as ProductoDTO);
        } else {
            // Forzamos la validación visual de todos los campos
            this.productoForm.markAllAsTouched();
        }
    }

    public asignarEmisionCancelado(): void {
        this.onCancel.emit();
    }
}
