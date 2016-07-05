/**
 * Created by Vlad on 7/4/2016.
 */
import {Component} from '@angular/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material';
@Component({
    //moduleId: module.id,
    selector: 'data-table-basic-usage',
    templateUrl: 'app/test/data-table-basic-usage.html',
    directives: [MATERIAL_DIRECTIVES]
})
export class DataTableBasicUsageComponent {
    materials: Array<any> = [
        {'id': 1, 'name': 'Acrylic (Transparent)', 'quantity': '25', 'price': '$2.90'},
        {'id': 2, 'name': 'Plywood (Birch)', 'quantity': '50', 'price': '$1.25'},
        {'id': 3, 'name': 'Laminate (Gold on Blue)', 'quantity': '10', 'price': '$2.35'}
    ]
}