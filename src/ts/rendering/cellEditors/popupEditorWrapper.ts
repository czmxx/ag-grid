import {Component} from "../../widgets/component";
import {ICellEditor} from "./iCellEditor";

export class PopupEditorWrapper extends Component implements ICellEditor {

    private cellEditor: ICellEditor;
    private params: any;
    
    constructor(cellEditor: ICellEditor) {
        super('<div class="ag-popup-editor"/>');
        
        this.cellEditor = cellEditor;
        this.appendChild(cellEditor.getGui());
        
        this.addDestroyFunc( ()=> cellEditor.destroy() );

        this.addDestroyableEventListener(
            this.getGui(),
            'keydown',
            this.onKeyDown.bind(this)
        );
    }

    private onKeyDown(event: KeyboardEvent): void {
        this.params.onKeyDown(event);
    }

    public init(params: any): void {
        this.params = params;
        if (this.cellEditor.init) {
            this.cellEditor.init(params);
        }
    }

    public afterGuiAttached(): void {
        if (this.cellEditor.afterGuiAttached) {
            this.cellEditor.afterGuiAttached();
        }
    }

    public getValue(): any {
        return this.cellEditor.getValue();
    }

    public isPopup(): boolean {
        return true;
    }
}