import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodegaDTO } from '../../clases/bodega.dto';

@Component({
    selector: 'app-bodega-form',
    templateUrl: './bodega-form.component.html',
})
export class BodegaFormComponent implements OnInit {
    @Input() displayModal: boolean = false;
    @Input() bodega: BodegaDTO | null = null;
    @Input() isLoading: boolean = false;
    @Output() onSave = new EventEmitter<BodegaDTO>();
    @Output() onCancel = new EventEmitter<void>();

    public bodegaForm!: FormGroup;

    constructor(private fb: FormBuilder) {
         this.bodegaForm = this.fb.group({
            id: [null],
            nombre: ['', [Validators.required, Validators.minLength(3)]],
            descripcion: ['', [Validators.required, Validators.minLength(3)]],
        });
    }

    ngOnInit(): void {
        if(this.bodega){
            this.bodegaForm.patchValue(this.bodega);
        }
    }

    public emitSubmit(): void {
        if (this.bodegaForm.valid) {
            this.onSave.emit(this.bodegaForm.value as BodegaDTO);
        } else {
            this.bodegaForm.markAllAsTouched();
        }
    }

    public emitCancel(): void {
        this.onCancel.emit();
    }
}
