"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const index_1 = require("../../services/index");
let AlertComponent = class AlertComponent {
    constructor(alertService) {
        this.alertService = alertService;
    }
    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
    clear() {
        this.message = '';
    }
};
AlertComponent = __decorate([
    core_1.Component({
        moduleId: 'module.id',
        selector: 'alert',
        animations: [
            core_1.trigger('fadeInOut', [
                core_1.transition(':enter', [
                    core_1.style({ opacity: 0, transform: 'translateX(10px)' }),
                    core_1.animate(200, core_1.style({ opacity: 1, transform: 'translateX(0)' }))
                ]),
                core_1.transition(':leave', [
                    core_1.style({ transform: 'translate(0)' }),
                    core_1.animate(200, core_1.style({ opacity: 0, transform: 'translateX(10px)' }))
                ])
            ])
        ],
        template: require('../../../html/alert.component.html'),
    }),
    __metadata("design:paramtypes", [index_1.AlertService])
], AlertComponent);
exports.AlertComponent = AlertComponent;
